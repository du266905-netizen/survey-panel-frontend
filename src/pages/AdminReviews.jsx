import { useEffect, useMemo, useState } from 'react';
import { Check, ClipboardList, RefreshCcw, X } from 'lucide-react';
import { getAdminBusinessQuestionnaires, reviewAdminBusinessQuestionnaire } from '../api/realApi';
import './AdminReviews.css';

/* 问卷质检。
 *
 * 客户不自己写问卷——定制和定性的问卷都是我们做的，编辑器 24 小时开着。所以这一页
 * 不是“审批客户提交”，而是交付前的最后一道质检：自动检查把能算的算掉，人工清单
 * 把算不了的逐条勾掉，全绿才允许通过。
 *
 * 交互照 GitHub 的 PR 检查列表：左边队列，右边内容 + 检查项 + 结论。
 * 顺序照市场研究的常规做法：先看题目和研究目标对不对得上，再看逻辑、措辞、选项，
 * 最后才谈能不能发。
 */

const TYPE_LABEL = {
  SINGLE_CHOICE: '单选',
  MULTIPLE_CHOICE: '多选',
  DROPDOWN: '下拉',
  RATING: '评分',
  NPS: 'NPS',
  MATRIX: '矩阵',
  RANKING: '排序',
  NUMBER: '数字',
  SHORT_TEXT: '短文本',
  LONG_TEXT: '长文本',
  DATE: '日期',
};

const MANUAL_CHECKS = [
  { id: 'goal', label: '每道题都对得上研究目标', hint: '没有为了凑题量而加的题' },
  { id: 'logic', label: '跳转逻辑没有死角、没有循环', hint: '每条分支都能走到结尾' },
  { id: 'wording', label: '措辞中性，一问一事', hint: '没有引导、没有双重问题、没有双重否定' },
  { id: 'options', label: '选项互斥且穷尽', hint: '该有“其他 / 说不清 / 拒答”的都有' },
  { id: 'scale', label: '量表方向与标签一致', hint: '高分端永远是同一个方向' },
  { id: 'privacy', label: '敏感题合规', hint: '不收集与研究目标无关的个人信息' },
];

const REVIEW_ERRORS = {
  QUOTE_REQUIRED: '这个项目还没有被接受的报价，按规则不能发布。',
  PAYMENT_REQUIRED: '这个项目还没收到款，按规则不能发布。',
  QUESTIONNAIRE_EMPTY: '这份问卷一道题都没有。',
  QUESTIONNAIRE_REVIEW_STATE_INVALID: '状态变了——它可能已经不在待审核里。刷新一下。',
};

const autoChecks = (questionnaire) => {
  const questions = questionnaire.questions || [];
  const prompts = questions.map((question) => (question.prompt || '').trim());
  const duplicates = prompts.length !== new Set(prompts).size;
  const thinChoices = questions.some((question) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'DROPDOWN', 'RANKING'].includes(question.type) && (question.choices?.length || 0) < 2);
  const emptyPrompt = prompts.some((prompt) => !prompt);
  const requiredShare = questions.length ? questions.filter((question) => question.required).length / questions.length : 0;
  const minutes = Math.round(questions.length * 0.4);

  return [
    { id: 'empty', label: '没有空题干', pass: !emptyPrompt, hint: emptyPrompt ? '有题目是空的' : '' },
    { id: 'choices', label: '选择题至少两个选项', pass: !thinChoices, hint: thinChoices ? '有选择题只有一个选项' : '' },
    { id: 'dup', label: '没有重复题干', pass: !duplicates, hint: duplicates ? '有两条题干一样' : '' },
    { id: 'length', label: `题量适中（${questions.length} 题，约 ${minutes} 分钟）`, pass: questions.length > 0 && questions.length <= 25, hint: questions.length > 25 ? '超过 25 题，作答会疲劳' : '' },
    { id: 'required', label: `必答比例 ${Math.round(requiredShare * 100)}%`, pass: requiredShare <= 0.85, hint: requiredShare > 0.85 ? '几乎全是必答，容易被中途放弃' : '' },
  ];
};

