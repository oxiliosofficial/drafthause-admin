import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
import './Topbar.css';

export function Topbar() {
    const notifications = useStore((s) => s.notifications);
    const markNotificationRead = useStore((s) => s.markNotificationRead);
    const markAllNotificationsRead = useStore((s) => s.markAllNotificationsRead);
    const liveModeEnabled = useStore((s) => s.liveModeEnabled);
    const toggleLiveMode = useStore((s) => s.toggleLiveMode);

    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="topbar-search">
                    <HiOutlineSearch size={18} />
                    <input type="text" placeholder="Search projects, clients, designers..." className="topbar-search-input" />
                </div>
            </div>

            <div className="topbar-right">
                <div className="topbar-live-mode">
                    <span className="topbar-live-label">Live Mode</span>
                    <button
                        className={`toggle-switch ${liveModeEnabled ? 'active' : ''}`}
                        onClick={toggleLiveMode}
                        title={liveModeEnabled ? 'Disable live mode' : 'Enable live mode'}
                    />
                    {liveModeEnabled && <span className="topbar-live-dot" />}
                </div>

                <div className="topbar-notifications" ref={dropdownRef}>
                    <button
                        className="notification-bell btn-icon"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <HiOutlineBell size={22} />
                        {unreadCount > 0 && (
                            <span className="notification-count">{unreadCount > 9 ? '9+' : unreadCount}</span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="notification-dropdown">
                            <div className="notification-dropdown-header">
                                <h3>Notifications</h3>
                                {unreadCount > 0 && (
                                    <button className="btn-ghost btn-sm" onClick={markAllNotificationsRead}>
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="notification-dropdown-list">
                                {notifications.slice(0, 10).map(notif => (
                                    <button
                                        key={notif.id}
                                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                                        onClick={() => {
                                            markNotificationRead(notif.id);
                                            if (notif.link) window.location.href = notif.link;
                                        }}
                                    >
                                        <div className="notification-item-dot" />
                                        <div className="notification-item-content">
                                            <span className="notification-item-title">{notif.title}</span>
                                            <span className="notification-item-message">{notif.message}</span>
                                            <span className="notification-item-time">{formatTime(notif.createdAt)}</span>
                                        </div>
                                    </button>
                                ))}
                                {notifications.length === 0 && (
                                    <div className="notification-empty">No notifications</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="topbar-user">
                    <div className="avatar avatar-gold">A</div>
                    <div className="topbar-user-info">
                        <span className="topbar-user-name">Admin</span>
                        <span className="topbar-user-role">Administrator</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
