import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../api/realApi';

const timeLabel = (value) => {
  const milliseconds = Date.now() - new Date(value).getTime();
  const minutes = Math.max(0, Math.floor(milliseconds / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));
};

export default function NotificationBell({ className = '' }) {
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
      // Notifications should never block the workspace when unavailable.
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

  return <div ref={ref} className={`notification-bell ${className}`}>
    <button type="button" className={open ? 'is-open' : ''} onClick={() => setOpen((value) => !value)} aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`} aria-expanded={open}>
      <Bell size={18} />
      {unreadCount > 0 && <span>{unreadCount > 9 ? '9+' : unreadCount}</span>}
    </button>
    {open && <section className="notification-popover" aria-label="Notifications">
      <header><div><strong>Notifications</strong><small>{unreadCount ? `${unreadCount} unread` : 'You’re up to date'}</small></div>{unreadCount > 0 && <button type="button" onClick={readAll}><CheckCheck size={14} /> Mark all read</button>}</header>
      <div className="notification-list">{notifications.length ? notifications.map((notification) => <button type="button" key={notification.id} className={notification.readAt ? '' : 'is-unread'} onClick={() => openNotification(notification)}><span><strong>{notification.title}</strong><em>{timeLabel(notification.createdAt)}</em></span><small>{notification.body}</small></button>) : <p>No notifications yet.</p>}</div>
    </section>}
  </div>;
}
