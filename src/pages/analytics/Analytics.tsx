import { useStore } from '../../store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export default function Analytics() {
    const projects = useStore(s => s.projects);
    const clients = useStore(s => s.clients);
    const versions = useStore(s => s.versions);
    const comments = useStore(s => s.comments);

    const COLORS = ['#DEAC6B', '#0F4540', '#685841', '#1A6B63', '#8A7A65', '#C99A5A'];

    const projectsByType = [
        { name: 'Residential', value: projects.filter(p => p.type === 'residential').length },
        { name: 'Commercial', value: projects.filter(p => p.type === 'commercial').length },
    ];

    const projectsByStatus = [
        { status: 'Draft', count: projects.filter(p => p.status === 'draft').length },
        { status: 'In Progress', count: projects.filter(p => p.status === 'in-progress').length },
        { status: 'Needs Review', count: projects.filter(p => p.status === 'needs-review').length },
        { status: 'Approved', count: projects.filter(p => p.status === 'approved').length },
        { status: 'Archived', count: projects.filter(p => p.status === 'archived').length },
    ];

    const monthlyActivity = [
        { month: 'Sep', projects: 3, versions: 8, comments: 12 },
        { month: 'Oct', projects: 5, versions: 14, comments: 20 },
        { month: 'Nov', projects: 4, versions: 10, comments: 18 },
        { month: 'Dec', projects: 2, versions: 6, comments: 8 },
        { month: 'Jan', projects: 6, versions: 18, comments: 25 },
        { month: 'Feb', projects: 5, versions: 12, comments: 22 },
    ];

    const versionsPerProject = projects.slice(0, 10).map(p => ({
        name: p.name.length > 15 ? p.name.slice(0, 15) + '...' : p.name,
        versions: versions.filter(v => v.projectId === p.id).length,
        comments: comments.filter(c => c.projectId === p.id).length,
    }));

    const clientActivity = clients.slice(0, 8).map(c => ({
        name: c.name.split(' ')[0],
        projects: projects.filter(p => p.clientId === c.id).length,
    }));

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Analytics</h1>
                    <p className="page-subtitle">Project and activity insights</p>
                </div>
            </div>

            <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="stat-card"><div className="stat-card-value">{projects.length}</div><div className="stat-card-label">Total Projects</div></div>
                <div className="stat-card"><div className="stat-card-value">{clients.length}</div><div className="stat-card-label">Total Clients</div></div>
                <div className="stat-card"><div className="stat-card-value">{versions.length}</div><div className="stat-card-label">Total Versions</div></div>
                <div className="stat-card"><div className="stat-card-value">{comments.length}</div><div className="stat-card-label">Total Comments</div></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <h3 className="section-title">Monthly Activity Trends</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={monthlyActivity}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E7E3DD" />
                            <XAxis dataKey="month" stroke="#8C8C8C" fontSize={12} />
                            <YAxis stroke="#8C8C8C" fontSize={12} />
                            <Tooltip />
                            <Area type="monotone" dataKey="versions" stroke="#DEAC6B" fill="#F5E6CC" strokeWidth={2} />
                            <Area type="monotone" dataKey="comments" stroke="#0F4540" fill="#E8F0EF" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <h3 className="section-title">Projects by Status</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={projectsByStatus}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E7E3DD" />
                            <XAxis dataKey="status" stroke="#8C8C8C" fontSize={11} />
                            <YAxis stroke="#8C8C8C" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#DEAC6B" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <h3 className="section-title">Projects by Type</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={projectsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" label>
                                {projectsByType.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <h3 className="section-title">Client Activity</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={clientActivity} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#E7E3DD" />
                            <XAxis type="number" stroke="#8C8C8C" fontSize={12} />
                            <YAxis type="category" dataKey="name" stroke="#8C8C8C" fontSize={11} width={70} />
                            <Tooltip />
                            <Bar dataKey="projects" fill="#0F4540" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                <h3 className="section-title">Versions & Comments per Project</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={versionsPerProject}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E7E3DD" />
                        <XAxis dataKey="name" stroke="#8C8C8C" fontSize={10} angle={-20} textAnchor="end" height={50} />
                        <YAxis stroke="#8C8C8C" fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="versions" fill="#DEAC6B" radius={[4, 4, 0, 0]} name="Versions" />
                        <Bar dataKey="comments" fill="#0F4540" radius={[4, 4, 0, 0]} name="Comments" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
