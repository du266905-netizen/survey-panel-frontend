import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../api/realApi';
import './AnnouncementModal.css';

/* 公告弹窗。
 *
 * 只在研究端出现：登录后拉一次通知，挑最新的一条未读公告，弹一次。
 * 版式照 Notion / Linear 的 What's new：压暗背景、一张 480 的卡片、
 * 眉标 → 标题 → 正文 → 一个主按钮，右上角关闭。
 * 每条公告只弹一次：退出时写服务端已读，同时在本机记 id（换设备也不重复弹）。
 */

const SEEN_KEY = 'guanyi.announcement.seen';

const seenIds = () => {
  try { return JSON.parse(window.localStorage.getItem(SEEN_KEY) || '[]'); } catch { return []; }
};

export default function AnnouncementModal() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    let alive = true;
    getNotifications()
      .then(({ data }) => {
        const seen = new Set(seenIds());
        const next = (data?.notifications || []).find((row) => row.type === 'ANNOUNCEMENT' && !row.readAt && !seen.has(row.id));
        if (alive && next) setItem(next);
      })
      .catch(() => { /* 通知读不到就不弹，不挡路 */ });
    return () => { alive = false; };
  }, []);

  const dismiss = () => {
    if (item) {
      try {
        const seen = new Set(seenIds());
        seen.add(item.id);
        window.localStorage.setItem(SEEN_KEY, JSON.stringify([...seen].slice(-50)));
      } catch { /* 隐私模式 */ }
      markNotificationRead(item.id).catch(() => {});
    }
    setItem(null);
  };

  if (!item) return null;

  return (
    <div className="ann-layer" role="dialog" aria-modal="true" aria-label="公告">
      <button type="button" className="ann-scrim" onClick={dismiss} aria-label="关闭" />
      <section className="ann-card">
        <button type="button" className="ann-close" onClick={dismiss} aria-label="关闭"><X size={16} /></button>
        <span className="ann-eyebrow">公告</span>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        <div className="ann-actions">
          <button type="button" className="ann-primary" onClick={dismiss}>知道了</button>
        </div>
      </section>
    </div>
  );
}
