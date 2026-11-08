import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { getAdminBusinessProjects, getAdminBusinessQuestionnaires } from '../api/realApi';
import { STATUS_LABEL } from '../utils/businessStatus';
import AdminDetail from './admin/AdminDetail';
import './AdminDelivery.css';

/* 交付中心。
 *
 * 排法照 Vercel 的 Deployments：一个项目一条“交付”，看的是它到没到可以交的状态、
 * 交出去了没有、交付包里有什么。数据目前只有两样是真的——项目状态和答卷数；
 * 文件、报告、发票都还没有接口，所以交付包那几项如实标“未接”。
 */

const day = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '—');

export default function AdminDelivery() {
  const [projects, setProjects] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState('pending');
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([getAdminBusinessProjects('ALL'), getAdminBusinessQuestionnaires('ALL')])
      .then(([projectRes, questionnaireRes]) => {
        setProjects(projectRes.data?.projects || projectRes.data?.items || []);
        setQuestionnaires(questionnaireRes.data?.questionnaires || []);
        setFailed(false);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const rows = useMemo(() => projects.map((project) => {
    const questionnaire = questionnaires.find((item) => item.projectId === project.id);
    return {
      project,
      questionnaire,
      responses: questionnaire?.responseCount || 0,
      ready: ['LIVE', 'COMPLETED'].includes(project.status) && (questionnaire?.responseCount || 0) > 0,
    };
  }), [projects, questionnaires]);

  const pending = rows.filter((row) => row.ready && row.project.status === 'COMPLETED');
  const running = rows.filter((row) => row.project.status === 'LIVE');
  const listed = tab === 'pending' ? pending : running;

  const detail = selected;

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>交付中心</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {[['pending', `待交付 · ${pending.length}`], ['running', `还在跑 · ${running.length}`]].map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="con-table">
        <table>
          <thead>
            <tr><th>项目</th><th>客户</th><th className="is-right">答卷</th><th>问卷</th><th className="is-right">最近更新</th></tr>
          </thead>
          <tbody>
            {listed.length ? listed.map((row) => (
              <tr key={row.project.id} className="is-clickable" onClick={() => setSelected(row)}>
                <td>{row.project.title || '未命名项目'}</td>
                <td>{row.project.contactEmail || row.project.client || '—'}</td>
                <td className="is-right">{row.responses}</td>
                <td><span className="dl-stage">{STATUS_LABEL[row.project.status] || row.project.status}</span></td>
                <td className="is-right">{day(row.project.updatedAt)}</td>
              </tr>
            )) : (
              <tr className="is-empty">
                <td colSpan={5}>
                  {loading ? '读取中…' : failed ? '接口没回来。' : tab === 'pending' ? '没有待交付的项目。项目完成、答卷收齐后会出现在这里。' : '没有正在回收的项目。'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="dl-note">
        交付动作还没有接口：报告、数据集、发票都还不能从这里发出去。这份队列先用真实数据把“该交的”和“还在跑”分开。
      </p>

      <AdminDetail
        open={Boolean(detail)}
        title={detail?.project?.title || ''}
        status={detail ? STATUS_LABEL[detail.project.status] || detail.project.status : ''}
        onClose={() => setSelected(null)}
        fields={detail ? [
          { label: '客户', value: detail.project.contactEmail || detail.project.client },
          { label: '答卷', value: detail.responses },
          { label: '问卷', value: detail.questionnaire?.title || '—' },
          { label: '最近更新', value: day(detail.project.updatedAt) },
        ] : []}
      >
        {detail ? (
          <div className="dl-pack">
            <h3>交付包</h3>
            <ul>
              <li><span>数据集（CSV / SPSS）</span><em>未接</em></li>
              <li><span>编码本与问卷定稿</span><em>未接</em></li>
              <li><span>图表与报告</span><em>未接</em></li>
              <li><span>发票</span><em>未接</em></li>
              <li><span>交付通知（站内 + 邮件）</span><em>未接</em></li>
            </ul>
            <p>等对象存储与报告接口到位，这五项各有一个状态，交付就是把它们逐个点亮。</p>
          </div>
        ) : null}
      </AdminDetail>
    </div>
  );
}
