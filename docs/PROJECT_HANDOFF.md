# GuanyiSearch 项目交接

> 更新日期：2026-08-02
> 本文只记录产品与代码交接状态；不记录凭据、部署细节或内部运营信息。

## 当前首页

- `/` 已使用新的 Atlas 首页：以“独立思考，明辨是非”为主标题，提供站内搜索、新闻墙与参与入口。
- 首页及所有公开内容页共用 Atlas 顶部导航：`About us`（`How it works`、`Our approach`）、`News Wall`、`Take part` 与 `Standards`；登录和注册仍指向独立认证页。
- 新首页首屏后的续页保留全球视角、奖励说明与完整站点底部；人本宣言已移至独立的 `/our-approach` 页面。
- 续页与公共页脚入口文件：`src/components/HomeLegacySections.jsx`。
- 共享公开页导航与外壳：`src/components/PublicSiteHeader.jsx`、`src/components/PublicSiteLayout.jsx`。
- 续页样式文件：`src/components/HomeLegacySections.css`。
- 首页主结构：`src/pages/HomeAtlas.jsx` 与 `src/pages/HomeAtlas.css`。

## 登录与注册

- `/login` 与 `/register` 保留原有认证界面（含原有品牌登录视觉），不再被新的 Atlas 首页替代。
- 认证页通过 `src/pages/Landing.jsx` 的 `authOnly` 模式渲染。

## 已有产品入口

- 新闻墙：`/news`，站内新闻详情：`/news/:articleId`。
- 人本宣言：`/our-approach`。
- 问卷与奖励入口：`/partners`、`/wallet`、`/dashboard`。
- 隐私、条款和使用说明：`/privacy`、`/terms`、`/how-it-works`。
- 公开首页导航只链接已存在的页面；尚未开放的社区能力应继续标注为即将推出，不能伪装成已可用功能。
- `How it works`、隐私、条款、新闻墙/详情、公开问卷入口与完成页均使用共享公开导航和页脚；后台工作台与认证页仍保留专用界面。

## 视觉资产与准则

- 品牌基调：偏白纸色、墨色、低饱和绿色与少量暖色；强调“以人为本”。
- 已保留的人本/全球视觉资产：`public/human-manifesto/shoreline-painting.jpg`、`src/assets/home/`。
- 品牌线绘语法见 `docs/guanyisearch-ip-drawing-grammar.md`；如需新增插画，先遵循其中的线条、色块和留白原则。
- 用户对首页的明确偏好：减少抽象小文案和无意义装饰，减少无效留白，动效可以更明显但不能遮挡文字或影响导航。

## 第九阶段：首页断点与导航验收

- 已人工巡检首页在 `1440px`、`1024px` 与 `390px` 宽度下的首屏、核心入口和导航表现；各断点均无横向溢出。
- 已验证桌面端下拉导航，以及平板和手机端的展开菜单、站内搜索与现有页面入口。
- 移动菜单收起时现通过 `aria-hidden` 和 `inert` 从读屏与键盘焦点顺序中移除；菜单按钮使用 `aria-controls` 明确关联受控区域。
- 已执行 `pnpm build`，构建通过；仍只有既有的前端包体体积提示，未阻断构建。

## 尚未开发，后续不可对外表述为已上线

1. 用户投稿新闻、观点与文章的公开发布流程。
2. 公开社区评论、展示优质内容与奖励机制。
3. 基于真实 News Wall 投票数据生成并发布的数据原创报告。
4. 按兴趣与语言生成的语音新闻播报。

这些功能可以作为新版首页后续内容节点，但应在真实数据、审核规则和用户流程完善后再开放。

## 下一段建议顺序

1. 先定义投稿/社区的最小可用流程与审核状态，再增加首页对应入口。
2. 当 News Wall 有足够真实参与数据后，再设计“数据原创报告”详情与首页展示模块。
3. 为首页可点击节点补充真实内容，避免使用无对应页面的静态承诺。

## 本次交接前验证

- 已执行：`pnpm build`。
- 构建通过；仅有现有的前端包体体积提示，未阻断构建。
