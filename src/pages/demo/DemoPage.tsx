import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const FEATURES = [
    { label: 'Dashboard', path: '/dashboard', desc: 'KPI stat cards, Recharts line/bar/pie charts, activity feed', icon: '📊' },
    { label: 'Client Management', path: '/clients', desc: 'Full CRUD table with search, filter, pagination, avatar initials', icon: '👥' },
    { label: 'Designer Management', path: '/designers', desc: 'Team list with skills, deactivate toggle, detail view', icon: '🎨' },
    { label: 'Project Command Center', path: '/projects', desc: 'Multi-filter table, bulk actions, 5-tab detail (versions, exports, comments, activity)', icon: '📐' },
    { label: 'Version Viewer', path: '/projects', desc: '3D canvas with Three.js + 2D floor plan toggle, version sidebar', icon: '🏗️' },
    { label: 'Approvals Queue', path: '/approvals', desc: 'Tabbed queue (pending/approved/rejected), one-click approve/reject', icon: '✅' },
    { label: 'Analytics', path: '/analytics', desc: 'Area, bar, pie, horizontal bar charts with Recharts', icon: '📈' },
    { label: 'Reports', path: '/reports', desc: '6 report types, configurable options, format selection, simulated generation', icon: '📑' },
    { label: 'Product Library', path: '/products', desc: 'Card grid, category tabs, URL import with scraping simulation', icon: '📦' },
    { label: 'AI Room Ideas', path: '/ai-ideas', desc: 'Two generation modes: curated selectors + prompt-based, gallery view', icon: '💡' },
    { label: 'Settings', path: '/settings', desc: 'Company info, notifications, export defaults, portal config — localStorage', icon: '⚙️' },
    { label: 'Client Portal', path: '/portal/login', desc: 'Email login, project sidebar, versions, comments, approvals — teal theme', icon: '🌐' },
];

export default function DemoPage() {
    const navigate = useNavigate();
    const toggleLiveMode = useStore(s => s.toggleLiveMode);
    const liveModeEnabled = useStore(s => s.liveModeEnabled);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Demo Walkthrough</h1>
                    <p className="page-subtitle">Explore all features of the Draft Hause Admin Panel</p>
                </div>
                <button className={`btn ${liveModeEnabled ? 'btn-destructive' : 'btn-primary'}`} onClick={toggleLiveMode}>
                    {liveModeEnabled ? 'Stop Live Mode' : 'Start Live Mode'}
                </button>
            </div>

            <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', background: 'linear-gradient(135deg, var(--gold-bg) 0%, var(--teal-bg) 100%)', border: 'none' }}>
                <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                    Draft Hause LiDAR Admin Panel
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6 }}>
                    A complete, production-style admin panel for managing LiDAR scanning projects, designers, clients, and approvals.
                    Built with React, TypeScript, Zustand, Recharts, and Three.js. Frontend-only with simulated async API calls.
                </p>
                <div className="flex gap-sm" style={{ marginTop: 'var(--space-lg)', flexWrap: 'wrap' }}>
                    {['React 18', 'TypeScript', 'Vite', 'Zustand', 'Recharts', 'Three.js', 'React Router 6'].map(tech => (
                        <span key={tech} className="badge badge-in-progress">{tech}</span>
                    ))}
                </div>
            </div>

            <div className="grid-3" style={{ gap: 'var(--space-lg)' }}>
                {FEATURES.map(f => (
                    <button
                        key={f.label}
                        className="card"
                        onClick={() => navigate(f.path)}
                        style={{ padding: 'var(--space-lg)', textAlign: 'left', cursor: 'pointer', transition: 'all var(--transition-fast)', border: '1px solid var(--border)' }}
                    >
                        <div className="flex items-center gap-md" style={{ marginBottom: 'var(--space-sm)' }}>
                            <span style={{ fontSize: 24 }}>{f.icon}</span>
                            <h3 style={{ fontWeight: 600, fontSize: 'var(--font-size-base)' }}>{f.label}</h3>
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
