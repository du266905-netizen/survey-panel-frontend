import { getAdminBusinessProjects } from '../../api/realApi';

/* 十个模块的列表配置。
 *
 * 每一页只描述“有哪些列、能筛什么、能做什么”，布局和交互由 AdminList 统一给。
 * 数据源先留空：接后端时只替换 AdminList 里的 rows，不动页面配置。
 */

export const MODULES = {
  customers: {
    title: '客户',
    caption: '账号、组织、角色、余额与状态',
    tabs: ['全部', '活跃', '待跟进', '已停用'],
    primary: '新建客户',
    columns: [
      { key: 'name', label: '客户', width: '22%' },
      { key: 'org', label: '组织' },
      { key: 'role', label: '角色' },
      { key: 'balance', label: '余额', align: 'right' },
      { key: 'status', label: '状态', type: 'badge' },
      { key: 'updatedAt', label: '最近联系', align: 'right' },
    ],
    filters: ['角色', '状态', '余额区间'],
  },
  projects: {
    title: '项目与订单',
    caption: '列表、筛选、详情、状态流转与备注',
    /* 目前唯一接上真实数据的模块：/api/admin/business-projects */
    load: async () => {
      const { data } = await getAdminBusinessProjects('ALL');
      return data?.projects || data?.items || [];
    },
    toRow: (project) => ({
      id: project.id,
      title: project.title || '未命名项目',
      customer: project.client?.email || project.client?.name || '—',
      kind: project.studyFormat || project.researchGoal || '问卷',
      stage: project.status || 'DRAFT',
      amount: project.latestQuote?.totalCents != null
        ? `$${(project.latestQuote.totalCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
        : '—',
      updatedAt: project.updatedAt ? String(project.updatedAt).slice(0, 10) : '—',
    }),
    tabs: ['全部', '进行中', '待付款', '已交付'],
    primary: '新建项目',
    columns: [
      { key: 'title', label: '项目', width: '28%' },
      { key: 'customer', label: '客户' },
      { key: 'kind', label: '类型' },
      { key: 'stage', label: '阶段', type: 'badge' },
      { key: 'amount', label: '金额', align: 'right' },
      { key: 'updatedAt', label: '更新', align: 'right' },
    ],
    filters: ['类型', '阶段', '负责人'],
  },
  billing: {
    title: '财务',
    caption: '收款、退款、发票与对账',
    tabs: ['收款', '退款', '发票', '对账'],
    primary: '开票',
    columns: [
      { key: 'ref', label: '单号' },
      { key: 'customer', label: '客户' },
      { key: 'kind', label: '类型' },
      { key: 'amount', label: '金额', align: 'right' },
      { key: 'method', label: '方式' },
      { key: 'status', label: '状态', type: 'badge' },
      { key: 'at', label: '时间', align: 'right' },
    ],
    filters: ['类型', '状态', '时间'],
  },
  reviews: {
    title: '问卷审核',
    caption: '发布前检查：题目、配额、逻辑与合规',
    tabs: ['待审核', '已通过', '需修改'],
    primary: '批量通过',
    columns: [
      { key: 'title', label: '问卷', width: '32%' },
      { key: 'customer', label: '客户' },
      { key: 'questions', label: '题量', align: 'right' },
      { key: 'submittedAt', label: '提交时间' },
      { key: 'status', label: '状态', type: 'badge' },
    ],
    filters: ['状态', '客户'],
  },
  delivery: {
    title: '交付中心',
    caption: '交付物、版本与签收',
    tabs: ['待交付', '已交付', '已签收'],
    primary: '上传交付物',
    columns: [
      { key: 'project', label: '项目', width: '30%' },
      { key: 'artifact', label: '交付物' },
      { key: 'version', label: '版本' },
      { key: 'status', label: '状态', type: 'badge' },
      { key: 'at', label: '时间', align: 'right' },
    ],
    filters: ['状态', '类型'],
  },
  approvals: {
    title: '报价与退款审批',
    caption: '超过阈值的报价与退款，逐笔留痕',
    tabs: ['待审批', '已通过', '已驳回'],
    primary: '批量审批',
    columns: [
      { key: 'kind', label: '类型' },
      { key: 'subject', label: '对象', width: '26%' },
      { key: 'amount', label: '金额', align: 'right' },
      { key: 'requester', label: '发起人' },
      { key: 'status', label: '状态', type: 'badge' },
      { key: 'at', label: '时间', align: 'right' },
    ],
    filters: ['类型', '状态'],
  },
  roles: {
    title: '权限与审计',
    caption: '角色、席位与操作日志（谁改了什么）',
    tabs: ['角色', '成员', '操作日志'],
    primary: '新建角色',
    columns: [
      { key: 'name', label: '名称' },
      { key: 'scope', label: '范围' },
      { key: 'members', label: '成员数', align: 'right' },
      { key: 'updatedAt', label: '更新时间', align: 'right' },
    ],
    filters: ['范围'],
  },
  system: {
    title: '系统与导出',
    caption: '健康检查、任务与数据导出',
    tabs: ['健康', '任务', '导出'],
    primary: '新建导出',
    columns: [
      { key: 'name', label: '项目' },
      { key: 'value', label: '值' },
      { key: 'status', label: '状态', type: 'badge' },
      { key: 'at', label: '时间', align: 'right' },
    ],
    filters: ['状态'],
  },
  messages: {
    title: '消息与模板',
    caption: '工单、公告推送、群发与邮件模板',
    tabs: ['工单', '公告', '群发', '模板'],
    primary: '新建群发',
    columns: [
      { key: 'subject', label: '标题', width: '34%' },
      { key: 'audience', label: '收件对象' },
      { key: 'channel', label: '通道' },
      { key: 'status', label: '状态', type: 'badge' },
      { key: 'at', label: '时间', align: 'right' },
    ],
    filters: ['通道', '状态'],
  },
  content: {
    title: '内容库',
    caption: '问卷模板、题库与被举报内容',
    tabs: ['模板', '题库', '举报'],
    primary: '新建模板',
    columns: [
      { key: 'name', label: '名称', width: '36%' },
      { key: 'kind', label: '类型' },
      { key: 'uses', label: '使用次数', align: 'right' },
      { key: 'updatedAt', label: '更新', align: 'right' },
    ],
    filters: ['类型'],
  },
};
