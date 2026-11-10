import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ChevronDown, CircleAlert, Download, LockKeyhole,
  LoaderCircle, Printer, Search, X,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessProject, getBusinessQuestionnaireResponses } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import ResultsChart from '../components/ResultsChart';
import './BusinessResultsDashboard.css';

const CHOICE_TYPES = ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING', 'RANKING'];
const TEXT_TYPES = ['SHORT_TEXT', 'LONG_TEXT'];

const asNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const answerLabel = (value) => (Array.isArray(value) ? value.join(', ') : String(value ?? '—'));

const formatNumber = (value, language) => new Intl.NumberFormat(language).format(value);

const formatDate = (value, language) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(language, { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
};

function fill(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template || '',
  );
}

function answeredValues(question, responses) {
  return responses
    .map((response) => response.answers?.[question.id])
    .filter((value) => value !== undefined && value !== null && value !== '');
}

function choiceRows(question, responses) {
  const values = answeredValues(question, responses);
  const counts = new Map((question.choices || []).map((choice) => [String(choice), 0]));
  values.forEach((value) => {
    (Array.isArray(value) ? value : [value]).forEach((choice) => {
      const key = String(choice);
      counts.set(key, (counts.get(key) || 0) + 1);
    });
  });
  const answered = values.length;
  const rows = [...counts.entries()]
    .map(([label, count]) => ({ label, count, percent: answered ? (count / answered) * 100 : 0 }))
    .sort(question.type === 'RATING'
      ? (a, b) => (asNumber(b.label) ?? 0) - (asNumber(a.label) ?? 0)
      : (a, b) => b.count - a.count);
  return { answered, rows };
}

function ratingStats(question, responses) {
  const numbers = answeredValues(question, responses)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .map(asNumber)
    .filter((value) => value !== null)
    .sort((a, b) => a - b);
  if (!numbers.length) return null;
  const total = numbers.reduce((sum, value) => sum + value, 0);
  const middle = Math.floor(numbers.length / 2);
  const median = numbers.length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
  const scale = (question.choices || []).map(asNumber).filter((value) => value !== null).sort((a, b) => a - b);
  const low = scale[0] ?? numbers[0];
  const high = scale[scale.length - 1] ?? numbers[numbers.length - 1];
  const isNps = low === 0 && high === 10;
  const nps = isNps
    ? Math.round((((numbers.filter((n) => n >= 9).length - numbers.filter((n) => n <= 6).length) / numbers.length) * 100))
    : null;
  return { answered: numbers.length, mean: total / numbers.length, median, min: numbers[0], max: numbers[numbers.length - 1], nps };
}

function numberStats(question, responses) {
  const numbers = answeredValues(question, responses).map(asNumber).filter((value) => value !== null).sort((a, b) => a - b);
  if (!numbers.length) return null;
  const total = numbers.reduce((sum, value) => sum + value, 0);
  const middle = Math.floor(numbers.length / 2);
  const median = numbers.length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
  return { answered: numbers.length, mean: total / numbers.length, median, min: numbers[0], max: numbers[numbers.length - 1] };
}

function rankingRows(question, responses) {
  const values = answeredValues(question, responses).filter(Array.isArray);
  if (!values.length) return null;
  const totals = new Map();
  values.forEach((ranking) => {
    ranking.forEach((choice, index) => {
      const current = totals.get(choice) || { position: 0, count: 0 };
      current.position += index + 1;
      current.count += 1;
      totals.set(choice, current);
    });
  });
  return [...totals.entries()]
    .map(([label, { position, count }]) => ({ label, mean: position / count, count }))
    .sort((a, b) => a.mean - b.mean);
}

function filterValues(question, responses) {
  if (!question) return [];
  if (question.choices?.length) return question.choices.map(String);
  const seen = new Set();
  answeredValues(question, responses).forEach((value) => {
    (Array.isArray(value) ? value : [value]).forEach((item) => seen.add(String(item)));
  });
  return [...seen].sort().slice(0, 60);
}

function matchesFilter(response, questionId, value) {
  const answer = response.answers?.[questionId];
  if (Array.isArray(answer)) return answer.map(String).includes(value);
  return String(answer ?? '') === value;
}

function csvCell(value) {
  const text = answerLabel(value).replaceAll('"', '""');
  return `"${text}"`;
}

