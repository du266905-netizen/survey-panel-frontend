import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ListChecks, Receipt, Rocket, Trash2, Users } from 'lucide-react';
import { getBusinessProject, updateBusinessAudience } from '../api/realApi';
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
 * Targeting is stored with the project. The broader `filters` object preserves
 * every editor condition while the named dimensions feed pricing and routing. */
const GROUPS = [
  {
    id: 'demo',
    label: { 'zh-CN': '人口统计', en: 'Demographics' },
    items: [
      { id: 'age', label: { 'zh-CN': '年龄', en: 'Age' }, options: ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'] },
      { id: 'gender', label: { 'zh-CN': '性别', en: 'Gender' }, options: ['男', '女', '非二元', '不愿透露'] },
      { id: 'marital', label: { 'zh-CN': '婚姻状况', en: 'Marital status' }, options: ['未婚', '已婚', '同居', '离异', '丧偶'] },
      { id: 'children', label: { 'zh-CN': '子女', en: 'Children' }, options: ['有 18 岁以下子女', '无 18 岁以下子女'] },
      { id: 'education', label: { 'zh-CN': '教育程度', en: 'Education' }, options: ['中学及以下', '大专', '本科', '硕士', '博士'] },
      { id: 'employment', label: { 'zh-CN': '就业状态', en: 'Employment' }, options: ['全职', '兼职', '自雇', '学生', '待业', '退休'] },
    ],
  },
  {
    id: 'geo',
    label: { 'zh-CN': '地域与语言', en: 'Geography and language' },
    items: [
      { id: 'country', label: { 'zh-CN': '居住国家 / 地区', en: 'Country of residence' }, options: ['中国内地', '中国香港', '中国台湾', '新加坡', '日本', '韩国', '美国', '英国', '德国', '其他'] },
      { id: 'urbanity', label: { 'zh-CN': '城市类型', en: 'Urbanity' }, options: ['城市', '郊区', '乡镇 / 农村'] },
      { id: 'language', label: { 'zh-CN': '常用语言', en: 'Language' }, options: ['中文', '英文', '中英双语', '其他'] },
    ],
  },
  {
    id: 'b2b',
    label: { 'zh-CN': '企业与职能', en: 'Company and role' },
    items: [
      { id: 'industry', label: { 'zh-CN': '行业', en: 'Industry' }, options: ['汽车', '旅游', '消费品', '医疗健康', '金融', '社会与公共', '工业制造', '科技', '媒体', '电商'] },
      { id: 'companySize', label: { 'zh-CN': '公司规模', en: 'Company size' }, options: ['1–10 人', '11–50 人', '51–200 人', '201–1000 人', '1001–5000 人', '5000 人以上'] },
      { id: 'department', label: { 'zh-CN': '部门', en: 'Department' }, options: ['市场', '产品', '研发', '采购', '销售', '人力', '管理层'] },
      { id: 'seniority', label: { 'zh-CN': '职级', en: 'Seniority' }, options: ['专员', '经理', '总监', '副总裁', '创始人 / CEO'] },
      { id: 'authority', label: { 'zh-CN': '决策权', en: 'Decision role' }, options: ['最终决策', '参与决策', '提供建议', '不参与'] },
    ],
  },
  {
    id: 'behavior',
    label: { 'zh-CN': '行为与品牌', en: 'Behaviour and brand' },
    items: [
      { id: 'usage', label: { 'zh-CN': '品类使用频率', en: 'Category usage' }, options: ['每天', '每周', '每月', '很少'] },
      { id: 'brand', label: { 'zh-CN': '品牌关系', en: 'Brand relationship' }, options: ['知道并正在使用', '知道但未使用', '考虑中', '不知道'] },
      { id: 'channel', label: { 'zh-CN': '购买渠道', en: 'Purchase channel' }, options: ['线上', '线下', '两者都有'] },
      { id: 'device', label: { 'zh-CN': '常用设备', en: 'Device' }, options: ['手机', '电脑', '平板'] },
    ],
  },
  {
    id: 'sensitive',
    label: { 'zh-CN': '敏感项（需谨慎）', en: 'Sensitive (with care)' },
    items: [
      { id: 'politics', label: { 'zh-CN': '政治倾向', en: 'Political leaning' }, options: ['偏左', '中间', '偏右', '不愿透露'] },
      { id: 'religion', label: { 'zh-CN': '宗教信仰', en: 'Religion' }, options: ['有宗教信仰', '无宗教信仰', '不愿透露'] },
      { id: 'sexuality', label: { 'zh-CN': '性取向', en: 'Sexual orientation' }, options: ['异性恋', 'LGBTQ+', '不愿透露'] },
      { id: 'health', label: { 'zh-CN': '健康状况', en: 'Health condition' }, options: ['有长期健康状况', '无', '不愿透露'] },
    ],
  },
];

const copy = {
  'zh-CN': {
    back: '返回项目', flow: '流程',
    stepAudience: '受众', stepQuestions: '问卷构建', stepQuote: '报价与付款', stepLaunch: '发布投放',
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
    estimateNote: '示意价，按筛选条件与 {minutes} 分钟时长估算，正式报价以项目为准。',
    next: '下一步：问卷',
    localOnly: '受众条件会随项目保存，换设备后仍可继续编辑。', save: '保存受众', saving: '保存中…', saveFailed: '受众条件未保存，请重试。',
    notSet: '未选择',
    briefTitle: '项目简报', briefEdit: '编辑简报', briefExpand: '展开全部', briefCollapse: '收起',
    briefGoal: '研究目标', briefAudience: '受众描述', briefFormat: '研究形式', briefLanguages: '语言',
    briefTiming: '时间要求', briefIncentive: '激励', briefContext: '补充说明',
    briefMarket: '市场', briefParticipants: '目标人数', briefPeople: '{n} 人', briefMinutes: '单份时长', briefMin: '{n} 分钟',
  },
  en: {
    back: 'Back to project', flow: 'Flow',
    stepAudience: 'Audience', stepQuestions: 'Build', stepQuote: 'Quote and payment', stepLaunch: 'Launch',
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
    estimateNote: 'Indicative only, based on filters and a {minutes}-minute interview; the project quote is the record.',
    next: 'Next: questionnaire',
    localOnly: 'Audience criteria are saved with this project and stay available on another device.', save: 'Save audience', saving: 'Saving…', saveFailed: 'Audience criteria could not be saved. Try again.',
    notSet: 'Not set',
    briefTitle: 'Project brief', briefEdit: 'Edit brief', briefExpand: 'Show all', briefCollapse: 'Collapse',
    briefGoal: 'Research goal', briefAudience: 'Audience', briefFormat: 'Format', briefLanguages: 'Languages',
    briefTiming: 'Timing', briefIncentive: 'Incentive', briefContext: 'Additional notes',
    briefMarket: 'Market', briefParticipants: 'Target completes', briefPeople: '{n}', briefMinutes: 'Length', briefMin: '{n} min',
  },
};

const SIZES = [100, 500, 1000, 1500, 2000];

export default function BusinessAudience() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const [project, setProject] = useState(null);
  const [openGroup, setOpenGroup] = useState('demo');
  const [openItem, setOpenItem] = useState('age');
  const [selection, setSelection] = useState({});
  const [completes, setCompletes] = useState(1000);
  const [customSize, setCustomSize] = useState('');
  const [logic, setLogic] = useState('and');
  const [briefOpen, setBriefOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    getBusinessProject(projectId).then((response) => {
      const next = response.data.project;
      const targeting = next.targeting || {};
      setProject(next);
      setSelection(targeting.filters || {});
      setCompletes(targeting.completes || 1000);
      setLogic(String(targeting.joiner || 'AND').toLowerCase());
    }).catch(() => {});
  }, [projectId]);

  const label = (value) => (typeof value === 'object' ? value[language] || value.en : value);

  const formatLabel = (format) => ({
    SURVEY: language === 'zh-CN' ? '在线问卷' : 'Online survey',
    INTERVIEW: language === 'zh-CN' ? '深访' : 'Interview',
    GROUP_DISCUSSION: language === 'zh-CN' ? '座谈会' : 'Group discussion',
    USABILITY_TEST: language === 'zh-CN' ? '可用性测试' : 'Usability test',
    OTHER: language === 'zh-CN' ? '其他' : 'Other',
  }[format] || format || '—');

  const incentiveLabel = (value) => ({
    CONFIRMED: language === 'zh-CN' ? '已确定' : 'Confirmed',
    NEED_GUIDANCE: language === 'zh-CN' ? '需要建议' : 'Needs guidance',
    NOT_APPLICABLE: language === 'zh-CN' ? '不适用' : 'Not applicable',
  }[value] || value || '—');
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
  const saveAudience = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const targeting = {
        age: selection.age || [], industry: selection.industry || [], urbanity: selection.urbanity || [],
        joiner: logic.toUpperCase(), completes, filters: selection,
      };
      const response = await updateBusinessAudience(projectId, targeting);
      setProject(response.data.project);
    } catch {
      setSaveError(text.saveFailed);
    } finally {
      setSaving(false);
    }
  };

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
          <button type="button" className="sq-btn" disabled={saving} onClick={saveAudience}>
            {saving ? text.saving : text.save}
          </button>
          <button type="button" className="sq-btn is-primary" onClick={() => navigate(withLanguage(`/business/projects/${projectId}`, language))}>
            {text.next}
          </button>
        </div>
      </header>

      {saveError ? <p className="sq-error" role="alert">{saveError}</p> : null}

      <div className="sq-shell">
        <nav className="sq-nav" aria-label={text.flow}>
          <span className="is-active"><Users size={16} aria-hidden="true" /> {text.stepAudience}</span>
          <a href={withLanguage(`/business/projects/${projectId}`, language)}>
            <ListChecks size={16} aria-hidden="true" /> {text.stepQuestions}
          </a>
          <span className="is-todo"><Receipt size={16} aria-hidden="true" /> {text.stepQuote}</span>
          <span className="is-todo"><Rocket size={16} aria-hidden="true" /> {text.stepLaunch}</span>
        </nav>

        <section className="aud-canvas">
          {project ? (
            <section className="aud-brief">
              <header>
                <strong>{text.briefTitle}</strong>
                <div className="aud-brief-actions">
                  <button type="button" className="aud-brief-edit" onClick={() => setBriefOpen((open) => !open)}>
                    {briefOpen ? text.briefCollapse : text.briefExpand}
                  </button>
                  <button
                    type="button"
                    className="aud-brief-edit"
                    onClick={() => navigate(withLanguage(`/business/workspace?view=projects&brief=${projectId}`, language))}
                  >
                    {text.briefEdit}
                  </button>
                </div>
              </header>
              <dl>
                <div><dt>{text.briefGoal}</dt><dd>{project.researchGoal || '—'}</dd></div>
                <div><dt>{text.briefAudience}</dt><dd>{project.audienceDescription || '—'}</dd></div>
                {briefOpen ? (
                  <>
                    <div><dt>{text.briefFormat}</dt><dd>{formatLabel(project.studyFormat)}</dd></div>
                    <div><dt>{text.briefMarket}</dt><dd>{project.countries || '—'}</dd></div>
                    <div><dt>{text.briefLanguages}</dt><dd>{project.languages || '—'}</dd></div>
                    <div><dt>{text.briefParticipants}</dt><dd>{project.targetParticipants ? text.briefPeople.replace('{n}', project.targetParticipants) : '—'}</dd></div>
                    <div><dt>{text.briefMinutes}</dt><dd>{project.estimatedMinutes ? text.briefMin.replace('{n}', project.estimatedMinutes) : '—'}</dd></div>
                    <div><dt>{text.briefTiming}</dt><dd>{project.timeline || '—'}</dd></div>
                    <div><dt>{text.briefIncentive}</dt><dd>{incentiveLabel(project.incentiveBudget)}</dd></div>
                    <div><dt>{text.briefContext}</dt><dd>{project.additionalContext || '—'}</dd></div>
                  </>
                ) : null}
              </dl>
            </section>
          ) : null}

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
            <p>{text.estimateNote.replace('{minutes}', minutes)}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
