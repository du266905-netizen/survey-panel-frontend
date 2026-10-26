import {
  ArrowRight, ArrowUpRight, Play, Mail,
  DoorOpen, Compass, UsersRound, Tag, Megaphone, Store, HeartHandshake,
  MessageSquareText, BarChart3, Layers,
  ShieldCheck, Clock3, ClipboardPenLine,
  FileText, Table2, ChartSpline, AudioLines, Package,
  FolderKanban, ClipboardList, Users, Send,
  Wallet, Receipt, Gift,
  FilePenLine, Sparkles, Route, LayoutDashboard,
} from 'lucide-react';
import LanguageGlobe from '../components/LanguageGlobe';
import './IconBoard.css';

/* 临时页：图标手册的打样稿。截完图这个文件和 /__icons 路由都会删掉。 */

const groups = [
  {
    key: 'existing',
    title: '公开页现在在用的',
    note: '页面里已经落地的全部图标，就这五个',
    items: [
      { icon: Play, zh: '影片', en: 'Play', use: '首页 / About 影片封面' },
      { icon: ArrowRight, zh: '跳转', en: 'Arrow right', use: '行业卡片、条款行' },
      { icon: ArrowUpRight, zh: '外链', en: 'Arrow up-right', use: '页末 CTA、导航按钮' },
      { icon: Mail, zh: '订阅', en: 'Mail', use: '订阅卡片' },
      { custom: true, zh: '语言', en: 'Language globe', use: '语言切换' },
    ],
  },
  {
    key: 'solutions',
    title: '解决方案 · 七项',
    note: '下一轮 Solutions 页面逐页使用，一张页一个',
    items: [
      { icon: DoorOpen, zh: '进入市场', en: 'Door open', use: '市场进入' },
      { icon: Compass, zh: '中国市场洞察', en: 'Compass', use: '中国能力页' },
      { icon: UsersRound, zh: '了解受众', en: 'Users round', use: '受众研究' },
      { icon: Tag, zh: '产品与定价', en: 'Tag', use: '概念与定价' },
      { icon: Megaphone, zh: '品牌与传播', en: 'Megaphone', use: '品牌沟通' },
      { icon: Store, zh: '渠道与零售', en: 'Store', use: '渠道与货架' },
      { icon: HeartHandshake, zh: '客户体验', en: 'Heart handshake', use: '体验与留存' },
    ],
  },
  {
    key: 'methods',
    title: '方法 · 三项',
    note: '定性 / 定量 / 混合，用在方法段和方案页',
    items: [
      { icon: MessageSquareText, zh: '定性', en: 'Message square', use: '深访、座谈' },
      { icon: BarChart3, zh: '定量', en: 'Bar chart', use: '问卷、追踪' },
      { icon: Layers, zh: '混合', en: 'Layers', use: '两法并用' },
    ],
  },
  {
    key: 'capability',
    title: '能力与信任 · 三项',
    note: '和 China 页那三个一样，用来支撑一句话',
    items: [
      { icon: ShieldCheck, zh: '质检', en: 'Shield check', use: '人工质检、可信' },
      { icon: Clock3, zh: '48 小时', en: 'Clock', use: '初数据交付' },
      { icon: ClipboardPenLine, zh: '研究设计', en: 'Clipboard pen', use: '问卷与方案' },
    ],
  },
];

function Icon({ item }) {
  if (item.custom) return <LanguageGlobe size={23} strokeWidth={1.65} />;
  const C = item.icon;
  return <C size={23} strokeWidth={1.65} />;
}

