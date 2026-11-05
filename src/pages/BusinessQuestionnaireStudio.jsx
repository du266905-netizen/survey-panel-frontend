import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle, Archive, ArrowLeft, Check, CheckCircle2, ChevronDown, Copy, Eye, Gauge, GripVertical, LayoutTemplate, Sparkles, Undo2,
  ListChecks, LoaderCircle, MoreHorizontal, Plus, Receipt, Rocket, Send, Settings2, Star, Trash2, Users, X,
} from 'lucide-react';
import {
  archiveBusinessQuestionnaire, deleteBusinessProject, duplicateBusinessQuestionnaire,
  getBusinessProject, publishBusinessQuestionnaire, saveBusinessQuestionnaire,
} from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { assistQuestion } from '../ai/questionAssistClient';
import './BusinessQuestionnaireStudio.css';

/* The questionnaire editor.
 *
 * Cards are compact on purpose: the header row carries everything that acts on
 * the question (number, prompt, type, required, duplicate, menu), and the rows
 * below are the answers, edited in place. Enter adds a row, Backspace on an
 * empty row removes it — no "add option" button to hunt for.
 *
 * Persistence is unchanged: the same questions array, settings filtered to the
 * five keys the server accepts, so a save cannot 400 on report-only fields. */

const TYPES = [
  ['SINGLE_CHOICE', '单选', 'Single choice'],
  ['MULTIPLE_CHOICE', '多选', 'Multiple choice'],
  ['DROPDOWN', '下拉', 'Dropdown'],
  ['RATING', '评分', 'Rating'],
  ['NPS', 'NPS', 'NPS'],
  ['MATRIX', '矩阵', 'Matrix'],
  ['RANKING', '排序', 'Ranking'],
  ['NUMBER', '数字', 'Number'],
  ['SHORT_TEXT', '短文本', 'Short text'],
  ['LONG_TEXT', '长文本', 'Long text'],
  ['DATE', '日期', 'Date'],
];
const TYPE_LABEL = Object.fromEntries(TYPES.map(([value, zh, en]) => [value, { 'zh-CN': zh, en }]));
const CHOICE_TYPES = ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING', 'RANKING', 'DROPDOWN'];
const MATRIX_DEFAULT_COLUMNS = ['非常不同意', '不同意', '一般', '同意', '非常同意'];
const LOGIC_TYPES = ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING'];
const SAVE_SETTINGS = ['allowOther', 'maxSelections', 'randomizeChoices', 'scaleLowLabel', 'scaleHighLabel', 'matrixColumns'];
const MAX_QUESTIONS = 30;
const SECTIONS = [
  ['SCREENING', '甄别', 'Screening'],
  ['CORE', '核心', 'Core'],
  ['PROFILE', '画像', 'Profile'],
  ['CLOSING', '收尾', 'Closing'],
];

/* Whole questionnaires, not parts: a template inserts the prompts, the
   options and the sections, so a study starts from something real. All of them
   use only the seven types the API already accepts. */