function downloadCsv(questions, responses, filename, labels) {
  const header = [labels.submitted, labels.quality, ...questions.map((question) => question.prompt)];
  const lines = responses.map((response) => [
    csvCell(response.submittedAt),
    csvCell(response.qualityFlag ? labels.flagged : ''),
    ...questions.map((question) => csvCell(response.answers?.[question.id] ?? '')),
  ].join(','));
  const csv = `\uFEFF${[header.map(csvCell).join(','), ...lines].join('\r\n')}`;
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function Highlight({ text, query }) {
  if (!query || !query.trim()) return text;
  const needle = query.trim();
  const lower = text.toLowerCase();
  const target = needle.toLowerCase();
  const parts = [];
  let cursor = 0;
  let index = lower.indexOf(target);
  while (index !== -1) {
    parts.push(text.slice(cursor, index));
    parts.push(<mark key={`${index}-${parts.length}`}>{text.slice(index, index + needle.length)}</mark>);
    cursor = index + needle.length;
    index = lower.indexOf(target, cursor);
  }
  parts.push(text.slice(cursor));
  return parts;
}

function Stat({ label, value, note, onClick, active }) {
  const content = (
    <>
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </>
  );
  if (!onClick) return <div className="brd-stat">{content}</div>;
  return (
    <button type="button" className={`brd-stat brd-stat--button${active ? ' is-active' : ''}`} aria-pressed={active} onClick={onClick}>
      {content}
    </button>
  );
}

function BarRow({ row, total }) {
  return (
    <div className="brd-bar-row">
      <span className="brd-bar-label" title={row.label}>{row.label}</span>
      <span className="brd-bar-track" aria-hidden="true">
        <span className="brd-bar-fill" style={{ width: `${Math.max(row.percent, row.count > 0 ? 0.6 : 0)}%` }} />
      </span>
      <span className="brd-bar-count">{row.count}</span>
      <span className="brd-bar-percent">{Math.round(row.percent)}%</span>
      <span className="brd-sr-only">{fill('{count} of {total}', { count: row.count, total })}</span>
    </div>
  );
}

function QuestionCard({ question, index, responses, copy }) {
  const isText = TEXT_TYPES.includes(question.type);
  const isChoice = CHOICE_TYPES.includes(question.type);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [display, setDisplay] = useState('chart');

  const choice = useMemo(() => (isChoice ? choiceRows(question, responses) : null), [isChoice, question, responses]);
  const rating = useMemo(() => (question.type === 'RATING' ? ratingStats(question, responses) : null), [question, responses]);
  const numbers = useMemo(() => (question.type === 'NUMBER' ? numberStats(question, responses) : null), [question, responses]);
  const ranks = useMemo(() => (question.type === 'RANKING' ? rankingRows(question, responses) : null), [question, responses]);

  const texts = useMemo(() => {
    if (!isText) return [];
    const needle = query.trim().toLowerCase();
    return responses
      .map((response) => ({ response, value: response.answers?.[question.id] }))
      .filter(({ value }) => value !== undefined && value !== null && value !== '')
      .filter(({ value }) => !needle || answerLabel(value).toLowerCase().includes(needle));
  }, [isText, query, question.id, responses]);

  const answered = isText ? texts.length : choice?.answered ?? rating?.answered ?? numbers?.answered ?? 0;
  const meta = rating && question.type === 'RATING'
    ? `${copy.mean} ${rating.mean.toFixed(1)} · ${copy.median} ${formatNumber(rating.median, copy.language)}`
    : `${answered} / ${responses.length}`;

  const visible = expanded ? texts : texts.slice(0, 8);
  const hidden = texts.length - visible.length;

  return (
    <article className="brd-card" id={`q-${question.id}`}>
      <header className={isText ? 'brd-card-head brd-card-head--text' : 'brd-card-head'}>
        <span className="brd-index">{String(index + 1).padStart(2, '0')}</span>
        <h2>{question.prompt}</h2>
        {!isText && <span className="brd-card-meta">{meta}</span>}
        {isChoice && question.type !== 'RANKING' && (
          <div className="brd-view-switch" role="group">
            <button type="button" className={display === 'chart' ? 'is-active' : ''} aria-pressed={display === 'chart'} onClick={() => setDisplay('chart')}>{copy.chartView}</button>
            <button type="button" className={display === 'table' ? 'is-active' : ''} aria-pressed={display === 'table'} onClick={() => setDisplay('table')}>{copy.tableView}</button>
          </div>
        )}
      </header>

      {isText && (
        <div className="brd-card-tools">
          <span className="brd-card-meta">{meta}</span>
          <label className="brd-search">
            <Search size={14} aria-hidden="true" />
            <input
              type="search"
              value={query}
              placeholder={copy.searchAnswers}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button type="button" aria-label={copy.clearFilter} onClick={() => setQuery('')}>
                <X size={13} aria-hidden="true" />
              </button>
            )}
          </label>
        </div>
      )}

      {isText ? (
        <div className="brd-answers">
          {texts.length === 0 && <p className="brd-empty-note">{query ? copy.noMatch : copy.noUsable}</p>}
          {visible.map(({ response, value }) => (
            <div className="brd-answer" key={response.id}>
              <time>{formatDate(response.submittedAt, copy.language)}</time>
              <p><Highlight text={answerLabel(value)} query={query} /></p>
            </div>
          ))}
          {hidden > 0 && (
            <button type="button" className="brd-more-button" onClick={() => setExpanded(true)}>
              {fill(copy.showAll || 'Show all {count}', { count: texts.length })}
            </button>
          )}
          {expanded && texts.length > 8 && (
            <button type="button" className="brd-more-button" onClick={() => setExpanded(false)}>
              {copy.showLess}
            </button>
          )}
        </div>
      ) : ranks ? (
        <div className="brd-bars">
          {ranks.map((row) => (
            <div className="brd-bar-row" key={row.label}>
              <span className="brd-bar-label" title={row.label}>{row.label}</span>
              <span className="brd-bar-track" aria-hidden="true">
                <span className="brd-bar-fill" style={{ width: `${100 - ((row.mean - 1) / Math.max(ranks.length - 1, 1)) * 100 * 0.72}%` }} />
              </span>
              <span className="brd-bar-count">{row.mean.toFixed(1)}</span>
              <span className="brd-bar-percent" />
            </div>
          ))}
        </div>
      ) : choice && choice.rows.length > 0 ? (
        display === 'chart'
          ? <ResultsChart type={question.type} rows={choice.rows} />
          : <div className="brd-bars">
            {choice.rows.map((row) => <BarRow key={row.label} row={row} total={choice.answered} />)}
          </div>
      ) : numbers ? (
        <dl className="brd-figures">
          <div><dt>{copy.mean}</dt><dd>{numbers.mean.toFixed(1)}</dd></div>
          <div><dt>{copy.median}</dt><dd>{numbers.median.toFixed(1)}</dd></div>
          <div><dt>{copy.min}</dt><dd>{numbers.min}</dd></div>
          <div><dt>{copy.max}</dt><dd>{numbers.max}</dd></div>
        </dl>
      ) : (
        <p className="brd-empty-note">{copy.noUsable}</p>
      )}

      {question.type === 'RATING' && rating?.nps !== null && rating?.nps !== undefined && (
        <footer className="brd-card-foot">
          <span>{copy.nps}</span>
          <strong>{rating.nps > 0 ? `+${rating.nps}` : rating.nps}</strong>
          <small>{fill(copy.answered, { answered: rating.answered, usable: responses.length })}</small>
        </footer>
      )}
    </article>
  );
}