export default function IconBoard() {
  return (
    <div className="icon-board">
      <header className="icon-board-head">
        <p className="icon-board-kicker">GuanyiSearch · 图标手册</p>
        <h1>一套网格，三十四个图标。</h1>
        <p className="icon-board-intro">
          24 的网格、1.65 的描边、圆端头、只用 currentColor。公开页 16 / 20 / 23 三档尺寸，
          一个区块只用一套，不混填色、不旋转、不描内线。
        </p>
        <div className="icon-board-spec">
          <div className="icon-board-grid">
            <span />
          </div>
          <p>24 grid · 20 live area · 2 留白</p>
        </div>
        <div className="icon-board-sizes">
          <div><Mail size={16} strokeWidth={1.65} /><span>16 行内</span></div>
          <div><Mail size={20} strokeWidth={1.65} /><span>20 标题旁</span></div>
          <div><Mail size={23} strokeWidth={1.65} /><span>23 独立</span></div>
        </div>
      </header>

      {groups.map((group) => (
        <section key={group.key} className="icon-board-group">
          <div className="icon-board-group-head">
            <h2>{group.title}</h2>
            <p>{group.note}</p>
          </div>
          <ul className="icon-board-list">
            {group.items.map((item) => (
              <li key={item.zh}>
                <span className="icon-board-cell"><Icon item={item} /></span>
                <strong>{item.zh}</strong>
                <small>{item.en}</small>
                <em>{item.use}</em>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="icon-board-group" key="deliverables">
        <div className="icon-board-group-head">
          <h2>研究端 · 交付物 · 五项</h2>
          <p>客户最后拿到的东西，按形态分，不按行业分</p>
        </div>
        <ul className="icon-board-list">
          {[
            { icon: FileText, zh: '报告', en: 'File text', use: '结案报告、速报' },
            { icon: Table2, zh: '数据集', en: 'Table 2', use: '交叉表、原始数据' },
            { icon: ChartSpline, zh: '趋势', en: 'Chart spline', use: '追踪、走势' },
            { icon: AudioLines, zh: '访谈录音', en: 'Audio lines', use: '录音、转写' },
            { icon: Package, zh: '交付包', en: 'Package', use: '一次交付的整体' },
          ].map((item) => {
            const C = item.icon;
            return (
              <li key={item.zh}>
                <span className="icon-board-cell"><C size={23} strokeWidth={1.65} /></span>
                <strong>{item.zh}</strong>
                <small>{item.en}</small>
                <em>{item.use}</em>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="icon-board-group" key="flow">
        <div className="icon-board-group-head">
          <h2>研究端 · 流程 · 四项</h2>
          <p>从立项到交付的四个动作，工作区侧栏用的是这一组</p>
        </div>
        <ul className="icon-board-list">
          {[
            { icon: FolderKanban, zh: '项目', en: 'Folder kanban', use: '项目列表' },
            { icon: ClipboardList, zh: '问卷', en: 'Clipboard list', use: '填写中的问卷' },
            { icon: Users, zh: '样本', en: 'Users', use: '参与者与配额' },
            { icon: Send, zh: '交付', en: 'Send', use: '提交、发给客户' },
          ].map((item) => {
            const C = item.icon;
            return (
              <li key={item.zh}>
                <span className="icon-board-cell"><C size={23} strokeWidth={1.65} /></span>
                <strong>{item.zh}</strong>
                <small>{item.en}</small>
                <em>{item.use}</em>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="icon-board-group" key="account">
        <div className="icon-board-group-head">
          <h2>账户 · 三项</h2>
          <p>钱相关的永远这三个，不要再造第四个</p>
        </div>
        <ul className="icon-board-list">
          {[
            { icon: Wallet, zh: '预算', en: 'Wallet', use: '预算、余额' },
            { icon: Receipt, zh: '账单', en: 'Receipt', use: '报价、发票' },
            { icon: Gift, zh: '奖励', en: 'Gift', use: 'Coins、礼品卡' },
          ].map((item) => {
            const C = item.icon;
            return (
              <li key={item.zh}>
                <span className="icon-board-cell"><C size={23} strokeWidth={1.65} /></span>
                <strong>{item.zh}</strong>
                <small>{item.en}</small>
                <em>{item.use}</em>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="icon-board-group" key="platform">
        <div className="icon-board-group-head">
          <h2>研究平台 · 四项</h2>
          <p>解决方案页页底那五条用它；问卷设计沿用第 18 号，不另造</p>
        </div>
        <ul className="icon-board-list">
          {[
            { icon: FilePenLine, zh: '问卷编辑器', en: 'File pen line', use: '改题、加逻辑' },
            { icon: Sparkles, zh: 'AI 辅助', en: 'Sparkles', use: '起草、检查' },
            { icon: Route, zh: '定制研究', en: 'Route', use: '定形式与路径' },
            { icon: LayoutDashboard, zh: '统一工作区', en: 'Layout dashboard', use: '一站式界面' },
          ].map((item) => {
            const C = item.icon;
            return (
              <li key={item.zh}>
                <span className="icon-board-cell"><C size={23} strokeWidth={1.65} /></span>
                <strong>{item.zh}</strong>
                <small>{item.en}</small>
                <em>{item.use}</em>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="icon-board-rules">
        <div>
          <p className="icon-board-kicker">尺寸</p>
          <p>16 行内 · 20 标题旁 · 23 独立展示。不做 24 以上的图标。</p>
        </div>
        <div>
          <p className="icon-board-kicker">用法</p>
          <p>图标永远跟一句话走；只有图标没有文字的按钮，不加。</p>
        </div>
        <div>
          <p className="icon-board-kicker">颜色</p>
          <p>继承文字色：正文 #141413、浅底 #7F848A、黑底 #FFFFFF。</p>
        </div>
        <div>
          <p className="icon-board-kicker">来源</p>
          <p>Lucide 为主，语言球是自制；新增先在这张表里挂号再进页面。</p>
        </div>
      </section>
    </div>
  );
}
