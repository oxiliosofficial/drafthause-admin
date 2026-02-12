import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { PortalLayout } from './layouts/PortalLayout';
import Dashboard from './pages/dashboard/Dashboard';
import ClientList from './pages/clients/ClientList';
import ClientDetail from './pages/clients/ClientDetail';
import DesignerList from './pages/designers/DesignerList';
import DesignerDetail from './pages/designers/DesignerDetail';
import ProjectList from './pages/projects/ProjectList';
import ProjectDetail from './pages/projects/ProjectDetail';
import VersionViewer from './pages/projects/VersionViewer';
import Approvals from './pages/approvals/Approvals';
import Analytics from './pages/analytics/Analytics';
import Reports from './pages/reports/Reports';
import ProductLibrary from './pages/products/ProductLibrary';
import AIRoomIdeas from './pages/ai-ideas/AIRoomIdeas';
import SettingsPage from './pages/settings/SettingsPage';
import PortalLogin from './pages/portal/PortalLogin';
import PortalDashboard from './pages/portal/PortalDashboard';
import DemoPage from './pages/demo/DemoPage';
import { useLiveMode } from './hooks/useLiveMode';

export default function App() {
    useLiveMode();

    return (
        <Routes>
            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<ClientList />} />
                <Route path="/clients/:id" element={<ClientDetail />} />
                <Route path="/designers" element={<DesignerList />} />
                <Route path="/designers/:id" element={<DesignerDetail />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/projects/:id/versions/:versionId" element={<VersionViewer />} />
                <Route path="/approvals" element={<Approvals />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/products" element={<ProductLibrary />} />
                <Route path="/ai-ideas" element={<AIRoomIdeas />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/demo" element={<DemoPage />} />
            </Route>

            {/* Portal Routes */}
            <Route path="/portal/login" element={<PortalLayout><PortalLogin /></PortalLayout>} />
            <Route path="/portal/:clientId" element={<PortalLayout><PortalDashboard /></PortalLayout>} />
        </Routes>
    );
}