const TEMPLATES = [
  {
    id: 'nps',
    name: { 'zh-CN': 'NPS 推荐意愿', en: 'NPS' },
    detail: { 'zh-CN': '8 题 · 推荐分、原因、使用情况、改进点、画像', en: '8 questions · score, reason, usage, improvement, profile' },
    questions: [
      { type: 'RATING', section: 'CORE', prompt: '您有多大可能把我们的产品推荐给同事或朋友？', required: true, choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], settings: { scaleLowLabel: '完全不会', scaleHighLabel: '非常愿意' } },
      { type: 'LONG_TEXT', section: 'CORE', prompt: '您给出这个分数的主要原因是什么？', required: false, choices: [] },
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '您使用我们产品多久了？', required: true, choices: ['不到 3 个月', '3–12 个月', '1–3 年', '3 年以上'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '您多久使用一次？', required: true, choices: ['每天', '每周', '每月', '更少'], settings: {} },
      { type: 'MULTIPLE_CHOICE', section: 'CORE', prompt: '以下哪些方面最需要改进？', required: false, choices: ['功能完整度', '易用性', '速度与稳定性', '价格', '客户支持'], settings: { allowOther: true } },
      { type: 'SINGLE_CHOICE', section: 'PROFILE', prompt: '您所在公司的规模？', required: false, choices: ['1–10 人', '11–50 人', '51–200 人', '200 人以上'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'CLOSING', prompt: '是否愿意接受后续 15 分钟回访？', required: false, choices: ['愿意', '不愿意'], settings: {} },
      { type: 'SHORT_TEXT', section: 'CLOSING', prompt: '如果愿意，请留下联系邮箱（选填）', required: false, choices: [] },
    ],
  },
  {
    id: 'concept',
    name: { 'zh-CN': '概念测试', en: 'Concept test' },
    detail: { 'zh-CN': '7 题 · 购买意愿、喜欢与不喜欢、价格、决策角色', en: '7 questions · intent, likes, dislikes, price, role' },
    questions: [
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '看到这个产品概念后，您购买的可能性有多大？', required: true, choices: ['一定会买', '很可能会买', '说不准', '可能不会买', '一定不会买'], settings: {} },
      { type: 'LONG_TEXT', section: 'CORE', prompt: '这个概念里，您最喜欢的是什么？', required: false, choices: [] },
      { type: 'LONG_TEXT', section: 'CORE', prompt: '最让您犹豫的是什么？', required: false, choices: [] },
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '您认为合理的价格区间是？', required: true, choices: ['低于 100 元', '100–300 元', '300–600 元', '600 元以上'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '与您现在使用的方式相比，它更好还是更差？', required: true, choices: ['明显更好', '略好', '差不多', '略差', '明显更差'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'PROFILE', prompt: '您在采购决策中的角色？', required: true, choices: ['最终决策', '参与决策', '提供建议', '不参与'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'CLOSING', prompt: '是否愿意参与后续测试？', required: false, choices: ['愿意', '不愿意'], settings: {} },
    ],
  },
  {
    id: 'brand',
    name: { 'zh-CN': '品牌追踪', en: 'Brand tracker' },
    detail: { 'zh-CN': '7 题 · 认知、首选、使用、满意度、推荐、切换', en: '7 questions · awareness, choice, usage, satisfaction, advocacy, switching' },
    questions: [
      { type: 'MULTIPLE_CHOICE', section: 'CORE', prompt: '您知道以下哪些品牌？', required: true, choices: ['品牌 A', '品牌 B', '品牌 C', '品牌 D', '都不知道'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '如果只能选一个，您会首选哪个品牌？', required: true, choices: ['品牌 A', '品牌 B', '品牌 C', '品牌 D', '没有偏好'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '您多久购买一次这个品类？', required: true, choices: ['每周', '每月', '每季度', '更少'], settings: {} },
      { type: 'RATING', section: 'CORE', prompt: '对目前使用品牌的整体满意度？', required: true, choices: ['1', '2', '3', '4', '5'], settings: { scaleLowLabel: '非常不满意', scaleHighLabel: '非常满意' } },
      { type: 'RATING', section: 'CORE', prompt: '您有多大可能推荐这个品牌？', required: true, choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], settings: { scaleLowLabel: '完全不会', scaleHighLabel: '非常愿意' } },
      { type: 'SINGLE_CHOICE', section: 'CORE', prompt: '未来半年，您会考虑换品牌吗？', required: false, choices: ['会', '不确定', '不会'], settings: {} },
      { type: 'SINGLE_CHOICE', section: 'PROFILE', prompt: '您的年龄段？', required: false, choices: ['18–24', '25–34', '35–44', '45–54', '55+'], settings: {} },
    ],
  },
];

const copy = {
  'zh-CN': {
    back: '返回项目', draft: '草稿', published: '已发布',
    flow: '流程', stepAudience: '受众', stepQuestions: '问卷构建', stepQuote: '报价与付款', stepLaunch: '发布投放',
    quality: '质量检查', summary: '问卷概况', questionsN: '题目', requiredN: '必答',
    minutes: '预计时长', minutesValue: '{n} 分钟', issues: '待处理', noIssues: '没有发现问题',
    issuePrompt: 'Q{n} 还没有题干', issueOptions: 'Q{n} 的选项少于 2 个',
    issueLogic: 'Q{n} 的显示条件指向了不存在的题', issueLogicValue: 'Q{n} 的显示条件取值不在选项里',
    issueDuplicate: 'Q{n} 和 Q{m} 题干重复',
    addQuestion: '添加题目', addOption: '添加选项', optionPlaceholder: '选项 {n}',
    duplicate: '复制这道题', menu: '更多', required: '必答', logic: '逻辑',
    logicNone: '始终显示', logicAdd: '添加显示条件', logicWhen: '当', logicIs: '是', logicPick: '选择一道题',
    remove: '删除', moveUp: '上移', moveDown: '下移',
    promptPlaceholder: '问题', type: '题型', options: '选项',
    save: '保存', publish: '发布', publishing: '发布中…', saved: '已保存', saveFailed: '保存失败，请稍后再试。',
    untitled: '未命名问卷', preview: '预览', quotas: '配额', templates: '模板',
    qualityButton: '质量检查', qualityTitle: '质量检查',
    assist: 'AI', assistTitle: '让 AI 改这道题', assistPlaceholder: '想让它怎么改？例如：更中性、别诱导、缩短',
    assistRewrite: '改写题干', assistOptions: '生成选项', assistApply: '采用', assistUndo: '撤销',
    assistThinking: '生成中…', assistFailed: 'AI 接口还没接上（后端待加 /assist）。', assistMock: '开发环境示例结果，不是模型输出。',
    assistEmpty: '先写一句要求，或直接点一个动作。',
    paging: '分页', pagingHint: '一页放几道题。设成分页后，受访者会看到进度条。',
    pagingOff: '一页到底', pagingOne: '一屏一题', pagingPerPage: '每页题数', pagingPages: '共 {n} 页，下面带题目地图', quotasTitle: '配额', quotasHint: '按题目答案划分格子，填每格需要多少份。相加就是总样本量。',
    quotaCell: '格子', quotaTarget: '目标份数', quotaAdd: '添加格子', quotaRemove: '删除', quotaEmpty: '还没有配额格子',
    quotaEmptyHint: '先有单选、多选或下拉题，才能按答案划分格子。', quotaTotal: '合计目标', quotaEnforced: '进人判断在后端：页面上能配，接口接上后才真正限流。', templatesTitle: '从整卷模板开始', templatesHint: '插入后可以直接改题目和选项。', templatesApply: '插入', templatesFull: '题目数量会超过 30 题上限',
    archived: '已归档', copyDraft: '复制为新草稿', archive: '归档', deleteDraft: '删除草稿',
    deleteConfirm: '删除这份草稿？删除后不可恢复。',
    locked: '已发布：结构已锁定。如需修改，复制为新草稿。',
    coverTitle: '封面说明', coverPlaceholder: '受访者打开问卷时先看到的一段话',
    sensitiveTitle: '这份问卷会收集敏感信息', sensitiveBody: '包含收入、性别、健康等字段时，发布前需要确认用途与告知已就位。',
    sensitiveConfirm: '确认并发布', sensitiveCancel: '再检查一下', previewTitle: '受访者看到的顺序', close: '关闭',
    next: '下一步', prev: '上一步', finish: '完成',
    other: '其他', requiredMark: '必答', optionalMark: '选填',
  },
  en: {
    back: 'Back to project', draft: 'Draft', published: 'Published',
    flow: 'Flow', stepAudience: 'Audience', stepQuestions: 'Build', stepQuote: 'Quote and payment', stepLaunch: 'Launch',
    quality: 'Quality check', summary: 'Summary', questionsN: 'Questions', requiredN: 'Required',
    minutes: 'Length', minutesValue: '{n} min', issues: 'To fix', noIssues: 'Nothing to fix',
    issuePrompt: 'Q{n} has no prompt', issueOptions: 'Q{n} has fewer than two options',
    issueLogic: 'Q{n} points at a question that no longer exists', issueLogicValue: 'Q{n} uses a value that is not an option',
    issueDuplicate: 'Q{n} and Q{m} ask the same thing',
    addQuestion: 'Add question', addOption: 'Add option', optionPlaceholder: 'Option {n}',
    duplicate: 'Duplicate', menu: 'More', required: 'Required', logic: 'Logic',
    logicNone: 'Always shown', logicAdd: 'Add condition', logicWhen: 'When', logicIs: 'is', logicPick: 'Pick a question',
    remove: 'Delete', moveUp: 'Move up', moveDown: 'Move down',
    promptPlaceholder: 'Question', type: 'Type', options: 'Options',
    save: 'Save', publish: 'Publish', publishing: 'Publishing…', saved: 'Saved', saveFailed: 'Could not save. Try again.',
    untitled: 'Untitled questionnaire', preview: 'Preview', quotas: 'Quotas', templates: 'Templates',
    qualityButton: 'Quality check', qualityTitle: 'Quality check',
    assist: 'AI', assistTitle: 'Let AI rework this question', assistPlaceholder: 'How should it change? e.g. neutral, no leading, shorter',
    assistRewrite: 'Rewrite prompt', assistOptions: 'Suggest options', assistApply: 'Use', assistUndo: 'Undo',
    assistThinking: 'Working…', assistFailed: 'The AI endpoint is not connected yet (backend needs /assist).', assistMock: 'Development fixture, not model output.',
    assistEmpty: 'Write an instruction first, or pick an action.',
    paging: 'Paging', pagingHint: 'Questions per page. Once paged, respondents see a progress bar.',
    pagingOff: 'One page', pagingOne: 'One per screen', pagingPerPage: 'Per page', pagingPages: '{n} pages, with a question map', quotasTitle: 'Quotas', quotasHint: 'Split the sample by answers and set how many completes each cell needs; the sum is the total.', 
    quotaCell: 'Cell', quotaTarget: 'Target', quotaAdd: 'Add cell', quotaRemove: 'Remove', quotaEmpty: 'No quota cells yet', 
    quotaEmptyHint: 'Add a single-choice, multiple-choice or dropdown question first.', quotaTotal: 'Total target', quotaEnforced: 'Enforcement is server-side: it can be configured here and takes effect once the API accepts it.', templatesTitle: 'Start from a whole questionnaire', templatesHint: 'Everything is editable once inserted.', templatesApply: 'Insert', templatesFull: 'This would pass the 30-question limit',
    archived: 'Archived', copyDraft: 'Copy as a new draft', archive: 'Archive', deleteDraft: 'Delete draft',
    deleteConfirm: 'Delete this draft? This cannot be undone.',
    locked: 'Published: the structure is locked. Copy it to a new draft to change it.',
    coverTitle: 'Cover note', coverPlaceholder: 'What respondents read before the first question',
    sensitiveTitle: 'This survey asks for sensitive information', sensitiveBody: 'Income, gender or health fields need a stated purpose and notice before publishing.',
    sensitiveConfirm: 'Confirm and publish', sensitiveCancel: 'Check again', previewTitle: 'What the respondent sees', close: 'Close',
    next: 'Next', prev: 'Back', finish: 'Done',
    other: 'Other', requiredMark: 'Required', optionalMark: 'Optional',
  },
};

const uid = () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const emptySettings = () => ({ allowOther: false, maxSelections: null, randomizeChoices: false, scaleLowLabel: '', scaleHighLabel: '' });
const defaultMatrixColumns = () => [...MATRIX_DEFAULT_COLUMNS];
const npsChoices = () => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const defaultChoices = (type) => {
  if (type === 'RATING') return ['1', '2', '3', '4', '5'];
  if (type === 'NPS') return npsChoices();
  if (type === 'MATRIX') return ['陈述 1', '陈述 2', '陈述 3'];
  if (type === 'DATE') return [];
  return ['选项 1', '选项 2'];
};
const newQuestion = (type = 'SINGLE_CHOICE', section = 'CORE') => ({
  uid: uid(), type, section, prompt: '', required: false,
  choices: CHOICE_TYPES.includes(type) ? defaultChoices(type) : [],
  settings: emptySettings(), logic: null,
});
const normalize = (question) => ({
  uid: question.id || uid(),
  id: question.id,
  type: question.type || 'SINGLE_CHOICE',
  section: question.section || 'CORE',
  prompt: question.prompt || '',
  required: Boolean(question.required),
  choices: Array.isArray(question.choices) ? question.choices : [],
  settings: { ...emptySettings(), ...(question.settings || {}) },
  logic: question.logic
    ? {
      action: question.logic.action || 'SHOW',
      joiner: question.logic.joiner || 'AND',
      conditions: question.logic.conditions?.length
        ? question.logic.conditions
        : (question.logic.sourcePosition
          ? [{ sourcePosition: question.logic.sourcePosition, value: question.logic.value }]
          : []),
    }
    : null,
});
const savedSettings = (settings) => SAVE_SETTINGS.reduce((out, key) => {
  if (settings && key in settings) out[key] = settings[key];
  return out;
}, {});

function PreviewAnswer({ question }) {
  if (question.type === 'LONG_TEXT') return <textarea className="sq-preview-input" rows={4} disabled placeholder="…" />;
  if (question.type === 'SHORT_TEXT' || question.type === 'NUMBER') return <input className="sq-preview-input" disabled placeholder="…" />;
  if (question.type === 'DATE') return <input className="sq-preview-input" type="date" disabled />;
  if (question.type === 'DROPDOWN') {
    return (
      <select className="sq-preview-input" disabled defaultValue="">
        <option value="">请选择</option>
        {question.choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}
      </select>
    );
  }
  if (question.type === 'NPS') {
    return (
      <div className="sq-preview-scale">
        {Array.from({ length: 11 }, (_, index) => <span key={index}>{index}</span>)}
      </div>
    );
  }
  if (question.type === 'MATRIX') {
    const columns = question.settings?.matrixColumns?.length ? question.settings.matrixColumns : MATRIX_DEFAULT_COLUMNS;
    return (
      <table className="sq-preview-matrix">
        <thead><tr><th />{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>
          {question.choices.map((row) => (
            <tr key={row}><th scope="row">{row}</th>{columns.map((column) => <td key={column}><input type="radio" disabled /></td>)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (question.type === 'RATING') {
    return (
      <div className="sq-preview-scale">
        {(question.choices.length ? question.choices : ['1', '2', '3', '4', '5']).map((choice) => <span key={choice}>{choice}</span>)}
      </div>
    );
  }
  if (question.type === 'RANKING') {
    return <ol className="sq-preview-rank">{question.choices.map((choice) => <li key={choice}>{choice}</li>)}</ol>;
  }
  return (
    <div className="sq-preview-options">
      {question.choices.map((choice) => (
        <label key={choice}>
          <input type={question.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'} disabled />
          <span>{choice}</span>
        </label>
      ))}
      {question.settings?.allowOther ? (
        <label><input type={question.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'} disabled /><span>其他</span></label>
      ) : null}
    </div>
  );
}

export default function BusinessQuestionnaireStudio() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const [project, setProject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [openLogic, setOpenLogic] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [saving, setSaving] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [quotasOpen, setQuotasOpen] = useState(false);
  const [quotas, setQuotas] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [checksOpen, setChecksOpen] = useState(false);
  const [assistFor, setAssistFor] = useState('');
  const [assistBusy, setAssistBusy] = useState('');
  const [assistError, setAssistError] = useState('');
  const [assistResults, setAssistResults] = useState([]);
  const [assistInstruction, setAssistInstruction] = useState('');
  const [assistMode, setAssistMode] = useState('rewrite');
  const [assistUndo, setAssistUndo] = useState({});
  const [cover, setCover] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [sensitiveOpen, setSensitiveOpen] = useState(false);
  const optionRefs = useRef({});

  const load = useCallback(async () => {
    try {
      const response = await getBusinessProject(projectId);
      const next = response.data.project;
      if (!next.questionnaire) {
        navigate(withLanguage('/business/workspace', language));
        return;
      }
      setProject(next);
      setCover(next.questionnaire?.coverDescription || '');
      setQuotas(Array.isArray(next.questionnaire?.quotas) ? next.questionnaire.quotas : []);
      setPageSize(next.questionnaire?.pageSize === undefined || next.questionnaire?.pageSize === null ? 1 : Number(next.questionnaire.pageSize));
      setQuestions((next.questionnaire?.questions || []).map(normalize));
    } catch {
      setError(text.saveFailed);
    }
  }, [projectId, text.saveFailed, navigate, language]);

  useEffect(() => { load(); }, [load]);

  const status = project?.questionnaire?.status || 'DRAFT';
  const readOnly = status !== 'DRAFT' && status !== 'ARCHIVED';
  const hasSensitive = questions.some((question) => question.section === 'PROFILE'
    && /(income|salary|gender|sex|ethnic|race|religion|health|disab)/i.test(question.prompt));

  const typeLabel = (type) => TYPE_LABEL[type]?.[language] || TYPE_LABEL[type]?.en || type;
  const sectionLabel = (section) => {
    const row = SECTIONS.find(([value]) => value === section);
    return row ? (language === 'zh-CN' ? row[1] : row[2]) : section;
  };

  const update = (uidValue, changes) => {
    setQuestions((current) => current.map((question) => (question.uid === uidValue ? { ...question, ...changes } : question)));
    setMessage('');
  };
  const updateSettings = (uidValue, changes) => {
    const target = questions.find((question) => question.uid === uidValue);
    if (target) update(uidValue, { settings: { ...target.settings, ...changes } });
  };

  const runAssist = async (question, mode) => {
    setAssistMode(mode);
    setAssistBusy(mode);
    setAssistError('');
    setAssistResults([]);
    try {
      const { data, mocked } = await assistQuestion({
        mode,
        prompt: question.prompt,
        choices: question.choices,
        brief: `${project?.researchGoal || ''} ${project?.audienceDescription || ''}`.trim(),
      });
      setAssistResults((data?.candidates || []).map((text) => ({ text, mocked })));
      if (!data?.candidates?.length) setAssistError(text.assistEmpty);
    } catch {
      setAssistError(text.assistFailed);
    } finally {
      setAssistBusy('');
    }
  };

  const applyAssist = (question, value, mode) => {
    setAssistUndo((current) => ({ ...current, [question.uid]: { prompt: question.prompt, choices: [...question.choices] } }));
    if (mode === 'options') update(question.uid, { choices: [...question.choices, value] });
    else update(question.uid, { prompt: value });
    setAssistResults([]);
  };

  const undoAssist = (question) => {
    const snapshot = assistUndo[question.uid];
    if (!snapshot) return;
    update(question.uid, { prompt: snapshot.prompt, choices: snapshot.choices });
    setAssistUndo((current) => {
      const next = { ...current };
      delete next[question.uid];
      return next;
    });
  };

  const applyTemplate = (template) => {
    if (questions.length + template.questions.length > MAX_QUESTIONS) return;
    const added = template.questions.map((question) => ({
      ...newQuestion(question.type, question.section),
      prompt: question.prompt,
      required: Boolean(question.required),
      choices: [...(question.choices || [])],
      settings: { ...emptySettings(), ...(question.settings || {}) },
    }));
    setQuestions((current) => [...current, ...added]);
    setTemplatesOpen(false);
    setMessage('');
  };

  const addQuestion = (section = 'CORE') => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions((current) => [...current, newQuestion('SINGLE_CHOICE', section)]);
  };

  const duplicateQuestion = (uidValue) => {
    const index = questions.findIndex((question) => question.uid === uidValue);
    if (index < 0 || questions.length >= MAX_QUESTIONS) return;
    const source = questions[index];
    const copyQuestion = { ...source, uid: uid(), id: undefined, logic: null, choices: [...source.choices] };
    setQuestions((current) => {
      const next = [...current];
      next.splice(index + 1, 0, copyQuestion);
      return next.map((question, position) => (question.logic && question.logic.sourcePosition > index && position > index
        ? { ...question, logic: { ...question.logic, sourcePosition: question.logic.sourcePosition + 1 } }
        : question));
    });
    setOpenMenu(null);
  };

  const removeQuestion = (uidValue) => {
    const index = questions.findIndex((question) => question.uid === uidValue);
    if (index < 0) return;
    setQuestions((current) => current
      .filter((question) => question.uid !== uidValue)
      .map((question) => (question.logic && question.logic.sourcePosition > index
        ? { ...question, logic: { ...question.logic, sourcePosition: question.logic.sourcePosition - 1 } }
        : question)));
    setOpenMenu(null);
  };

  const moveQuestion = (fromUid, toUidValue) => {
    if (fromUid === toUidValue) return;
    setQuestions((current) => {
      const from = current.findIndex((question) => question.uid === fromUid);
      const to = current.findIndex((question) => question.uid === toUidValue);
      if (from < 0 || to < 0) return current;
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDragging(null);
  };

  const changeType = (question, type) => {
    update(question.uid, {
      type,
      choices: CHOICE_TYPES.includes(type) ? (question.choices.length ? question.choices : defaultChoices(type)) : [],
      settings: {
        ...question.settings,
        allowOther: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(type) ? question.settings.allowOther : false,
        maxSelections: type === 'MULTIPLE_CHOICE' ? question.settings.maxSelections : null,
      },
      logic: LOGIC_TYPES.includes(type) ? question.logic : null,
    });
  };

  /* Enter in an option adds the next row and moves focus there; Backspace on an
     empty row takes it away and hands focus back. No button to reach for. */
  const onOptionKeyDown = (event, question, choiceIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const next = [...question.choices];
      next.splice(choiceIndex + 1, 0, '');
      update(question.uid, { choices: next });
      window.requestAnimationFrame(() => {
        const input = optionRefs.current[`${question.uid}-${choiceIndex + 1}`];
        input?.focus();
        input?.select();
      });
    }
    if (event.key === 'Backspace' && !question.choices[choiceIndex] && question.choices.length > 2) {
      event.preventDefault();
      const next = question.choices.filter((_, position) => position !== choiceIndex);
      update(question.uid, { choices: next });
      window.requestAnimationFrame(() => optionRefs.current[`${question.uid}-${Math.max(0, choiceIndex - 1)}`]?.focus());
    }
  };

  const checks = useMemo(() => {
    const issues = [];
    questions.forEach((question, index) => {
      const n = index + 1;
      if (!question.prompt.trim()) issues.push(text.issuePrompt.replace('{n}', n));
      if (CHOICE_TYPES.includes(question.type) && question.type !== 'RATING' && question.choices.filter((choice) => choice.trim()).length < 2) {
        issues.push(text.issueOptions.replace('{n}', n));
      }
      if (question.logic?.sourcePosition) {
        const source = questions[question.logic.sourcePosition - 1];
        if (!source) issues.push(text.issueLogic.replace('{n}', n));
        else if (!source.choices.includes(question.logic.value)) issues.push(text.issueLogicValue.replace('{n}', n));
      }
      const earlier = questions.slice(0, index).findIndex((item) => item.prompt && item.prompt === question.prompt);
      if (question.prompt && earlier >= 0) issues.push(text.issueDuplicate.replace('{n}', n).replace('{m}', earlier + 1));
    });
    return issues;
  }, [questions, text]);

  const minutes = Math.max(1, Math.round(questions.length * 0.75));

  const save = async ({ publish = false, acknowledged = false } = {}) => {
    if (saving) return;
    if (publish && hasSensitive && !acknowledged) {
      setSensitiveOpen(true);
      return;
    }
    setSaving(publish ? 'publish' : 'save');
    setError('');
    setMessage('');
    try {
      await saveBusinessQuestionnaire(projectId, {
        title: project?.questionnaire?.title || project?.title || text.untitled,
        coverDescription: cover || '',
        collectionMode: project?.questionnaire?.collectionMode || 'AUDIENCE_SOURCING',
        isCollecting: Boolean(project?.questionnaire?.isCollecting),
        quotas,
        pageSize,
        questions: questions.map((question, index) => ({
          type: question.type,
          section: question.section,
          prompt: question.prompt || `Question ${index + 1}`,
          required: question.required,
          choices: question.choices,
          settings: savedSettings(question.settings),
          logic: question.logic,
        })),
      });
      if (publish) await publishBusinessQuestionnaire(projectId, { sensitiveDataAcknowledged: acknowledged });
      await load();
      setMessage(text.saved);
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
    } finally {
      setSaving('');
    }
  };

  const archive = async () => {
    setMoreOpen(false);
    setSaving('archive');
    try {
      await archiveBusinessQuestionnaire(projectId);
      await load();
      setMessage(text.archived);
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
    } finally { setSaving(''); }
  };

  const duplicate = async () => {
    setMoreOpen(false);
    setSaving('duplicate');
    try {
      const response = await duplicateBusinessQuestionnaire(projectId);
      navigate(withLanguage(`/business/projects/${response.data.project.id}`, language));
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
      setSaving('');
    }
  };

  const removeDraft = async () => {
    setMoreOpen(false);
    if (!window.confirm(text.deleteConfirm)) return;
    setSaving('delete');
    try {
      await deleteBusinessProject(projectId);
      navigate(withLanguage('/business/workspace?view=questionnaires', language));
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
      setSaving('');
    }
  };

  /* Quota cells are defined against the questions in this questionnaire, by
     position, the same way display rules point at a question. They cannot be
     enforced in the browser — that needs every response — but the definition
     and its total are edited here. */
  const quotaQuestions = questions
    .map((question, position) => ({ question, position: position + 1 }))
    .filter(({ question }) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'DROPDOWN'].includes(question.type) && question.choices.length > 0);

  const addQuota = () => {
    const first = quotaQuestions[0];
    if (!first) return;
    setQuotas((current) => [...current, { target: 100, conditions: [{ position: first.position, value: first.question.choices[0] }] }]);
  };

  const quotaTotal = quotas.reduce((sum, quota) => sum + (Number(quota.target) || 0), 0);

  const grouped = SECTIONS.map(([value]) => ({
    value,
    items: questions.filter((question) => question.section === value),
  })).filter((group) => group.items.length);

  const previewList = previewOpen ? questions : [];

  return (
    <main className={`sq-page${readOnly ? ' is-locked' : ''}`}>
      <header className="sq-top">
        <button type="button" className="sq-icon" onClick={() => navigate(withLanguage('/business/workspace?view=questionnaires', language))} aria-label={text.back}>
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
        <div className="sq-title">
          <strong>{project?.questionnaire?.title || project?.title || text.untitled}</strong>
          <span className={`sq-status${project?.questionnaire?.status === 'PUBLISHED' ? ' is-live' : ''}`}>
            {project?.questionnaire?.status === 'PUBLISHED' ? text.published : text.draft}
          </span>
        </div>
        <div className="sq-top-actions">
          {message ? <span className="sq-saved"><Check size={14} aria-hidden="true" /> {message}</span> : null}
          <button type="button" className="sq-btn" onClick={() => setChecksOpen(true)}>
            <AlertCircle size={15} aria-hidden="true" /> {text.qualityButton}
            {checks.length ? <span className="sq-badge is-alert">{checks.length}</span> : null}
          </button>
          <button type="button" className="sq-btn" onClick={() => setQuotasOpen(true)}>
            <Gauge size={15} aria-hidden="true" /> {text.quotas}
            {quotas.length ? <span className="sq-badge">{quotaTotal}</span> : null}
          </button>
          <button type="button" className="sq-btn" onClick={() => setTemplatesOpen(true)}>
            <LayoutTemplate size={15} aria-hidden="true" /> {text.templates}
          </button>
          <button type="button" className="sq-btn" onClick={() => { setPreviewOpen(true); setPreviewStep(0); }}>
            <Eye size={15} aria-hidden="true" /> {text.preview}
          </button>
          <button type="button" className="sq-btn" onClick={() => save()} disabled={Boolean(saving)}>
            {saving === 'save' ? <LoaderCircle size={15} className="sq-spin" /> : null} {text.save}
          </button>
          <button type="button" className="sq-btn is-primary" onClick={() => save({ publish: true })} disabled={Boolean(saving) || !questions.length}>
            {saving === 'publish' ? <LoaderCircle size={15} className="sq-spin" /> : <Send size={15} aria-hidden="true" />}
            {saving === 'publish' ? text.publishing : text.publish}
          </button>
          <div className="sq-menu-wrap">
            <button type="button" className="sq-icon" aria-label={text.menu} onClick={() => setMoreOpen((open) => !open)}>
              <MoreHorizontal size={17} aria-hidden="true" />
            </button>
            {moreOpen ? (
              <div className="sq-menu">
                <button type="button" onClick={duplicate}><Copy size={14} aria-hidden="true" /> {text.copyDraft}</button>
                {['PUBLISHED', 'PENDING_REVIEW', 'APPROVED'].includes(status) ? (
                  <button type="button" onClick={archive}><Archive size={14} aria-hidden="true" /> {text.archive}</button>
                ) : null}
                {status === 'DRAFT' ? (
                  <button type="button" onClick={removeDraft}><Trash2 size={14} aria-hidden="true" /> {text.deleteDraft}</button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {error ? <p className="sq-error" role="alert">{error}</p> : null}

      <div className="sq-shell">
        {/* The rail is the process, in the same shape as the old section list:
            icon and label, current step filled. */}
        <nav className="sq-nav" aria-label={text.flow}>
          <a href={withLanguage(`/business/projects/${projectId}/audience`, language)}>
            <Users size={16} aria-hidden="true" /> {text.stepAudience}
          </a>
          <span className="is-active"><ListChecks size={16} aria-hidden="true" /> {text.stepQuestions}</span>
          <span className="is-todo"><Receipt size={16} aria-hidden="true" /> {text.stepQuote}</span>
          <span className="is-todo"><Rocket size={16} aria-hidden="true" /> {text.stepLaunch}</span>
        </nav>

        <section className="sq-canvas">
          {readOnly ? (
            <div className="sq-banner">
              <AlertCircle size={15} aria-hidden="true" />
              <span>{text.locked}</span>
              <button type="button" className="sq-btn" onClick={duplicate}>{text.copyDraft}</button>
            </div>
          ) : null}

          <label className="sq-cover">
            <span>{text.coverTitle}</span>
            <textarea
              rows={2}
              maxLength={600}
              value={cover}
              disabled={readOnly}
              placeholder={text.coverPlaceholder}
              onChange={(event) => { setCover(event.target.value); setMessage(''); }}
            />
          </label>

          {questions.length === 0 ? (
            <div className="sq-empty">
              <p>{text.addQuestion}</p>
              <button type="button" className="sq-btn is-primary" onClick={() => addQuestion('CORE')}>
                <Plus size={15} aria-hidden="true" /> {text.addQuestion}
              </button>
            </div>
          ) : null}

          {grouped.map((group, groupIndex) => (
            <section className="sq-group" key={group.value}>
              <header className="sq-group-head">
                <span className="sq-group-title">Section {groupIndex + 1}: {sectionLabel(group.value)}</span>
                <Star size={14} aria-hidden="true" />
                <button type="button" className="sq-icon" aria-label={text.addQuestion} onClick={() => addQuestion(group.value)}>
                  <Plus size={15} aria-hidden="true" />
                </button>
              </header>

              <div className="sq-page-label"><GripVertical size={13} aria-hidden="true" /> Page 1</div>

              <div className="sq-cards">
                {group.items.map((question) => {
                  const index = questions.findIndex((item) => item.uid === question.uid);
                  const logicSource = question.logic?.sourcePosition ? questions[question.logic.sourcePosition - 1] : null;
                  const isMatrix = question.type === 'MATRIX';
                  const isChoice = (CHOICE_TYPES.includes(question.type) && question.type !== 'NPS') || isMatrix;
                  return (
                    <article
                      key={question.uid}
                      className={`sq-card${dragging === question.uid ? ' is-dragging' : ''}`}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => { if (dragging) moveQuestion(dragging, question.uid); }}
                    >
                      <header className="sq-card-head">
                        <button
                          type="button"
                          className="sq-grip"
                          aria-label="drag"
                          draggable
                          onDragStart={() => setDragging(question.uid)}
                          onDragEnd={() => setDragging(null)}
                        >
                          <GripVertical size={15} aria-hidden="true" />
                        </button>
                        <span className="sq-qnum">Q{index + 1}</span>
                        <input
                          className="sq-prompt"
                          value={question.prompt}
                          placeholder={text.promptPlaceholder}
                          onChange={(event) => update(question.uid, { prompt: event.target.value })}
                        />
                        <label className="sq-type">
                          <select value={question.type} onChange={(event) => changeType(question, event.target.value)} aria-label={text.type}>
                            {TYPES.map(([type]) => <option key={type} value={type}>{typeLabel(type)}</option>)}
                          </select>
                          <ChevronDown size={13} aria-hidden="true" />
                        </label>
                        <label className="sq-required" title={text.required}>
                          <input type="checkbox" checked={question.required} onChange={(event) => update(question.uid, { required: event.target.checked })} />
                          <span>{text.required}</span>
                        </label>
                        <button
                          type="button"
                          className={`sq-tool${assistFor === question.uid ? ' is-on' : ''}`}
                          title={text.assistTitle}
                          onClick={() => {
                            setAssistFor((current) => (current === question.uid ? '' : question.uid));
                            setAssistResults([]);
                            setAssistError('');
                            setAssistInstruction('');
                          }}
                        >
                          <Sparkles size={15} aria-hidden="true" />
                        </button>
                        <button type="button" className="sq-tool" title={text.duplicate} onClick={() => duplicateQuestion(question.uid)}>
                          <Copy size={15} aria-hidden="true" />
                        </button>
                        <div className="sq-menu-wrap">
                          <button
                            type="button"
                            className="sq-tool"
                            title={text.menu}
                            aria-expanded={openMenu === question.uid}
                            onClick={() => setOpenMenu((current) => (current === question.uid ? null : question.uid))}
                          >
                            <MoreHorizontal size={16} aria-hidden="true" />
                          </button>
                          {openMenu === question.uid ? (
                            <div className="sq-menu">
                              <button type="button" onClick={() => { removeQuestion(question.uid); }}>
                                <Trash2 size={14} aria-hidden="true" /> {text.remove}
                              </button>
                              <button type="button" onClick={() => duplicateQuestion(question.uid)}>
                                <Copy size={14} aria-hidden="true" /> {text.duplicate}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const target = questions[index - 1];
                                  if (target) moveQuestion(question.uid, target.uid);
                                  setOpenMenu(null);
                                }}
                                disabled={index === 0}
                              >
                                <ArrowLeft size={14} aria-hidden="true" className="sq-up" /> {text.moveUp}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </header>

                      {assistFor === question.uid ? (
                        <div className="sq-assist">
                          <div className="sq-assist-head">
                            <Sparkles size={13} aria-hidden="true" />
                            <span>{text.assistTitle}</span>
                            {assistUndo[question.uid] ? (
                              <button type="button" className="sq-link" onClick={() => undoAssist(question)}>
                                <Undo2 size={12} aria-hidden="true" /> {text.assistUndo}
                              </button>
                            ) : null}
                          </div>
                          <input
                            className="sq-assist-input"
                            value={assistInstruction}
                            placeholder={text.assistPlaceholder}
                            onChange={(event) => setAssistInstruction(event.target.value)}
                          />
                          <div className="sq-assist-actions">
                            <button type="button" className="sq-btn" disabled={Boolean(assistBusy)} onClick={() => runAssist(question, 'rewrite')}>
                              {assistBusy === 'rewrite' ? <LoaderCircle size={14} className="sq-spin" /> : null} {text.assistRewrite}
                            </button>
                            <button type="button" className="sq-btn" disabled={Boolean(assistBusy) || !['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'DROPDOWN'].includes(question.type)} onClick={() => runAssist(question, 'options')}>
                              {assistBusy === 'options' ? <LoaderCircle size={14} className="sq-spin" /> : null} {text.assistOptions}
                            </button>
                          </div>
                          {assistError ? <p className="sq-assist-error">{assistError}</p> : null}
                          {assistResults.length ? (
                            <ul className="sq-assist-list">
                              {assistResults.map((candidate, candidateIndex) => (
                                <li key={`${question.uid}-ai-${candidateIndex}`}>
                                  <span>{candidate.text}</span>
                                  <button type="button" className="sq-btn" onClick={() => applyAssist(question, candidate.text, assistMode)}>
                                    {text.assistApply}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {assistResults.some((candidate) => candidate.mocked) ? <p className="sq-assist-note">{text.assistMock}</p> : null}
                        </div>
                      ) : null}

                      {isChoice ? (
                        <div className="sq-options">
                          {isMatrix ? <p className="sq-label">行（陈述）</p> : null}
                          {question.choices.map((choice, choiceIndex) => (
                            <div className="sq-option" key={`${question.uid}-${choiceIndex}`}>
                              <span className="sq-bullet" aria-hidden="true" />
                              <input
                                ref={(node) => { optionRefs.current[`${question.uid}-${choiceIndex}`] = node; }}
                                value={choice}
                                placeholder={text.optionPlaceholder.replace('{n}', choiceIndex + 1)}
                                onChange={(event) => {
                                  const next = [...question.choices];
                                  next[choiceIndex] = event.target.value;
                                  update(question.uid, { choices: next });
                                }}
                                onKeyDown={(event) => onOptionKeyDown(event, question, choiceIndex)}
                              />
                              <button
                                type="button"
                                className="sq-tool"
                                onClick={() => update(question.uid, { choices: question.choices.filter((_, position) => position !== choiceIndex) })}
                                disabled={question.choices.length <= 2}
                                title={text.remove}
                              >
                                <X size={14} aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="sq-add-option"
                            onClick={() => {
                              const next = [...question.choices, ''];
                              update(question.uid, { choices: next });
                              window.requestAnimationFrame(() => optionRefs.current[`${question.uid}-${next.length - 1}`]?.focus());
                            }}
                          >
                            <Plus size={14} aria-hidden="true" /> {text.addOption}
                          </button>
                        </div>
                      ) : null}

                      {isMatrix ? (
                        <div className="sq-matrix">
                          <p className="sq-label">列（评价刻度）</p>
                          {(question.settings.matrixColumns || MATRIX_DEFAULT_COLUMNS).map((column, columnIndex) => (
                            <div className="sq-option" key={`${question.uid}-col-${columnIndex}`}>
                              <span className="sq-option-num">{columnIndex + 1}</span>
                              <input
                                value={column}
                                onChange={(event) => {
                                  const next = [...(question.settings.matrixColumns || MATRIX_DEFAULT_COLUMNS)];
                                  next[columnIndex] = event.target.value;
                                  updateSettings(question.uid, { matrixColumns: next });
                                }}
                              />
                              <button
                                type="button"
                                className="sq-tool"
                                title={text.remove}
                                disabled={(question.settings.matrixColumns || MATRIX_DEFAULT_COLUMNS).length <= 2}
                                onClick={() => updateSettings(question.uid, {
                                  matrixColumns: (question.settings.matrixColumns || MATRIX_DEFAULT_COLUMNS).filter((_, position) => position !== columnIndex),
                                })}
                              >
                                <X size={14} aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="sq-add-option"
                            onClick={() => updateSettings(question.uid, {
                              matrixColumns: [...(question.settings.matrixColumns || MATRIX_DEFAULT_COLUMNS), `刻度 ${(question.settings.matrixColumns || MATRIX_DEFAULT_COLUMNS).length + 1}`],
                            })}
                          >
                            <Plus size={14} aria-hidden="true" /> 添加刻度
                          </button>
                        </div>
                      ) : null}

                      {['RATING', 'NPS'].includes(question.type) ? (
                        <div className="sq-scale">
                          <input
                            placeholder={language === 'zh-CN' ? '低分说明' : 'Low end'}
                            value={question.settings.scaleLowLabel || ''}
                            onChange={(event) => updateSettings(question.uid, { scaleLowLabel: event.target.value })}
                          />
                          <input
                            placeholder={language === 'zh-CN' ? '高分说明' : 'High end'}
                            value={question.settings.scaleHighLabel || ''}
                            onChange={(event) => updateSettings(question.uid, { scaleHighLabel: event.target.value })}
                          />
                        </div>
                      ) : null}

                      {question.type === 'NPS' ? (
                        <p className="sq-note">NPS 固定 0–10 分，按推荐者（9–10）/ 被动者（7–8）/ 贬损者（0–6）统计。</p>
                      ) : null}

                      <div className={`sq-logic${logicSource ? ' is-set' : ''}`}>
                        <Settings2 size={13} aria-hidden="true" />
                        {question.logic ? (
                          <>
                            <span className="sq-logic-text">
                              {text.logicWhen}
                              {(question.logic.conditions || []).map((condition, conditionIndex) => {
                                const source = questions[condition.sourcePosition - 1];
                                return (
                                  <span className="sq-cond" key={`${question.uid}-c-${conditionIndex}`}>
                                    {conditionIndex > 0 ? (
                                      <select
                                        value={question.logic.joiner || 'AND'}
                                        onChange={(event) => update(question.uid, { logic: { ...question.logic, joiner: event.target.value } })}
                                      >
                                        <option value="AND">且</option>
                                        <option value="OR">或</option>
                                      </select>
                                    ) : null}
                                    <select
                                      value={condition.sourcePosition}
                                      onChange={(event) => {
                                        const position = Number(event.target.value);
                                        const conditions = [...question.logic.conditions];
                                        conditions[conditionIndex] = { sourcePosition: position, value: questions[position - 1]?.choices?.[0] || '' };
                                        update(question.uid, { logic: { ...question.logic, conditions } });
                                      }}
                                    >
                                      {questions.slice(0, index).filter((item) => LOGIC_TYPES.includes(item.type)).map((item) => (
                                        <option key={item.uid} value={questions.indexOf(item) + 1}>Q{questions.indexOf(item) + 1}</option>
                                      ))}
                                    </select>
                                    {text.logicIs}
                                    <select
                                      value={condition.value}
                                      onChange={(event) => {
                                        const conditions = [...question.logic.conditions];
                                        conditions[conditionIndex] = { ...conditions[conditionIndex], value: event.target.value };
                                        update(question.uid, { logic: { ...question.logic, conditions } });
                                      }}
                                    >
                                      {(source?.choices || []).map((choice) => <option key={choice} value={choice}>{choice}</option>)}
                                    </select>
                                    {(question.logic.conditions || []).length > 1 ? (
                                      <button
                                        type="button"
                                        className="sq-tool"
                                        title={text.remove}
                                        onClick={() => {
                                          const conditions = question.logic.conditions.filter((_, position) => position !== conditionIndex);
                                          update(question.uid, { logic: conditions.length ? { ...question.logic, conditions } : null });
                                        }}
                                      >
                                        <X size={13} aria-hidden="true" />
                                      </button>
                                    ) : null}
                                  </span>
                                );
                              })}
                              →
                              <select
                                value={question.logic.action || 'SHOW'}
                                onChange={(event) => update(question.uid, { logic: { ...question.logic, action: event.target.value } })}
                              >
                                <option value="SHOW">显示本题</option>
                                <option value="SKIP">跳过本题</option>
                                <option value="TERMINATE">终止问卷</option>
                              </select>
                            </span>
                            <button
                              type="button"
                              className="sq-link"
                              onClick={() => update(question.uid, {
                                logic: {
                                  ...question.logic,
                                  conditions: [...question.logic.conditions, { sourcePosition: question.logic.conditions[0].sourcePosition, value: questions[question.logic.conditions[0].sourcePosition - 1]?.choices?.[0] || '' }],
                                },
                              })}
                            >
                              + 条件
                            </button>
                            <button type="button" className="sq-link" onClick={() => update(question.uid, { logic: null })}>{text.remove}</button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="sq-link"
                            disabled={index === 0}
                            onClick={() => {
                              const source = questions.slice(0, index).filter((item) => LOGIC_TYPES.includes(item.type)).pop();
                              if (!source) return;
                              const position = questions.indexOf(source) + 1;
                              update(question.uid, { logic: { action: 'SHOW', joiner: 'AND', conditions: [{ sourcePosition: position, value: source.choices?.[0] || '' }] } });
                            }}
                          >
                            {text.logicAdd}
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <button type="button" className="sq-add-question" onClick={() => addQuestion(group.value)}>
                <Plus size={15} aria-hidden="true" /> {text.addQuestion}
              </button>
            </section>
          ))}
        </section>

        <aside className="sq-side" id="quality">
          <section className="sq-side-block">
            <h2>{text.summary}</h2>
            <dl>
              <div><dt>{text.questionsN}</dt><dd>{questions.length}/{MAX_QUESTIONS}</dd></div>
              <div><dt>{text.requiredN}</dt><dd>{questions.filter((question) => question.required).length}</dd></div>
              <div><dt>{text.minutes}</dt><dd>{text.minutesValue.replace('{n}', minutes)}</dd></div>
            </dl>
          </section>
          <section className="sq-side-block">
            <h2>{text.paging}</h2>
            <p className="sq-side-hint">{text.pagingHint}</p>
            <div className="sq-page-size">
              {[1, 5, 10, 0].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={pageSize === size ? 'is-on' : ''}
                  onClick={() => setPageSize(size)}
                >
                  {size === 0 ? text.pagingOff : size === 1 ? text.pagingOne : size}
                </button>
              ))}
            </div>
            <p className="sq-side-note">
              {pageSize === 0
                ? text.pagingOff
                : text.pagingPages.replace('{n}', Math.max(1, Math.ceil(questions.length / pageSize)))}
            </p>
          </section>
        </aside>
      </div>

      {checksOpen ? (
        <div className="sq-modal" role="dialog" aria-modal="true" aria-label={text.qualityTitle}>
          <button type="button" className="sq-modal-scrim" aria-label={text.close} onClick={() => setChecksOpen(false)} />
          <section className="sq-modal-card is-narrow">
            <header>
              <strong>{text.qualityTitle}</strong>
              <span className="sq-modal-count">{checks.length}</span>
              <button type="button" className="sq-icon" onClick={() => setChecksOpen(false)} aria-label={text.close}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            <div className="sq-modal-body">
              {checks.length === 0 ? (
                <p className="sq-ok"><CheckCircle2 size={15} aria-hidden="true" /> {text.noIssues}</p>
              ) : (
                <ul className="sq-issues">
                  {checks.map((issue) => <li key={issue}><AlertCircle size={14} aria-hidden="true" /> {issue}</li>)}
                </ul>
              )}
            </div>
          </section>
        </div>
      ) : null}

      {quotasOpen ? (
        <div className="sq-modal" role="dialog" aria-modal="true" aria-label={text.quotasTitle}>
          <button type="button" className="sq-modal-scrim" aria-label={text.close} onClick={() => setQuotasOpen(false)} />
          <section className="sq-modal-card">
            <header>
              <strong>{text.quotasTitle}</strong>
              <span className="sq-modal-count">{text.quotaTotal} {quotaTotal}</span>
              <button type="button" className="sq-icon" onClick={() => setQuotasOpen(false)} aria-label={text.close}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            <div className="sq-modal-body">
              <p className="sq-preview-empty">{text.quotasHint}</p>
              {quotas.length === 0 ? (
                <div className="sq-quota-empty">
                  <strong>{text.quotaEmpty}</strong>
                  <span>{quotaQuestions.length ? text.quotaEmptyHint : text.quotaEmptyHint}</span>
                </div>
              ) : (
                <div className="sq-quota-list">
                  {quotas.map((quota, quotaIndex) => (
                    <div className="sq-quota" key={`quota-${quotaIndex}`}>
                      <span className="sq-quota-cell">{text.quotaCell} {quotaIndex + 1}</span>
                      <div className="sq-quota-conditions">
                        {quota.conditions.map((condition, conditionIndex) => {
                          const source = questions[condition.position - 1];
                          return (
                            <span className="sq-cond" key={`qc-${quotaIndex}-${conditionIndex}`}>
                              <select
                                value={condition.position}
                                onChange={(event) => {
                                  const position = Number(event.target.value);
                                  setQuotas((current) => current.map((row, index) => (index === quotaIndex
                                    ? { ...row, conditions: row.conditions.map((item, itemIndex) => (itemIndex === conditionIndex ? { position, value: questions[position - 1]?.choices?.[0] || '' } : item)) }
                                    : row)));
                                }}
                              >
                                {quotaQuestions.map(({ question, position }) => (
                                  <option key={question.uid} value={position}>Q{position} · {(question.prompt || '—').slice(0, 18)}</option>
                                ))}
                              </select>
                              <select
                                value={condition.value}
                                onChange={(event) => setQuotas((current) => current.map((row, index) => (index === quotaIndex
                                  ? { ...row, conditions: row.conditions.map((item, itemIndex) => (itemIndex === conditionIndex ? { ...item, value: event.target.value } : item)) }
                                  : row)))}
                              >
                                {(source?.choices || []).map((choice) => <option key={choice} value={choice}>{choice}</option>)}
                              </select>
                            </span>
                          );
                        })}
                      </div>
                      <label className="sq-quota-target">
                        {text.quotaTarget}
                        <input
                          type="number"
                          min="1"
                          value={quota.target}
                          onChange={(event) => setQuotas((current) => current.map((row, index) => (index === quotaIndex ? { ...row, target: Number(event.target.value) } : row)))}
                        />
                      </label>
                      <button type="button" className="sq-tool" aria-label={text.quotaRemove} onClick={() => setQuotas((current) => current.filter((_, index) => index !== quotaIndex))}>
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="sq-quota-actions">
                <button type="button" className="sq-btn" onClick={addQuota} disabled={!quotaQuestions.length}>
                  <Plus size={14} aria-hidden="true" /> {text.quotaAdd}
                </button>
                <span className="sq-preview-empty">{text.quotaEnforced}</span>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {templatesOpen ? (
        <div className="sq-modal" role="dialog" aria-modal="true" aria-label={text.templatesTitle}>
          <button type="button" className="sq-modal-scrim" aria-label={text.close} onClick={() => setTemplatesOpen(false)} />
          <section className="sq-modal-card is-wide">
            <header>
              <strong>{text.templatesTitle}</strong>
              <button type="button" className="sq-icon" onClick={() => setTemplatesOpen(false)} aria-label={text.close}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            <div className="sq-modal-body">
              <p className="sq-preview-empty">{text.templatesHint}</p>
              <div className="sq-template-grid">
                {TEMPLATES.map((template) => {
                  const tooMany = questions.length + template.questions.length > MAX_QUESTIONS;
                  return (
                    <article key={template.id} className="sq-template">
                      <strong>{template.name[language] || template.name.en}</strong>
                      <span>{template.detail[language] || template.detail.en}</span>
                      <ul className="sq-template-preview">
                        {template.questions.slice(0, 3).map((question) => (
                          <li key={question.prompt}>{question.prompt}</li>
                        ))}
                        {template.questions.length > 3 ? <li className="is-more">+{template.questions.length - 3}</li> : null}
                      </ul>
                      <button type="button" className="sq-btn" disabled={tooMany} onClick={() => applyTemplate(template)}>
                        {tooMany ? text.templatesFull : text.templatesApply}
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {sensitiveOpen ? (
        <div className="sq-modal" role="dialog" aria-modal="true" aria-label={text.sensitiveTitle}>
          <button type="button" className="sq-modal-scrim" aria-label={text.close} onClick={() => setSensitiveOpen(false)} />
          <section className="sq-modal-card is-narrow">
            <header><strong>{text.sensitiveTitle}</strong></header>
            <div className="sq-modal-body"><p className="sq-preview-empty">{text.sensitiveBody}</p></div>
            <footer>
              <button type="button" className="sq-btn" onClick={() => setSensitiveOpen(false)}>{text.sensitiveCancel}</button>
              <button
                type="button"
                className="sq-btn is-primary"
                onClick={() => { setSensitiveOpen(false); save({ publish: true, acknowledged: true }); }}
              >
                {text.sensitiveConfirm}
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {previewOpen ? (
        <div className="sq-modal" role="dialog" aria-modal="true" aria-label={text.previewTitle}>
          <button type="button" className="sq-modal-scrim" aria-label={text.close} onClick={() => setPreviewOpen(false)} />
          <section className="sq-modal-card">
            <header>
              <strong>{text.previewTitle}</strong>
              <span className="sq-modal-count">{previewStep + 1} / {Math.max(1, previewList.length)}</span>
              <button type="button" className="sq-icon" onClick={() => setPreviewOpen(false)} aria-label={text.close}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            <div className="sq-modal-body">
              {previewList[previewStep] ? (
                <div className="sq-preview-q">
                  <p>{previewList[previewStep].prompt || '—'}{previewList[previewStep].required ? <em>*</em> : null}</p>
                  <PreviewAnswer question={previewList[previewStep]} />
                </div>
              ) : <p className="sq-preview-empty">—</p>}
            </div>
            <footer>
              <button type="button" className="sq-btn" disabled={previewStep === 0} onClick={() => setPreviewStep((step) => Math.max(0, step - 1))}>
                {text.prev}
              </button>
              <button
                type="button"
                className="sq-btn is-primary"
                onClick={() => {
                  if (previewStep >= previewList.length - 1) setPreviewOpen(false);
                  else setPreviewStep((step) => step + 1);
                }}
              >
                {previewStep >= previewList.length - 1 ? text.finish : text.next}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </main>
  );
}
