/* 更新日志的内容源。
 *
 * 一条记录一个对象，最新的在最前面。改这个文件就是发布：合并进 main、Vercel 出包后，
 * /admin/changelog 立刻可见。所以规则只有一条：用户点头之前，条目不要进这个文件。
 *
 * 字段
 *   date   YYYY-MM-DD，同一天的多条会归到同一组
 *   kind   new / improved / fixed / data
 *   title  一句话，动词开头，说清"能做什么了"
 *   body   一到两句。写用户看到的变化，不写实现过程
 *   points 可选，最多两条，补细节
 *   ref    可选，提交号；放在条目末尾，方便回去查
 */

export const CHANGELOG_KINDS = {
  new: '新功能',
  improved: '改进',
  fixed: '修复',
  data: '数据',
};

export const CHANGELOG = [
  {
    date: '2026-11-09',
    kind: 'improved',
    title: '研究草稿跟着账户走，不再锁在浏览器里',
    body: '没提交完的研究草稿以前只存在当前这台机器的浏览器里，换个设备就找不到了。现在读写服务端的 /api/business/onboarding，草稿进 Postgres 的 BusinessOnboarding 表，一行一条记录。',
    points: [
      '文字类数据（草稿、项目、成员）都在数据库里，跟着数据库备份走。',
      '清缓存、换浏览器、换电脑，回到工作台还能接着填。',
    ],
    ref: '216f78f',
  },
  {
    date: '2026-11-08',
    kind: 'improved',
    title: '团队、邀请与 AI 额度接上了真实接口',
    body: '团队页的成员与邀请、邀请落地页的「接受邀请」、AI 页左下角的剩余额度，都改成读服务端；没有数据时显示空态，不再拿浏览器里的临时值顶上。',
    ref: '3ef176c',
  },
  {
    date: '2026-11-08',
    kind: 'fixed',
    title: 'AI 额度用完时，说清是额度不可用',
    body: '以前提示去检查接口，像是我们自己没接好。现在直接说明额度当前不可用，以及下一步该做什么。',
    ref: 'a989c9d',
  },
];
