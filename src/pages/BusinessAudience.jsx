import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Plus, Trash2, Users } from 'lucide-react';
import { getBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessQuestionnaireStudio.css';
import './BusinessAudience.css';

/* Step one: who the study talks to.
 *
 * The categories are the ten the site already publishes (automotive … ecommerce)
 * plus the standard layers a sample provider quotes on: demographics, company
 * facts for B2B work, and behaviour. Picking values here is not a survey
 * question — it decides who gets invited, how hard they are to find, and what
 * the fieldwork costs.
 *
 * The selection is held in this browser for now: the project record has no
 * targeting field yet, so nothing here is written to the server. */
const GROUPS = [
  {
    id: 'demo',
    label: { 'zh-CN': '社会人口', en: 'Demographics' },
    items: [
      { id: 'age', label: { 'zh-CN': '年龄', en: 'Age' }, options: ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'] },
      { id: 'gender', label: { 'zh-CN': '性别', en: 'Gender' }, options: ['男', '女', '其他 / 不愿透露'] },
      { id: 'region', label: { 'zh-CN': '地区', en: 'Region' }, options: ['一线城市', '新一线城市', '二线城市', '三线及以下'] },
      { id: 'income', label: { 'zh-CN': '个人月收入', en: 'Personal income' }, options: ['5,000 以下', '5,000–10,000', '10,000–20,000', '20,000–50,000', '50,000 以上'] },
      { id: 'education', label: { 'zh-CN': '学历', en: 'Education' }, options: ['高中及以下', '大专', '本科', '硕士及以上'] },
      { id: 'employment', label: { 'zh-CN': '职业状态', en: 'Employment' }, options: ['全职', '兼职', '自由职业', '学生', '退休'] },
    ],
  },
  {
    id: 'b2b',
    label: { 'zh-CN': '企业与职能', en: 'Company and role' },
    items: [
      {
        id: 'industry',
        label: { 'zh-CN': '行业', en: 'Industry' },
        options: ['汽车', '旅游', '消费品', '医疗健康', '金融', '社会与公共', '工业制造', '科技', '媒体', '电商'],
      },
      { id: 'companySize', label: { 'zh-CN': '公司规模', en: 'Company size' }, options: ['1–10 人', '11–50 人', '51–200 人', '201–1000 人', '1000 人以上'] },
      { id: 'department', label: { 'zh-CN': '部门', en: 'Department' }, options: ['市场', '产品', '研发', '采购', '管理层'] },
      { id: 'seniority', label: { 'zh-CN': '职级', en: 'Seniority' }, options: ['专员', '经理', '总监', '副总裁及以上'] },
    ],
  },
  {
    id: 'behavior',
    label: { 'zh-CN': '行为与品类', en: 'Behaviour' },
    items: [
      { id: 'usage', label: { 'zh-CN': '品类使用频率', en: 'Category usage' }, options: ['每天', '每周', '每月', '很少'] },
      { id: 'brand', label: { 'zh-CN': '品牌认知', en: 'Brand awareness' }, options: ['知道并使用', '知道但未使用', '不知道'] },
      { id: 'channel', label: { 'zh-CN': '购买渠道', en: 'Purchase channel' }, options: ['线上', '线下', '两者都有'] },
    ],
  },
];

const copy = {
  'zh-CN': {
    back: '返回项目', flow: '流程',
    stepAudience: '受众', stepQuestions: '问卷', stepQuote: '报价', stepPay: '付款',
    title: '确立受众',
    intro: '选出这次要访问的人。条件越多，符合的人越少，单位成本越高。',
    groupHint: '点开一组，选择条件',
    selected: '已选条件',
    empty: '还没有选条件',
    emptyHint: '左边点一个条件，右边会给这个条件估值。',
    any: '任意',
    remove: '移除',
    logicOr: '或者',
    logicAnd: '并且',
    sampleSize: '需要多少份有效回答',
    custom: '自定义',
    estimate: '估算',
    incidence: '符合比例',
    perComplete: '单份成本',
    total: '合计',
    estimateNote: '示意价，按筛选条件与默认 8 分钟时长估算，正式报价以项目为准。',
    next: '下一步：问卷',
    localOnly: '当前选择只保存在这台浏览器：项目还没有存放受众条件的字段。',
    notSet: '未选择',
  },
  en: {
    back: 'Back to project', flow: 'Flow',
    stepAudience: 'Audience', stepQuestions: 'Questionnaire', stepQuote: 'Quote', stepPay: 'Payment',
    title: 'Choose the audience',
    intro: 'Pick who gets invited. Every extra condition narrows the pool and raises the cost per complete.',
    groupHint: 'Open a group and pick conditions',
    selected: 'Selected conditions',
    empty: 'Nothing selected yet',
    emptyHint: 'Pick a condition on the left and it is priced here.',
    any: 'Any',
    remove: 'Remove',
    logicOr: 'OR',
    logicAnd: 'AND',
    sampleSize: 'Completed responses needed',
    custom: 'Custom',
    estimate: 'Estimate',
    incidence: 'Incidence',
    perComplete: 'Cost per complete',
    total: 'Total',
    estimateNote: 'Indicative only, based on filters and an 8-minute interview; the project quote is the record.',
    next: 'Next: questionnaire',
    localOnly: 'Kept in this browser only: the project record has no targeting field yet.',
    notSet: 'Not set',
  },
};

const SIZES = [100, 500, 1000, 1500, 2000];

const readSelection = (projectId) => {
  try {
    return JSON.parse(window.localStorage.getItem(`guanyisearch.business.targeting.${projectId}`) || '{}');
  } catch { return {}; }
};

export default function BusinessAudience() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const [project, setProject] = useState(null);
  const [openGroup, setOpenGroup] = useState('demo');
  const [openItem, setOpenItem] = useState('age');
  const [selection, setSelection] = useState(() => readSelection(projectId));
  const [completes, setCompletes] = useState(1000);
  const [customSize, setCustomSize] = useState('');
  const [logic, setLogic] = useState('and');

  useEffect(() => {
    getBusinessProject(projectId).then((response) => setProject(response.data.project)).catch(() => {});
  }, [projectId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(`guanyisearch.business.targeting.${projectId}`, JSON.stringify(selection));
    } catch { /* private mode */ }
  }, [projectId, selection]);

  const label = (value) => (typeof value === 'object' ? value[language] || value.en : value);
  const chosen = useMemo(() => Object.entries(selection).flatMap(([itemId, values]) => (
    GROUPS.flatMap((group) => group.items)
      .filter((item) => item.id === itemId)
      .flatMap((item) => values.map((value) => ({ itemId, itemLabel: label(item.label), value })))
  )), [selection, language]);

  const chosenCount = chosen.length;
  /* Indicative model: each condition narrows the pool; the price per complete
     rises as the pool narrows. Replaced by the pricing service when it exists. */
  const incidence = Math.max(0.02, 0.6 * (0.72 ** chosenCount));
  const minutes = project?.estimatedMinutes || 8;
  const perComplete = 1.1 + (1 / incidence) * 0.35 + minutes * 0.04;
  const total = completes * perComplete;

  const toggleValue = (itemId, value) => {
    setSelection((current) => {
      const values = current[itemId] || [];
      const next = values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
      const copySelection = { ...current };
      if (next.length) copySelection[itemId] = next;
      else delete copySelection[itemId];
      return copySelection;
    });
  };

  const money = (value) => new Intl.NumberFormat(language, { style: 'currency', currency: 'USD' }).format(value);

  return (
    <main className="sq-page aud-page">
      <header className="sq-top">
        <button type="button" className="sq-icon" onClick={() => navigate(withLanguage(`/business/projects/${projectId}`, language))} aria-label={text.back}>
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
        <div className="sq-title">
          <strong>{project?.title || '—'}</strong>
          <span className="sq-status">{text.title}</span>
        </div>
        <div className="sq-top-actions">
          <button type="button" className="sq-btn is-primary" onClick={() => navigate(withLanguage(`/business/projects/${projectId}`, language))}>
            {text.next}
          </button>
        </div>
      </header>

      <div className="sq-shell">
        <nav className="sq-nav" aria-label={text.flow}>
          <ol className="sq-steps">
            <li className="is-current"><span><span className="sq-step-n">1</span> {text.stepAudience}</span></li>
            <li><a href={withLanguage(`/business/projects/${projectId}`, language)}><span className="sq-step-n">2</span> {text.stepQuestions}</a></li>
            <li className="is-todo"><span><span className="sq-step-n">3</span> {text.stepQuote}</span></li>
            <li className="is-todo"><span><span className="sq-step-n">4</span> {text.stepPay}</span></li>
          </ol>
          <a className="sq-nav-back" href={withLanguage(`/business/projects/${projectId}`, language)}>
            <ArrowLeft size={14} aria-hidden="true" /> {text.back}
          </a>
        </nav>

        <section className="aud-canvas">
          <h1 className="aud-title">{text.title}</h1>
          <p className="aud-intro">{text.intro}</p>

          <div className="aud-groups">
            {GROUPS.map((group) => {
              const open = openGroup === group.id;
              return (
                <section className={`aud-group${open ? ' is-open' : ''}`} key={group.id}>
                  <button type="button" className="aud-group-head" onClick={() => setOpenGroup(open ? '' : group.id)} aria-expanded={open}>
                    <span>{label(group.label)}</span>
                    <ChevronDown size={15} className={open ? 'is-open' : ''} aria-hidden="true" />
                  </button>

                  {open ? group.items.map((item) => {
                    const values = selection[item.id] || [];
                    const isOpen = openItem === item.id;
                    return (
                      <div className={`aud-item${isOpen ? ' is-open' : ''}`} key={item.id}>
                        <button type="button" className="aud-item-head" onClick={() => setOpenItem(isOpen ? '' : item.id)} aria-expanded={isOpen}>
                          <span>{label(item.label)}</span>
                          <em>{values.length ? values.length : text.any}</em>
                        </button>
                        {isOpen ? (
                          <div className="aud-values">
                            {item.options.map((option) => (
                              <label key={option} className={`aud-chip${values.includes(option) ? ' is-on' : ''}`}>
                                <input type="checkbox" checked={values.includes(option)} onChange={() => toggleValue(item.id, option)} />
                                {option}
                              </label>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  }) : null}
                </section>
              );
            })}
          </div>

          <p className="aud-local">{text.localOnly}</p>
        </section>

        <section className="aud-selected">
          <h2>{text.selected}</h2>
          {chosen.length === 0 ? (
            <div className="aud-empty">
              <Users size={18} aria-hidden="true" />
              <strong>{text.empty}</strong>
              <span>{text.emptyHint}</span>
            </div>
          ) : (
            <div className="aud-cards">
              {Object.entries(selection).map(([itemId, values], index) => (
                <div className="aud-card" key={itemId}>
                  <header>
                    <strong>{chosen.find((entry) => entry.itemId === itemId)?.itemLabel}</strong>
                    <button type="button" className="sq-tool" onClick={() => setSelection((current) => {
                      const next = { ...current };
                      delete next[itemId];
                      return next;
                    })} aria-label={text.remove}>
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </header>
                  <div className="aud-card-values">
                    {values.map((value) => (
                      <span className="aud-tag" key={value}>
                        {value}
                        <button type="button" onClick={() => toggleValue(itemId, value)} aria-label={text.remove}>×</button>
                      </span>
                    ))}
                  </div>
                  {index < Object.keys(selection).length - 1 ? (
                    <button type="button" className="aud-logic" onClick={() => setLogic(logic === 'and' ? 'or' : 'and')}>
                      {logic === 'and' ? text.logicAnd : text.logicOr}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          <div className="aud-size">
            <h2>{text.sampleSize}</h2>
            <div className="aud-size-grid">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={completes === size ? 'is-on' : ''}
                  onClick={() => { setCompletes(size); setCustomSize(''); }}
                >
                  {size.toLocaleString(language)}
                </button>
              ))}
            </div>
            <label className="aud-custom">
              <span>{text.custom}</span>
              <input
                type="number"
                min="50"
                value={customSize}
                placeholder={String(completes)}
                onChange={(event) => {
                  setCustomSize(event.target.value);
                  const value = Number(event.target.value);
                  if (Number.isFinite(value) && value >= 50) setCompletes(value);
                }}
              />
            </label>
          </div>

          <div className="aud-estimate">
            <h2>{text.estimate}</h2>
            <dl>
              <div><dt>{text.incidence}</dt><dd>{Math.round(incidence * 100)}%</dd></div>
              <div><dt>{text.perComplete}</dt><dd>{money(perComplete)}</dd></div>
              <div className="is-total"><dt>{text.total}</dt><dd>{money(total)}</dd></div>
            </dl>
            <p>{text.estimateNote}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
