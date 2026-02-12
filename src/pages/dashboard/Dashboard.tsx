import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlineUsers, HiOutlineCollection, HiOutlineShieldCheck, HiOutlineChatAlt2,
    HiOutlineArrowRight, HiOutlineCube, HiOutlineCheckCircle, HiOutlineDocumentText,
    HiOutlineEye, HiOutlineRefresh, HiOutlineUserGroup, HiOutlineClipboardList, HiOutlinePlus
} from 'react-icons/hi';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Dashboard.css';

export default function Dashboard() {
    const clients = useStore(s => s.clients);
    const projects = useStore(s => s.projects);
    const comments = useStore(s => s.comments);
    const approvals = useStore(s => s.approvals);
    const activityEvents = useStore(s => s.activityEvents);
    const navigate = useNavigate();

    const activeClients = clients.filter(c => c.status === 'active').length;
    const activeProjects = projects.filter(p => p.status !== 'archived').length;
    const pendingApprovals = approvals.filter(a => a.status === 'pending').length;
    const openComments = comments.filter(c => c.status === 'open').length;

    const statusData = [
        { name: 'Draft', value: projects.filter(p => p.status === 'draft').length, color: '#8C8C8C' },
        { name: 'In Progress', value: projects.filter(p => p.status === 'in-progress').length, color: '#0F4540' },
        { name: 'Needs Review', value: projects.filter(p => p.status === 'needs-review').length, color: '#DEAC6B' },
        { name: 'Approved', value: projects.filter(p => p.status === 'approved').length, color: '#2E7D5B' },
        { name: 'Archived', value: projects.filter(p => p.status === 'archived').length, color: '#D4CFC7' },
    ];

    const monthlyVersions = [
        { month: 'Sep', versions: 12 }, { month: 'Oct', versions: 18 },
        { month: 'Nov', versions: 15 }, { month: 'Dec', versions: 8 },
        { month: 'Jan', versions: 22 }, { month: 'Feb', versions: 14 },
    ];

    const approvalTrend = [
        { month: 'Sep', rate: 72 }, { month: 'Oct', rate: 78 },
        { month: 'Nov', rate: 85 }, { month: 'Dec', rate: 68 },
        { month: 'Jan', rate: 82 }, { month: 'Feb', rate: 88 },
    ];

    const recentProjects = projects
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5);

    const recentActivity = activityEvents.slice(0, 8);

    const formatDate = (d: string) => {
        const date = new Date(d);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getStatusBadge = (status: string) => {
        const map: Record<string, string> = {
            'draft': 'badge-draft', 'in-progress': 'badge-in-progress',
            'needs-review': 'badge-needs-review', 'approved': 'badge-approved', 'archived': 'badge-archived',
        };
        return map[status] || 'badge-draft';
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'version-created': return <HiOutlineCube size={18} />;
            case 'comment-added': return <HiOutlineChatAlt2 size={18} />;
            case 'approval-changed': return <HiOutlineCheckCircle size={18} />;
            case 'export-generated': return <HiOutlineDocumentText size={18} />;
            case 'project-created': return <HiOutlinePlus size={18} />;
            case 'client-portal-view': return <HiOutlineEye size={18} />;
            case 'designer-assigned': return <HiOutlineUserGroup size={18} />;
            case 'status-changed': return <HiOutlineRefresh size={18} />;
            default: return <HiOutlineClipboardList size={18} />;
        }
    };

    return (
        <div className="dashboard">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Overview of your LiDAR projects and team activity</p>
                </div>
            </div>

            <div className="grid-4 dashboard-kpis">
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: '#E8F0EF', color: '#0F4540' }}>
                        <HiOutlineUsers size={22} />
                    </div>
                    <div className="stat-card-value">{activeClients}</div>
                    <div className="stat-card-label">Active Clients</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: '#FBF5EB', color: '#685841' }}>
                        <HiOutlineCollection size={22} />
                    </div>
                    <div className="stat-card-value">{activeProjects}</div>
                    <div className="stat-card-label">Active Projects</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: '#FFF4E6', color: '#C17A2F' }}>
                        <HiOutlineShieldCheck size={22} />
                    </div>
                    <div className="stat-card-value">{pendingApprovals}</div>
                    <div className="stat-card-label">Awaiting Approval</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: '#FDEDED', color: '#C0392B' }}>
                        <HiOutlineChatAlt2 size={22} />
                    </div>
                    <div className="stat-card-value">{openComments}</div>
                    <div className="stat-card-label">Open Comments</div>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="card dashboard-chart-card">
                    <h3 className="section-title">Projects by Status</h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie data={statusData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`${value} projects`, '']} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="chart-legend">
                        {statusData.map(item => (
                            <div key={item.name} className="chart-legend-item">
                                <span className="chart-legend-dot" style={{ background: item.color }} />
                                <span>{item.name} ({item.value})</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card dashboard-chart-card">
                    <h3 className="section-title">Versions Created</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlyVersions}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E7E3DD" />
                            <XAxis dataKey="month" stroke="#8C8C8C" fontSize={12} />
                            <YAxis stroke="#8C8C8C" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="versions" fill="#DEAC6B" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard-bottom">
                <div className="card dashboard-recent-projects">
                    <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 className="section-title" style={{ margin: 0 }}>Recently Updated Projects</h3>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/projects')}>
                            View All <HiOutlineArrowRight />
                        </button>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Status</th>
                                <th>Versions</th>
                                <th>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProjects.map(project => (
                                <tr key={project.id} onClick={() => navigate(`/projects/${project.id}`)} style={{ cursor: 'pointer' }}>
                                    <td style={{ fontWeight: 500 }}>{project.name}</td>
                                    <td><span className={`badge ${getStatusBadge(project.status)}`}>{project.status.replace('-', ' ')}</span></td>
                                    <td>{project.versions}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{formatDate(project.updatedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card dashboard-activity">
                    <h3 className="section-title">Recent Activity</h3>
                    <div className="activity-feed">
                        {recentActivity.map(event => (
                            <div key={event.id} className="activity-item">
                                <div className="activity-icon">{getActivityIcon(event.type)}</div>
                                <div className="activity-content">
                                    <p className="activity-desc">{event.description}</p>
                                    <span className="activity-time">{formatDate(event.createdAt)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
