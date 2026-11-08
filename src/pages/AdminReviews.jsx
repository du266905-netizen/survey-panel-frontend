import { useEffect, useMemo, useState } from 'react';
import { Check, ClipboardList, RefreshCcw, X } from 'lucide-react';
import { getAdminBusinessQuestionnaires, reviewAdminBusinessQuestionnaire } from '../api/realApi';
import './AdminReviews.css';

/* 问卷审核。
 *
 * 左边是队列（按客户提交时间排队），右边是这份问卷本身：题干、类型、必答、选项数。
 * 交互照 GitHub 的 PR 审核和 Linear 的 triage：一屏看内容，底部两个判断，
 * 通过就离开队列，不通过要写原因。
 *
 * 后端现在只有「通过」这一种状态（APPROVED / 自助问卷直接变 PUBLISHED），
 * 没有「退回」——所以退回按钮先禁用并写明原因，不做一个点了没反应的按钮。
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

const REVIEW_ERRORS = {
  QUOTE_REQUIRED: '这个项目还没有被接受的报价，按规则不能发布。先去报价与退款审批里处理。',
  PAYMENT_REQUIRED: '这个项目还没收到款，按规则不能发布。',
  QUESTIONNAIRE_EMPTY: '这份问卷一道题都没有，不能发布。',
  QUESTIONNAIRE_REVIEW_STATE_INVALID: '状态变了——它可能已经不在待审核里。刷新一下。',
};

export default function AdminReviews() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [doneNote, setDoneNote] = useState('');

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

  const active = useMemo(() => queue.find((item) => item.id === activeId) || null, [queue, activeId]);

  const approve = async () => {
    if (!active) return;
    setBusy(true);
    setError('');
    try {
      await reviewAdminBusinessQuestionnaire(active.id, 'APPROVED');
      setQueue((current) => current.filter((item) => item.id !== active.id));
      setActiveId(null);
      setDoneNote(`「${active.title}」已通过。${active.collectionMode === 'SELF_DISTRIBUTED' ? '自助问卷已直接开始回收。' : '客户那边下一步可以发布。'}`);
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
          <h1>问卷审核</h1>
          <p>客户提交的问卷在这里排队；看一遍题干和题量，没问题就放过去。</p>
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
            <span>待审核</span>
            <em>{loading ? '·' : queue.length}</em>
          </div>
          {queue.length ? queue.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rv-item${item.id === activeId ? ' is-active' : ''}`}
              onClick={() => { setActiveId(item.id); setError(''); }}
            >
              <strong>{item.title || '未命名问卷'}</strong>
              <small>{item.client} · {item.questionCount} 题</small>
              <em>{item.updatedAt ? new Date(item.updatedAt).toISOString().slice(0, 10) : ''}</em>
            </button>
          )) : (
            <div className="rv-queue-empty">
              <ClipboardList size={18} aria-hidden="true" />
              <p>{loading ? '读取中…' : failed ? '接口没回来。' : '队列空了。客户提交新的问卷后会出现在这里。'}</p>
            </div>
          )}
        </aside>

        <section className="rv-panel">
          {active ? (
            <>
              <header className="rv-panel-head">
                <div>
                  <h2>{active.title || '未命名问卷'}</h2>
                  <p>{active.client} · {active.questionCount} 题 · {active.collectionMode === 'SELF_DISTRIBUTED' ? '客户自己投放' : '我们投放'}</p>
                </div>
              </header>

              {error ? <p className="rv-error">{error}</p> : null}

              <ol className="rv-questions">
                {(active.questions || []).map((question, index) => (
                  <li key={question.id}>
                    <span className="rv-index">{index + 1}</span>
                    <div>
                      <p>
                        {question.prompt}
                        {question.required ? <em>必答</em> : null}
                      </p>
                      <small>
                        {TYPE_LABEL[question.type] || question.type}
                        {question.choices?.length ? ` · ${question.choices.length} 个选项` : ''}
                      </small>
                    </div>
                  </li>
                ))}
                {!active.questions?.length ? <li className="rv-empty">这份问卷还没有题。</li> : null}
              </ol>

              <footer className="rv-actions">
                <button type="button" className="con-btn" disabled title="后端还没有退回状态">退回</button>
                <button type="button" className="con-btn is-primary" disabled={busy || !active.questionCount} onClick={approve}>
                  <Check size={14} /> {busy ? '处理中…' : '通过'}
                </button>
                <span className="rv-actions-note">退回要后端先加一个「需修改」状态，现在点不了。</span>
              </footer>
            </>
          ) : (
            <div className="rv-panel-empty">
              <X size={18} aria-hidden="true" />
              <p>左边挑一份问卷开始看。</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
