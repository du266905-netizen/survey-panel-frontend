import { useEffect, useMemo, useState } from 'react';
import { History } from 'lucide-react';
import { CHANGELOG, CHANGELOG_KINDS } from '../content/changelog';
import { markChangelogSeen } from '../utils/changelogSeen';
import './AdminChangelog.css';

/* 更新日志。
 *
 * 内容在 src/content/changelog.js，这个文件只管排。排版照常见做法（Chatwoot 的
 * changelog 页、Linear 的 New/Improved/Fixed 分组）：左边日期，右边一条一条，
 * 一条只说一件事，标题是"能做什么了"，正文不超过两句。
 *
 * 分组键是日期，不是批次号：用户看的是"哪天动了什么"，不是我们内部的发布编号。
 */

const FILTERS = [
  ['all', '全部'],
  ['new', '新功能'],
  ['improved', '改进'],
  ['fixed', '修复'],
];

const DAY = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' });
const WEEK = new Intl.DateTimeFormat('zh-CN', { weekday: 'short' });

const parseDate = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export default function AdminChangelog() {
  const [filter, setFilter] = useState('all');

  /* 打开这一页就算读过了：左轨的小红点下次换页会自己灭。 */
  useEffect(() => { markChangelogSeen(); }, []);

  /* #216f78f 这类锚点：页面渲染完再滚，浏览器自己滚会滚不到。 */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }, []);

  const days = useMemo(() => {
    const visible = filter === 'all' ? CHANGELOG : CHANGELOG.filter((entry) => entry.kind === filter);
    const grouped = [];
    visible.forEach((entry) => {
      const last = grouped[grouped.length - 1];
      if (last && last.date === entry.date) last.items.push(entry);
      else grouped.push({ date: entry.date, items: [entry] });
    });
    return grouped;
  }, [filter]);

  return (
    <div className="con-body chg">
      <header className="con-head">
        <div>
          <h1>更新日志</h1>
          <p>每次上线的改动按日期归档，新的在前。</p>
        </div>
        <span className="con-stamp">{CHANGELOG.length} 条记录</span>
      </header>

      <div className="chg-filters" role="tablist" aria-label="按类型筛选">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={filter === key}
            className={filter === key ? 'is-active' : ''}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {days.length === 0 ? (
        <div className="chg-empty">
          <History size={18} aria-hidden="true" />
          <p>这一类还没有记录。</p>
        </div>
      ) : (
        <ol className="chg-list">
          {days.map((day) => (
            <li className="chg-day" key={day.date}>
              <div className="chg-day-mark">
                <time dateTime={day.date}>{DAY.format(parseDate(day.date))}</time>
                <span>{WEEK.format(parseDate(day.date))}</span>
              </div>
              <div className="chg-day-body">
                {day.items.map((entry, index) => {
                  /* 锚点用提交号：稳定，且和 git 里那一笔对得上。没有提交号时退回日期+序号。 */
                  const anchorId = entry.ref || `${entry.date}-${index + 1}`;
                  return (
                    <article className="chg-entry" key={`${entry.date}-${entry.title}`}>
                      <div className="chg-entry-head">
                        <span className={`chg-kind is-${entry.kind}`}>
                          <i aria-hidden="true" />
                          {CHANGELOG_KINDS[entry.kind]}
                        </span>
                        <h2 id={anchorId}>
                          {entry.title}
                          <a className="chg-anchor" href={`#${anchorId}`} aria-label="这一条的固定链接">#</a>
                        </h2>
                      </div>
                      <p>{entry.body}</p>
                      {entry.points?.length ? (
                        <ul>
                          {entry.points.map((point) => <li key={point}>{point}</li>)}
                        </ul>
                      ) : null}
                      {entry.ref ? <span className="chg-ref">提交 {entry.ref}</span> : null}
                    </article>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
