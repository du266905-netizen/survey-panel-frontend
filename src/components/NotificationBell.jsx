import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../api/realApi';
import './NotificationBell.css';

/* 通知铃铛。
 *
 * 排版照常见做法：面板放宽到 640，一条是一张浅灰卡片，标题一行、正文一段。
 * 不放类型图标——图标在这里不承担识别作用，只会让每行多一个噪音。
 * 未读用底色区分（灰底），点开即恢复白底；未读那条左边留一个小点，
 * 一屏里能扫出哪几条是新到的。
 */

const timeLabel = (value) => {
  const date = new Date(value);
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days === 1) return '昨天';
  return new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric' }).format(date);
};

const dayStart = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const groupLabel = (value) => {
  const days = Math.round((dayStart(Date.now()) - dayStart(value)) / 86400000);
  if (days <= 0) return '今天';
  if (days === 1) return '昨天';
  return '更早';
};

export default function NotificationBell({ className = '', presentation = 'popover' }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data.notifications || []);
      setUnreadCount(response.data.unreadCount || 0);
    } catch {
      // 通知不可用不该挡住工作台。
    }
  };

  useEffect(() => {
    load();
    const interval = window.setInterval(load, 45000);
    const close = (event) => { if (!ref.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => { window.clearInterval(interval); document.removeEventListener('pointerdown', close); };
  }, []);

  const openNotification = async (notification) => {
    if (!notification.readAt) {
      setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, readAt: new Date().toISOString() } : item));
      setUnreadCount((current) => Math.max(0, current - 1));
      markNotificationRead(notification.id).catch(() => load());
    }
    setOpen(false);
    if (notification.href) navigate(notification.href);
  };

  const readAll = async () => {
    setNotifications((current) => current.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() })));
    setUnreadCount(0);
    try { await markAllNotificationsRead(); } catch { load(); }
  };

  const groups = notifications.reduce((list, item) => {
    const label = groupLabel(item.createdAt);
    const last = list[list.length - 1];
    if (last && last.label === label) last.items.push(item);
    else list.push({ label, items: [item] });
    return list;
  }, []);

  return <div ref={ref} className={`notification-bell ${className}`}>
    <button type="button" className={open ? 'is-open' : ''} onClick={() => setOpen((value) => !value)} aria-label={unreadCount ? `通知，${unreadCount} 条未读` : '通知'} aria-expanded={open}>
      <Bell size={18} />
      {unreadCount > 0 && <span>{unreadCount > 9 ? '9+' : unreadCount}</span>}
    </button>
    {open && <section className={`notification-popover${presentation === 'modal' ? ' notification-popover--modal' : ''}`} aria-label="通知">
      <header>
        <strong>通知</strong>
        {unreadCount > 0 && <button type="button" onClick={readAll}><CheckCheck size={14} /> 全部已读</button>}
      </header>
      <div className="notification-list">
        {notifications.length ? groups.map((group) => (
          <div className="nb-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((notification) => (
              <button type="button" key={notification.id} className={`nb-item${notification.readAt ? '' : ' is-unread'}`} onClick={() => openNotification(notification)}>
                <span className="nb-head">
                  {notification.readAt ? null : <i className="nb-dot" aria-label="未读" />}
                  <span className="nb-title">{notification.title}</span>
                  <em>{timeLabel(notification.createdAt)}</em>
                </span>
                {notification.body ? <span className="nb-body">{notification.body}</span> : null}
              </button>
            ))}
          </div>
        )) : <p className="nb-empty">还没有通知。项目有进展、钱到账时，这里会出现一条。</p>}
      </div>
    </section>}
  </div>;
}
