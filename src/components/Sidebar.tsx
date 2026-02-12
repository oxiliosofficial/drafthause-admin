import { NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
    HiOutlineViewGrid, HiOutlineUsers, HiOutlineBriefcase,
    HiOutlineCollection, HiOutlineShieldCheck, HiOutlineChartBar,
    HiOutlineDocumentReport, HiOutlineCube, HiOutlineLightBulb,
    HiOutlineCog, HiOutlineGlobe, HiOutlineChevronLeft,
    HiOutlineChevronRight, HiOutlinePlay
} from 'react-icons/hi';
import './Sidebar.css';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
    { path: '/clients', label: 'Clients', icon: HiOutlineUsers },
    { path: '/designers', label: 'Designers', icon: HiOutlineBriefcase },
    { path: '/projects', label: 'Projects', icon: HiOutlineCollection },
    { path: '/approvals', label: 'Approvals', icon: HiOutlineShieldCheck },
    { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
    { path: '/reports', label: 'Reports', icon: HiOutlineDocumentReport },
    { path: '/products', label: 'Product Library', icon: HiOutlineCube },
    { path: '/ai-ideas', label: 'AI Room Ideas', icon: HiOutlineLightBulb },
    { path: '/settings', label: 'Settings', icon: HiOutlineCog },
];

const bottomItems = [
    { path: '/portal/login', label: 'Client Portal', icon: HiOutlineGlobe },
    { path: '/demo', label: 'Demo', icon: HiOutlinePlay },
];

export function Sidebar() {
    const sidebarCollapsed = useStore((s) => s.sidebarCollapsed);
    const toggleSidebar = useStore((s) => s.toggleSidebar);
    const location = useLocation();

    return (
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">DH</div>
                    {!sidebarCollapsed && (
                        <div className="sidebar-logo-text">
                            <span className="sidebar-logo-name">Draft Hause</span>
                            <span className="sidebar-logo-sub">Admin Panel</span>
                        </div>
                    )}
                </div>
                <button className="sidebar-toggle" onClick={toggleSidebar} title={sidebarCollapsed ? 'Expand' : 'Collapse'}>
                    {sidebarCollapsed ? <HiOutlineChevronRight size={16} /> : <HiOutlineChevronLeft size={16} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                <div className="sidebar-nav-section">
                    {!sidebarCollapsed && <span className="sidebar-nav-label">Main</span>}
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
                {bottomItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className="sidebar-link"
                        title={sidebarCollapsed ? item.label : undefined}
                    >
                        <item.icon size={20} />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
}