function RecordRow({ response, questions, copy }) {
  const answered = questions.filter((question) => response.answers?.[question.id] !== undefined);
  return (
    <details className="brd-record">
      <summary>
        <span className="brd-record-time">
          {new Intl.DateTimeFormat(copy.language, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(response.submittedAt))}
        </span>
        <span className="brd-record-count">{answered.length}/{questions.length}</span>
        {response.qualityFlag && <span className="brd-record-flag"><CircleAlert size={13} /> {copy.fastReview}</span>}
        <ChevronDown size={15} className="brd-record-chevron" aria-hidden="true" />
      </summary>
      <dl>
        {answered.map((question) => (
          <div key={question.id}>
            <dt>{question.prompt}</dt>
            <dd>{answerLabel(response.answers[question.id])}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

export default function BusinessResultsDashboard({ preview }) {
  const { projectId } = useParams();
  const { language, publicCopy } = useLanguage();
  const resultCopy = publicCopy?.workspace?.business?.questionnaireResults || {};
  const results = resultCopy[language] || resultCopy['en-US'] || {};
  const copy = publicCopy.workspace.business.results.detail;

  const [project, setProject] = useState(null);
  const [data, setData] = useState({ questions: [], responses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState(preview?.view || 'usable');
  const [filterQuestionId, setFilterQuestionId] = useState(preview?.filterQuestionId || '');
  const [filterValue, setFilterValue] = useState(preview?.filterValue || '');
  const [recordsOpen, setRecordsOpen] = useState(false);
  const [recordsExpanded, setRecordsExpanded] = useState(false);

  useEffect(() => {
    if (preview) {
      setProject(preview.project);
      setData(preview.data);
      setLoading(false);
      return undefined;
    }
    let active = true;
    Promise.all([getBusinessProject(projectId), getBusinessQuestionnaireResponses(projectId)])
      .then(([projectResponse, responsesResponse]) => {
        if (!active) return;
        setProject(projectResponse.data.project);
        setData(responsesResponse.data);
      })
      .catch(() => { if (active) setError(copy.loadError); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [copy.loadError, preview, projectId]);

  const questions = data.questions || [];
  const responses = data.responses || [];
  const usable = responses.filter((response) => !response.qualityFlag);
  const flagged = responses.filter((response) => response.qualityFlag);
  const lastSubmitted = responses.reduce((latest, response) => (response.submittedAt > latest ? response.submittedAt : latest), '');
  /* A results page exists for the client only after the report has been
     released from the workspace. Until the backend returns deliveryStatus the
     field is undefined and the page keeps its current behaviour, so this gate
     switches on the moment the field ships — it never locks people out by
     accident. RELEASED means APPROVED or SENT. */
  const deliveryStatus = project?.deliveryStatus || project?.delivery?.status;
  const notReleased = Boolean(deliveryStatus) && !['APPROVED', 'SENT'].includes(deliveryStatus);
  const resultsLocked = notReleased || project?.questionnaire?.status !== 'PUBLISHED' || !responses.length;
  const target = Number(project?.targetParticipants) || 0;
  const collectedPercent = target ? Math.min((usable.length / target) * 100, 100) : 0;

  const filterQuestion = questions.find((question) => question.id === filterQuestionId) || null;
  const filterOptions = useMemo(() => filterValues(filterQuestion, responses), [filterQuestion, responses]);

  const pool = useMemo(() => {
    let list = responses;
    if (view === 'usable') list = list.filter((response) => !response.qualityFlag);
    if (view === 'flagged') list = list.filter((response) => response.qualityFlag);
    if (filterQuestionId && filterValue) {
      list = list.filter((response) => matchesFilter(response, filterQuestionId, filterValue));
    }
    return list;
  }, [filterQuestionId, filterValue, responses, view]);

  const cardCopy = {
    ...copy,
    language,
    searchAnswers: copy.searchAnswers || 'Search answers',
    mean: copy.mean || 'Mean',
    median: copy.median || 'Median',
    nps: copy.nps || 'NPS',
    min: copy.min || 'Min',
    max: copy.max || 'Max',
  };

  if (loading) {
    return <main className="brd-loading"><LoaderCircle className="animate-spin" size={18} /> {copy.loading}</main>;
  }

  if (error) {
    return <main className="brd-loading"><strong>{error}</strong><Link to={withLanguage('/business/workspace', language)}>{copy.backToProjects}</Link></main>;
  }

  if (resultsLocked) {
    return (
      <main className="brd-page">
        <header className="brd-topbar">
          <Link className="brd-back" to={withLanguage('/business/workspace?view=results', language)}>
            <ArrowLeft size={16} aria-hidden="true" /> {copy.projects}
          </Link>
        </header>
        <section className="brd-locked">
          <span className="brd-locked-icon"><LockKeyhole size={20} aria-hidden="true" /></span>
          <h1>{notReleased ? (copy.notReleasedTitle || 'This report has not been released yet.') : results.noResultsTitle}</h1>
          <p>{notReleased ? (copy.notReleasedBody || 'We are still checking the results. You will be notified when the report is released.') : results.noResultsBody}</p>
          <Link className="brd-button" to={withLanguage('/business/workspace', language)}>{copy.backToProjects}</Link>
        </section>
      </main>
    );
  }

  const title = project?.questionnaire?.title || project?.title || '';
  const filtered = Boolean(filterQuestionId && filterValue);

  return (
    <main className="brd-page">
      <header className="brd-topbar">
        <Link className="brd-back" to={withLanguage('/business/workspace?view=results', language)}>
          <ArrowLeft size={16} aria-hidden="true" /> {copy.projects}
        </Link>
        <div className="brd-actions">
          <button
            type="button"
            className="brd-button brd-button--ghost brd-print-hide"
            onClick={() => downloadCsv(questions, pool, `responses-${projectId || 'project'}.csv`, {
              submitted: copy.csvSubmitted || 'Submitted at',
              quality: copy.csvQuality || 'Quality flag',
              flagged: copy.csvFlagged || 'flagged',
            })}
          >
            <Download size={15} aria-hidden="true" /> {copy.exportCsv || 'Export CSV'}
          </button>
          <button type="button" className="brd-button" onClick={() => window.print()}>
            <Printer size={15} aria-hidden="true" /> {copy.downloadReport || 'Download report'}
          </button>
        </div>
      </header>

      <div className="brd-shell">
        <section className="brd-intro">
          <h1>{title}</h1>
          <p className="brd-meta">
            {lastSubmitted ? fill(copy.updatedAt || 'Updated {date}', { date: formatDate(lastSubmitted, language) }) : null}
            <span>{fill(copy.questionsCount || '{count} questions', { count: questions.length })}</span>
          </p>
        </section>

        <section className="brd-stats" aria-label={copy.responsesReceived}>
          <Stat
            label={copy.responsesReceived}
            value={formatNumber(responses.length, language)}
            onClick={() => setView('all')}
            active={view === 'all'}
          />
          <Stat
            label={copy.usable}
            value={formatNumber(usable.length, language)}
            onClick={() => setView('usable')}
            active={view === 'usable'}
          />
          <Stat
            label={copy.needsReview}
            value={formatNumber(flagged.length, language)}
            onClick={() => setView('flagged')}
            active={view === 'flagged'}
          />
          <div className="brd-stat brd-stat--target">
            <span>{copy.target || 'Target'}</span>
            <strong>{target ? formatNumber(target, language) : '—'}</strong>
            <span className="brd-progress" aria-hidden="true"><i style={{ width: `${collectedPercent}%` }} /></span>
            <small>{target ? `${Math.round(collectedPercent)}%` : ''}</small>
          </div>
        </section>

        <section className="brd-filter">
          <div className="brd-segment" role="group" aria-label={copy.responsesReceived}>
            {[
              ['usable', copy.viewUsable || 'Usable'],
              ['all', copy.viewAll || 'All responses'],
              ['flagged', copy.viewFlagged || 'Needs review'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={view === key ? 'is-active' : ''}
                aria-pressed={view === key}
                onClick={() => setView(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="brd-filter-right">
            <select
              aria-label={copy.filterBy || 'Filter by question'}
              value={filterQuestionId}
              onChange={(event) => { setFilterQuestionId(event.target.value); setFilterValue(''); }}
            >
              <option value="">{copy.filterBy || 'Filter by question'}</option>
              {questions.map((question, index) => (CHOICE_TYPES.includes(question.type) ? (
                <option key={question.id} value={question.id}>{String(index + 1).padStart(2, '0')} · {question.prompt}</option>
              ) : null))}
            </select>

            {filterQuestion && (
              <select
                aria-label={copy.filterValue || 'Filter value'}
                value={filterValue}
                onChange={(event) => setFilterValue(event.target.value)}
              >
                <option value="">{copy.filterValue || 'Any answer'}</option>
                {filterOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}

            {filtered && (
              <button type="button" className="brd-clear" onClick={() => { setFilterQuestionId(''); setFilterValue(''); }}>
                <X size={12} aria-hidden="true" /> {copy.clearFilter || 'Clear'}
              </button>
            )}

            <span className="brd-filter-count">
              {fill(copy.showing || 'Showing {shown} of {total}', { shown: formatNumber(pool.length, language), total: formatNumber(responses.length, language) })}
            </span>
          </div>
        </section>

        <section className="brd-questions">
          {questions.map((question, index) => (
            filtered && question.id === filterQuestionId
              ? null
              : <QuestionCard key={question.id} question={question} index={index} responses={pool} copy={cardCopy} />
          ))}
          {questions.length === 0 && <p className="brd-empty-note">{copy.noUsable}</p>}
          {questions.length > 0 && pool.length === 0 && <p className="brd-empty-note">{copy.noMatch || 'No responses match this filter.'}</p>}
        </section>

        <details className="brd-records" onToggle={(event) => setRecordsOpen(event.currentTarget.open)}>
          <summary>
            <span className="brd-records-title">{copy.individualAnswers}</span>
            <span className="brd-records-meta">{formatNumber(pool.length, language)} · {copy.recordsNote}</span>
            <ChevronDown size={16} className="brd-records-chevron" aria-hidden="true" />
          </summary>
          <div className="brd-records-body">
            {recordsOpen && pool.slice(0, 12).map((response) => (
              <RecordRow key={response.id} response={response} questions={questions} copy={cardCopy} />
            ))}
            {recordsOpen && pool.length > 12 && !recordsExpanded && (
              <button type="button" className="brd-more-button" onClick={() => setRecordsExpanded(true)}>
                {fill(copy.showAll || 'Show all {count}', { count: pool.length })}
              </button>
            )}
            {recordsOpen && recordsExpanded && pool.slice(12).map((response) => (
              <RecordRow key={response.id} response={response} questions={questions} copy={cardCopy} />
            ))}
            {recordsOpen && recordsExpanded && pool.length > 12 && (
              <button type="button" className="brd-more-button" onClick={() => setRecordsExpanded(false)}>
                {copy.showLess}
              </button>
            )}
          </div>
        </details>
      </div>
    </main>
  );
}
