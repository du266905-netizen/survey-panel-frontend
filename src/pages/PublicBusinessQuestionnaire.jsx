import { useEffect, useMemo, useRef, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getPublicBusinessQuestionnaire, submitPublicBusinessQuestionnaire } from '../api/realApi';
import TurnstileWidget from '../components/TurnstileWidget';
import Logo from '../components/Logo';
import './PublicBusinessQuestionnaire.css';

/* The page a respondent opens.
 *
 * Own design, not the old one: one column, the questionnaire's own title and
 * cover, the questions as cards, one button. Chrome text follows the language
 * of the questionnaire (Chinese title → Chinese chrome), because the person
 * answering only ever sees this page. */

const COPY = {
  zh: {
    required: '必答', select: '请选择', other: '其他', submit: '提交', submitting: '正在提交…',
    thanksTitle: '已提交', thanksBody: '感谢您的时间，您的回答已经收到。',
    endedTitle: '感谢参与', endedBody: '根据您刚才的回答，本次调查到此结束，不需要继续作答。', endedSubmit: '完成',
    consent: '提交即表示您同意隐私政策，并理解这份回答会提供给问卷发起方。', privacy: '隐私政策',
    verifyFailed: '人机验证加载失败。请刷新页面，或换一个浏览器再试。',
    verifyHint: '提交前需要完成一次人机验证。',
    loadFailed: '问卷加载失败，请稍后再打开链接。', missing: '还有必答题没有回答。', submitFailed: '提交失败，请稍后再试。', retry: '刷新重试',
    rankingHint: '按您偏好的顺序依次勾选。', npsLow: '完全不会', npsHigh: '非常愿意', step: '第 {n} / {total} 页', next: '下一页', back: '上一页', mapLabel: '题目地图',
    matrixDefault: ['非常不同意', '不同意', '一般', '同意', '非常同意'],
    loading: '正在打开问卷…',
  },
  en: {
    required: 'Required', select: 'Select', other: 'Other', submit: 'Submit', submitting: 'Submitting…',
    thanksTitle: 'Submitted', thanksBody: 'Thank you — your response has been received.',
    endedTitle: 'Thank you', endedBody: 'This survey ends here based on your answers.', endedSubmit: 'Finish',
    consent: 'By submitting you agree to the privacy policy and understand this response is shared with the survey creator.', privacy: 'Privacy policy',
    verifyFailed: 'The human check could not load. Refresh the page or try another browser.',
    verifyHint: 'A quick human check is required before submitting.',
    loadFailed: 'This survey could not load. Please open the link again later.', missing: 'Some required questions are still unanswered.', submitFailed: 'We could not submit your response. Please try again.', retry: 'Reload',
    rankingHint: 'Select each option in the order you prefer it.', npsLow: 'Not at all likely', npsHigh: 'Extremely likely', step: 'Page {n} of {total}', next: 'Next', back: 'Back', mapLabel: 'Question map',
    matrixDefault: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
    loading: 'Opening the survey…',
  },
};

const isChinese = (value) => /[\u4e00-\u9fa5]/.test(String(value || ''));
const hasAnswer = (value) => (Array.isArray(value) ? value.length > 0 : String(value ?? '').trim().length > 0);

const logicConditions = (logic) => {
  if (!logic) return [];
  if (Array.isArray(logic.conditions) && logic.conditions.length) return logic.conditions;
  return logic.sourcePosition ? [{ sourcePosition: logic.sourcePosition, value: logic.value }] : [];
};

/* Each condition is compared against the answer it points at; the joiner decides
   whether all of them or any of them must hold. The action then decides what a
   match means: show the question, hide it, or end the survey. */
function logicMatches(question, questions, answers) {
  const logic = question.logic;
  const conditions = logicConditions(logic);
  if (!conditions.length) return false;
  const results = conditions.map((condition) => {
    const source = questions[condition.sourcePosition - 1];
    const answer = source ? answers[source.id] : null;
    return Array.isArray(answer) ? answer.includes(condition.value) : answer === condition.value;
  });
  return logic.joiner === 'OR' ? results.some(Boolean) : results.every(Boolean);
}

function questionIsVisible(question, questions, answers) {
  const logic = question.logic;
  if (!logicConditions(logic).length) return true;
  if ((logic.action || 'SHOW') === 'TERMINATE') return true;
  const matched = logicMatches(question, questions, answers);
  return logic.action === 'SKIP' ? !matched : matched;
}

