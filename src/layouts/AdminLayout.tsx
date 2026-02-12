import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { useStore } from '../store/useStore';
import './AdminLayout.css';

export function AdminLayout() {
    const sidebarCollapsed = useStore((s) => s.sidebarCollapsed);

    return (
        <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar />
            <div className="admin-main">
                <Topbar />
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