export default function AdminReviews() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [checked, setChecked] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [doneNote, setDoneNote] = useState('');
  const [source, setSource] = useState('all');

  const load = () => {
    setLoading(true);
    getAdminBusinessQuestionnaires('PENDING_REVIEW')
      .then(({ data }) => {
        const list = data?.questionnaires || [];
        setQueue(list);
        setActiveId((current) => (list.some((item) => item.id === current) ? current : list[0]?.id || null));
        setFailed(false);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const visibleQueue = useMemo(() => queue.filter((item) => {
    if (source === 'managed') return item.collectionMode !== 'SELF_DISTRIBUTED';
    if (source === 'self') return item.collectionMode === 'SELF_DISTRIBUTED';
    return true;
  }), [queue, source]);

  const active = useMemo(() => queue.find((item) => item.id === activeId) || null, [queue, activeId]);
  const checks = useMemo(() => (active ? autoChecks(active) : []), [active]);
  const autoPass = checks.every((check) => check.pass);
  const manualDone = MANUAL_CHECKS.every((item) => checked[item.id]);
  const canApprove = Boolean(active) && autoPass && manualDone && !busy;

  const approve = async () => {
    if (!canApprove) return;
    setBusy(true);
    setError('');
    try {
      await reviewAdminBusinessQuestionnaire(active.id, 'APPROVED');
      setQueue((current) => current.filter((item) => item.id !== active.id));
      setActiveId(null);
      setChecked({});
      setDoneNote(`「${active.title || '未命名问卷'}」质检通过。${active.collectionMode === 'SELF_DISTRIBUTED' ? '客户可以开始回收了。' : '下一步是投放。'}`);
    } catch (err) {
      const code = err?.response?.data?.code || err?.code || '';
      setError(REVIEW_ERRORS[code] || '通过失败，稍后再试。');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>问卷质检</h1>
          <p>问卷是我们替客户做的：交付前过一遍自动检查，再逐条勾人工清单，全绿才能通过。</p>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
        </div>
      </header>

      {doneNote ? (
        <div className="rv-banner">
          <Check size={14} /> {doneNote}
          <button type="button" onClick={() => setDoneNote('')}>知道了</button>
        </div>
      ) : null}

      <div className="rv-grid">
        <aside className="rv-queue">
          <div className="rv-queue-head">
            <span>待质检</span>
            <em>{loading ? '·' : queue.length}</em>
          </div>
          <div className="rv-sources" role="tablist">
            {[['all', '全部'], ['managed', '我们投放'], ['self', '客户自投']].map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={source === id} className={source === id ? 'is-active' : ''} onClick={() => setSource(id)}>
                {label}
              </button>
            ))}
          </div>
          {visibleQueue.length ? visibleQueue.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rv-item${item.id === activeId ? ' is-active' : ''}`}
              onClick={() => { setActiveId(item.id); setChecked({}); setError(''); }}
            >
              <strong>{item.title || '未命名问卷'}</strong>
              <small>{item.client} · {item.questionCount} 题 · {item.collectionMode === 'SELF_DISTRIBUTED' ? '客户回收' : '我们投放'}</small>
              <em>{item.updatedAt ? new Date(item.updatedAt).toISOString().slice(0, 10) : ''}</em>
            </button>
          )) : (
            <div className="rv-queue-empty">
              <ClipboardList size={18} aria-hidden="true" />
              <p>{loading ? '读取中…' : failed ? '接口没回来。' : '队列空了。'}</p>
            </div>
          )}
        </aside>

        <section className="rv-panel">
          {active ? (
            <>
              <header className="rv-panel-head">
                <div>
                  <h2>{active.title || '未命名问卷'}</h2>
                  <p>{active.client} · {active.questionCount} 题 · {active.collectionMode === 'SELF_DISTRIBUTED' ? '客户自行回收' : '我们投放'}</p>
                </div>
              </header>

              {error ? <p className="rv-error">{error}</p> : null}

              <div className="rv-checks">
                <h3>自动检查</h3>
                {checks.map((check) => (
                  <div key={check.id} className={`rv-check${check.pass ? ' is-pass' : ' is-fail'}`}>
                    {check.pass ? <Check size={13} /> : <X size={13} />}
                    <span>{check.label}</span>
                    {check.hint ? <em>{check.hint}</em> : null}
                  </div>
                ))}
              </div>

              <div className="rv-checks">
                <h3>人工清单 <em>{MANUAL_CHECKS.filter((item) => checked[item.id]).length}/{MANUAL_CHECKS.length}</em></h3>
                {MANUAL_CHECKS.map((item) => (
                  <label key={item.id} className="rv-manual">
                    <input type="checkbox" checked={Boolean(checked[item.id])} onChange={(event) => setChecked((current) => ({ ...current, [item.id]: event.target.checked }))} />
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.hint}</small>
                    </span>
                  </label>
                ))}
              </div>

              <details className="rv-full">
                <summary>看全部题目（{active.questionCount}）</summary>
                <ol className="rv-questions">
                  {(active.questions || []).map((question, index) => (
                    <li key={question.id}>
                      <span className="rv-index">{index + 1}</span>
                      <div>
                        <p>{question.prompt}{question.required ? <em>必答</em> : null}</p>
                        <small>{TYPE_LABEL[question.type] || question.type}{question.choices?.length ? ` · ${question.choices.length} 个选项` : ''}</small>
                      </div>
                    </li>
                  ))}
                </ol>
              </details>

              <footer className="rv-actions">
                <button type="button" className="con-btn" disabled title="后端还没有退回状态">退回</button>
                <button type="button" className="con-btn is-primary" disabled={!canApprove} onClick={approve}>
                  <Check size={14} /> {busy ? '处理中…' : '通过'}
                </button>
                <span className="rv-actions-note">
                  {autoPass ? (manualDone ? '可以通过了。' : '人工清单还没勾完。') : '自动检查有没过的项，先改问卷。'}
                </span>
              </footer>
            </>
          ) : (
            <div className="rv-panel-empty">
              <ClipboardList size={18} aria-hidden="true" />
              <p>左边挑一份问卷开始质检。</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