function QuestionField({ question, value, onChange, copy }) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const settings = question.settings || {};
  const displayChoices = useMemo(
    () => (settings.randomizeChoices ? [...choices].sort(() => Math.random() - 0.5) : choices),
    [question.id, question.choices, settings.randomizeChoices],
  );

  if (question.type === 'LONG_TEXT') {
    return <textarea className="pq-input pq-textarea" rows={4} value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  }
  if (question.type === 'SHORT_TEXT' || question.type === 'NUMBER') {
    return <input className="pq-input" type={question.type === 'NUMBER' ? 'number' : 'text'} inputMode={question.type === 'NUMBER' ? 'decimal' : undefined} value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  }
  if (question.type === 'DATE') {
    return <input className="pq-input" type="date" value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  }
  if (question.type === 'DROPDOWN') {
    return (
      <select className="pq-input pq-select" value={value || ''} onChange={(event) => onChange(event.target.value)}>
        <option value="">{copy.select}</option>
        {displayChoices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}
      </select>
    );
  }
  if (question.type === 'NPS') {
    return (
      <div className="pq-nps">
        <div>
          {Array.from({ length: 11 }, (_, index) => String(index)).map((score) => (
            <label key={score} className={value === score ? 'is-on' : ''}>
              <input type="radio" name={question.id} checked={value === score} onChange={() => onChange(score)} />
              {score}
            </label>
          ))}
        </div>
        <small><span>{settings.scaleLowLabel || copy.npsLow}</span><span>{settings.scaleHighLabel || copy.npsHigh}</span></small>
      </div>
    );
  }
  if (question.type === 'MATRIX') {
    const columns = Array.isArray(settings.matrixColumns) && settings.matrixColumns.length ? settings.matrixColumns : copy.matrixDefault;
    const current = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    return (
      <div className="pq-matrix">
        <table>
          <thead><tr><th aria-hidden="true" />{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {displayChoices.map((row) => (
              <tr key={row}>
                <th scope="row">{row}</th>
                {columns.map((column) => (
                  <td key={column}>
                    <input type="radio" name={`${question.id}-${row}`} checked={current[row] === column} onChange={() => onChange({ ...current, [row]: column })} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (question.type === 'RANKING') {
    return (
      <div className="pq-options">
        {displayChoices.map((choice) => (
          <label key={choice}>
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(choice)}
              onChange={(event) => {
                const list = Array.isArray(value) ? value : [];
                onChange(event.target.checked ? [...list, choice] : list.filter((item) => item !== choice));
              }}
            />
            <span>{choice}</span>
            {Array.isArray(value) && value.includes(choice) ? <em>{value.indexOf(choice) + 1}</em> : null}
          </label>
        ))}
        <small className="pq-hint">{copy.rankingHint}</small>
      </div>
    );
  }
  if (question.type === 'MULTIPLE_CHOICE') {
    const list = Array.isArray(value) ? value : [];
    const other = list.find((item) => item.startsWith('Other: ')) || '';
    return (
      <div className="pq-options">
        {displayChoices.map((choice) => (
          <label key={choice}>
            <input
              type="checkbox"
              checked={list.includes(choice)}
              onChange={(event) => {
                const next = event.target.checked ? [...list, choice] : list.filter((item) => item !== choice);
                if (!settings.maxSelections || next.length <= settings.maxSelections) onChange(next);
              }}
            />
            <span>{choice}</span>
          </label>
        ))}
        {settings.allowOther ? (
          <label>
            <input
              type="checkbox"
              checked={Boolean(other)}
              onChange={(event) => onChange(event.target.checked ? [...list, 'Other: details'] : list.filter((item) => !item.startsWith('Other: ')))}
            />
            <span>{copy.other}</span>
            {other ? (
              <input className="pq-inline-input" aria-label={copy.other} value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange(list.map((item) => (item.startsWith('Other: ') ? `Other: ${event.target.value}` : item)))} />
            ) : null}
          </label>
        ) : null}
      </div>
    );
  }

  const other = typeof value === 'string' && value.startsWith('Other: ') ? value : '';
  return (
    <div className="pq-options">
      {displayChoices.map((choice) => (
        <label key={choice}>
          <input type="radio" name={question.id} checked={value === choice} onChange={() => onChange(choice)} />
          <span>{choice}</span>
        </label>
      ))}
      {settings.allowOther ? (
        <label>
          <input type="radio" name={question.id} checked={Boolean(other)} onChange={() => onChange('Other: details')} />
          <span>{copy.other}</span>
          {other ? (
            <input className="pq-inline-input" aria-label={copy.other} value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange(`Other: ${event.target.value}`)} />
          ) : null}
        </label>
      ) : null}
      {question.type === 'RATING' && (settings.scaleLowLabel || settings.scaleHighLabel) ? (
        <div className="pq-scale-labels"><span>{settings.scaleLowLabel}</span><span>{settings.scaleHighLabel}</span></div>
      ) : null}
    </div>
  );
}

export default function PublicBusinessQuestionnaire() {
  const { publicId } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [page, setPage] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [screenedOut, setScreenedOut] = useState(false);
  const startedAtRef = useRef(Date.now());

  const zh = isChinese(questionnaire?.title) || isChinese(questionnaire?.coverDescription);
  const copy = zh ? COPY.zh : COPY.en;

  useEffect(() => {
    let active = true;
    getPublicBusinessQuestionnaire(publicId)
      .then((response) => {
        if (!active) return;
        setQuestionnaire(response.data.questionnaire);
        startedAtRef.current = Date.now();
      })
      .catch(() => { if (active) setError(COPY.en.loadFailed); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [publicId]);

  const questions = Array.isArray(questionnaire?.questions) ? questionnaire.questions : [];
  const visibleQuestions = questions.filter((question) => questionIsVisible(question, questions, answers));

  const terminated = questions.some((question) => question.logic?.action === 'TERMINATE' && logicMatches(question, questions, answers));

  /* Pages are chunks of the visible questions, sized by questionnaire.pageSize.
     Zero means one page, which is what a short survey should be. */
  const pageSize = Number.isFinite(Number(questionnaire?.pageSize)) ? Number(questionnaire.pageSize) : 1;
  const pages = useMemo(() => {
    if (!pageSize || pageSize >= visibleQuestions.length) return [visibleQuestions];
    const chunks = [];
    for (let index = 0; index < visibleQuestions.length; index += pageSize) {
      chunks.push(visibleQuestions.slice(index, index + pageSize));
    }
    return chunks;
  }, [visibleQuestions, pageSize]);
  const pageIndex = Math.min(page, Math.max(0, pages.length - 1));
  const currentQuestions = pages[pageIndex] || [];
  const lastPage = pageIndex >= pages.length - 1;

  const submit = async (event, { allowTerminated = false } = {}) => {
    event.preventDefault();
    if (submitting || !questionnaire || (terminated && !allowTerminated)) return;
    const missing = terminated ? null : visibleQuestions.find((question) => question.required && !hasAnswer(answers[question.id]));
    if (missing) {
      const missingPage = pages.findIndex((group) => group.some((question) => question.id === missing.id));
      if (missingPage >= 0) setPage(missingPage);
      setError(copy.missing);
      window.setTimeout(() => document.getElementById(`question-${missing.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const storageKey = 'guanyi-questionnaire-response-device';
      let respondentKey = window.localStorage.getItem(storageKey);
      if (!respondentKey) {
        respondentKey = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        window.localStorage.setItem(storageKey, respondentKey);
      }
      const serializedAnswers = Object.fromEntries(Object.entries(answers).map(([id, value]) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return [id, Object.entries(value).map(([row, column]) => `${row} = ${column}`)];
        }
        return [id, value];
      }));
      const response = await submitPublicBusinessQuestionnaire(publicId, {
        answers: serializedAnswers,
        turnstileToken,
        respondentKey,
        durationSeconds: Math.floor((Date.now() - startedAtRef.current) / 1000),
      });
      setScreenedOut(response.data?.status === 'SCREENED_OUT');
      setMessage(response.data?.message || copy.thanksBody);
    } catch (caughtError) {
      setError(caughtError?.response?.data?.message || copy.submitFailed);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <main className="pq-page"><Logo /><p className="pq-state">{copy.loading}</p></main>;
  if (error && !questionnaire) return <main className="pq-page"><Logo /><p className="pq-state is-error">{error}</p></main>;
  if (message) {
    return (
      <main className="pq-page">
        <Logo />
        <section className="pq-done"><h1>{screenedOut ? copy.endedTitle : copy.thanksTitle}</h1><p>{message}</p></section>
      </main>
    );
  }
  if (terminated) {
    return (
      <main className="pq-page">
        <Logo />
        <section className="pq-done">
          <h1>{copy.endedTitle}</h1><p>{copy.endedBody}</p>
          {verifyFailed ? <p className="pq-error">{copy.verifyFailed}</p> : <TurnstileWidget onVerify={(token) => { setTurnstileToken(token); setVerifyFailed(false); }} onExpire={() => setTurnstileToken('')} onError={() => { setVerifyFailed(true); setTurnstileToken(''); }} />}
          <button type="button" className="pq-submit" disabled={!turnstileToken || submitting} onClick={(event) => submit(event, { allowTerminated: true })}>{submitting ? copy.submitting : copy.endedSubmit}</button>
        </section>
      </main>
    );
  }

  const [beforePrivacy, afterPrivacy] = copy.consent.split('隐私政策');

  const goNext = () => {
    const missing = currentQuestions.find((question) => question.required && !hasAnswer(answers[question.id]));
    if (missing) {
      setError(copy.missing);
      document.getElementById(`question-${missing.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setError('');
    setPage(pageIndex + 1);
    setFurthest((current) => Math.max(current, pageIndex + 1));
    document.getElementById('pq-form')?.scrollTo({ top: 0 });
  };

  const goBack = () => {
    setError('');
    setPage(Math.max(0, pageIndex - 1));
    document.getElementById('pq-form')?.scrollTo({ top: 0 });
  };

  return (
    <main className="pq-page">
      <div className="pq-top"><Logo /></div>

      <header className="pq-head">
        <h1>{questionnaire?.title}</h1>
        {questionnaire?.coverDescription ? <p>{questionnaire.coverDescription}</p> : null}
      </header>

      {pages.length > 1 ? (
        <div className="pq-progress">
          <div><span style={{ width: `${((pageIndex + 1) / pages.length) * 100}%` }} /></div>
          <small>{copy.step.replace('{n}', pageIndex + 1).replace('{total}', pages.length)}</small>
        </div>
      ) : null}

      <form className="pq-form" id="pq-form" onSubmit={submit}>
        {currentQuestions.map((question) => (
          <fieldset className="pq-question" id={`question-${question.id}`} key={question.id}>
            <legend>
              <span className="pq-num">{visibleQuestions.indexOf(question) + 1}</span>
              {question.prompt || '—'}
              {question.required ? <em>{copy.required}</em> : null}
            </legend>
            <QuestionField
              question={question}
              value={answers[question.id]}
              copy={copy}
              onChange={(value) => { setError(''); setAnswers((current) => ({ ...current, [question.id]: value })); }}
            />
          </fieldset>
        ))}

        {error ? <p className="pq-error" role="alert">{error}</p> : null}

        {lastPage ? (
          <div className="pq-verify">
            {verifyFailed ? null : (
              <TurnstileWidget
                onVerify={(token) => { setTurnstileToken(token); setVerifyFailed(false); }}
                onExpire={() => setTurnstileToken('')}
                onError={() => { setVerifyFailed(true); setTurnstileToken(''); }}
              />
            )}
            <p className={verifyFailed ? 'pq-verify-note is-error' : 'pq-verify-note'}>
              {verifyFailed ? copy.verifyFailed : copy.verifyHint}
            </p>
            {verifyFailed ? (
              <button type="button" className="pq-retry" onClick={() => window.location.reload()}>{copy.retry}</button>
            ) : null}
          </div>
        ) : null}

        {lastPage ? (
          <p className="pq-consent">
            {afterPrivacy !== undefined
              ? <>{beforePrivacy}<a href="/privacy" target="_blank" rel="noreferrer">{copy.privacy}</a>{afterPrivacy}</>
              : <>{copy.consent} <a href="/privacy" target="_blank" rel="noreferrer">{copy.privacy}</a></>}
          </p>
        ) : null}
      </form>

      {/* The two ends stay put; only the questions scroll between them. */}
      <footer className="pq-foot">
        <div className="pq-foot-actions">
          {pageIndex > 0 ? (
            <button type="button" className="pq-back" onClick={goBack}>{copy.back}</button>
          ) : <span />}
          {lastPage ? (
            <button className="pq-submit" type="submit" form="pq-form" disabled={submitting || !turnstileToken || verifyFailed}>
              {submitting ? <LoaderCircle className="pq-spin" size={17} /> : null}
              {submitting ? copy.submitting : copy.submit}
            </button>
          ) : (
            <button type="button" className="pq-submit" onClick={goNext}>{copy.next}</button>
          )}
        </div>

        {pages.length > 1 ? (
          <nav className="pq-map" aria-label={copy.mapLabel}>
            {pages.map((group, groupIndex) => {
              const answered = group.every((question) => !question.required || hasAnswer(answers[question.id]));
              const reachable = groupIndex <= furthest;
              return (
                <button
                  key={`map-${groupIndex}`}
                  type="button"
                  className={`${groupIndex === pageIndex ? 'is-current' : ''} ${answered && groupIndex !== pageIndex ? 'is-done' : ''}`.trim()}
                  disabled={!reachable}
                  aria-current={groupIndex === pageIndex ? 'step' : undefined}
                  title={group.map((question) => question.prompt).join(' · ')}
                  onClick={() => {
                    if (!reachable) return;
                    setPage(groupIndex);
                    document.getElementById('pq-form')?.scrollTo({ top: 0 });
                  }}
                >
                  {groupIndex + 1}
                </button>
              );
            })}
          </nav>
        ) : null}
      </footer>
    </main>
  );
}
