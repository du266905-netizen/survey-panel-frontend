import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../api/realApi';
import './AnnouncementModal.css';

/* 公告弹窗。
 *
 * 一次只弹一条（最新的一条未读公告），标题就是公告标题，没有眉标。
 * 退出时写已读，并在本机记 id，换设备也不重复弹；下一条等下次打开再出现。
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
        if (alive) setItems(unread.slice(0, 1));
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
        <button type="button" className="ann-close" onClick={dismiss} aria-label="关闭"><X size={16} /></button>
        <header className="ann-hero">
          <h2 id="ann-title">{items[0].title}</h2>
        </header>
        <div className="ann-body">
          {String(items[0].body || '').split(/\n{2,}/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <footer className="ann-actions">
          <button type="button" className="ann-primary" onClick={dismiss}>知道了</button>
        </footer>
      </section>
    </div>
  );
}
