import { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
    HiOutlineViewGrid, HiOutlineUsers, HiOutlineBriefcase,
    HiOutlineCollection, HiOutlineShieldCheck, HiOutlineChartBar,
    HiOutlineDocumentReport, HiOutlineCube, HiOutlineLightBulb,
    HiOutlineCog, HiOutlineGlobe, HiOutlineChevronLeft,
    HiOutlineChevronRight, HiOutlinePlay, HiOutlineLogout
} from 'react-icons/hi';
import './Sidebar.css';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
    { path: '/clients', label: 'Clients', icon: HiOutlineUsers },
    { path: '/designers', label: 'Designers', icon: HiOutlineBriefcase },
    { path: '/projects', label: 'Projects', icon: HiOutlineCollection },
    { path: '/approvals', label: 'Approvals', icon: HiOutlineShieldCheck },
    { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
    // { path: '/reports', label: 'Reports', icon: HiOutlineDocumentReport },
    { path: '/products', label: 'Product Library', icon: HiOutlineCube },
    // { path: '/ai-ideas', label: 'AI Room Ideas', icon: HiOutlineLightBulb },
    { path: '/settings', label: 'Settings', icon: HiOutlineCog },
];

export function Sidebar() {
    const sidebarCollapsed = useStore((s) => s.sidebarCollapsed);
    const toggleSidebar = useStore((s) => s.toggleSidebar);
    const location = useLocation();
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('dh-auth');
        navigate('/login');
    };

    return (
        <>
            <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo" style={{ width: '100%' }}>
                        {!sidebarCollapsed && <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" style={{ height: 60, width: 'auto' }} />}
                    </div>
                    <button className="sidebar-toggle" onClick={toggleSidebar} title={sidebarCollapsed ? 'Expand' : 'Collapse'}>
                        {sidebarCollapsed ? <HiOutlineChevronRight size={16} /> : <HiOutlineChevronLeft size={16} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-nav-section">

                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `sidebar-link ${isActive || location.pathname.startsWith(item.path) ? 'active' : ''}`
                                }
                                title={sidebarCollapsed ? item.label : undefined}
                            >
                                <item.icon size={20} />
                                {!sidebarCollapsed && <span>{item.label}</span>}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-bottom">
                    <button
                        onClick={handleLogout}
                        className="sidebar-link"
                        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red)' }}
                        title={sidebarCollapsed ? 'Logout' : undefined}
                    >
                        <HiOutlineLogout size={20} />
                        {!sidebarCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {showLogoutConfirm && (
                <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)} style={{ zIndex: 9999 }}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 320 }}>
                        <div className="modal-header">
                            <h2 style={{ fontSize: '1.25rem' }}>Confirm Logout</h2>
                        </div>
                        <div className="modal-body">
                            <p style={{ color: 'var(--text-secondary)' }}>Are you sure you want to log out?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                            <button className="btn btn-destructive" onClick={confirmLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
