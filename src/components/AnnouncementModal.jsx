import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../api/realApi';
import './AnnouncementModal.css';

/* 公告弹窗。
 *
 * 照常见做法（Linear / Notion 的 What's new，Tour Kit 那篇的实现）：没有眉标，
 * 标题 + 条目列表 + 底部一个按钮。一次把所有未读公告列出来，而不是一条弹一次。
 * 退出时逐条写已读，并在本机记 id，换设备也不重复弹。
 */

const SEEN_KEY = 'guanyi.announcement.seen';

const seenIds = () => {
  try { return JSON.parse(window.localStorage.getItem(SEEN_KEY) || '[]'); } catch { return []; }
};

export default function AnnouncementModal() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;
    getNotifications()
      .then(({ data }) => {
        const seen = new Set(seenIds());
        const unread = (data?.notifications || []).filter((row) => row.type === 'ANNOUNCEMENT' && !row.readAt && !seen.has(row.id));
        if (alive) setItems(unread.slice(0, 5));
      })
      .catch(() => { /* 读不到就不弹 */ });
    return () => { alive = false; };
  }, []);

  const dismiss = () => {
    if (items.length) {
      try {
        const seen = new Set(seenIds());
        items.forEach((row) => seen.add(row.id));
        window.localStorage.setItem(SEEN_KEY, JSON.stringify([...seen].slice(-50)));
      } catch { /* 隐私模式 */ }
      items.forEach((row) => markNotificationRead(row.id).catch(() => {}));
    }
    setItems([]);
  };

  if (!items.length) return null;

  return (
    <div className="ann-layer" role="dialog" aria-modal="true" aria-labelledby="ann-title">
      <button type="button" className="ann-scrim" onClick={dismiss} aria-label="关闭" />
      <section className="ann-card">
        <header className="ann-head">
          <h2 id="ann-title">更新</h2>
          <button type="button" className="ann-close" onClick={dismiss} aria-label="关闭"><X size={16} /></button>
        </header>

        <div className="ann-list">
          {items.map((item) => (
            <article key={item.id} className="ann-item">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <footer className="ann-actions">
          <span className="ann-hint">{items.length} 条更新，只出现一次</span>
          <button type="button" className="ann-primary" onClick={dismiss}>知道了</button>
        </footer>
      </section>
    </div>
  );
}
