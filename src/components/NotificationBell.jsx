import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck, CircleCheck, FileText, Inbox, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../api/realApi';
import './NotificationBell.css';

/* 通知铃铛。
 *
 * 排版照 Courier 那篇通知中心设计稿的结论：一行只留一个未读信号（一个点），
 * 前面一个类型图标先回答“这是什么”，标题自己站得住，正文最多两行，时间用相对的。
 * 以前同一件事用了黄条 + 加粗 + 底色三种写法，所以看着脏。
 */

const ICON_RULES = [
  [/PAYMENT|FUNDED|REFUND|INVOICE/i, Wallet],
  [/QUOTE/i, FileText],
  [/SUBMITTED|CREATED|REVIEW/i, Inbox],
  [/LIVE|RECRUITING|COMPLETED|APPROVED/i, CircleCheck],
];

const iconFor = (type) => {
  const match = ICON_RULES.find(([pattern]) => pattern.test(String(type || '')));
  return match ? match[1] : Bell;
};

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

  /* 今天 / 昨天 / 更早：分三组，列表长一点也扫得动。 */
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
        <div>
          <strong>通知</strong>
          <small>{unreadCount ? `${unreadCount} 条未读` : '都读完了'}</small>
        </div>
        {unreadCount > 0 && <button type="button" onClick={readAll}><CheckCheck size={14} /> 全部已读</button>}
      </header>
      <div className="notification-list">
        {notifications.length ? groups.map((group) => (
          <div className="nb-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((notification) => {
              const Icon = iconFor(notification.type);
              return (
                <button type="button" key={notification.id} className={`nb-row${notification.readAt ? '' : ' is-unread'}`} onClick={() => openNotification(notification)}>
                  <span className="nb-icon"><Icon size={15} aria-hidden="true" /></span>
                  <span className="nb-main">
                    <span className="nb-title">{notification.title}</span>
                    {notification.body ? <span className="nb-body">{notification.body}</span> : null}
                  </span>
                  <span className="nb-meta">
                    <em>{timeLabel(notification.createdAt)}</em>
                    {notification.readAt ? null : <i className="nb-dot" aria-label="未读" />}
                  </span>
                </button>
              );
            })}
          </div>
        )) : <p className="nb-empty">还没有通知。项目有进展、钱到账时，这里会出现一条。</p>}
      </div>
    </section>}
  </div>;
}
