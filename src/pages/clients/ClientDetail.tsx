import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineArrowLeft, HiOutlineMail, HiOutlinePhone, HiOutlineOfficeBuilding } from 'react-icons/hi';

export default function ClientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const clients = useStore(s => s.clients);
    const projects = useStore(s => s.projects);
    const comments = useStore(s => s.comments);

    const client = clients.find(c => c.id === id);
    if (!client) return <div className="empty-state"><p>Client not found</p></div>;

    const clientProjects = projects.filter(p => p.clientId === client.id);
    const clientComments = comments.filter(c => c.authorId === client.id);

    const getStatusBadge = (status: string) => {
        const map: Record<string, string> = {
            'draft': 'badge-draft', 'in-progress': 'badge-in-progress',
            'needs-review': 'badge-needs-review', 'approved': 'badge-approved', 'archived': 'badge-archived',
        };
        return map[status] || 'badge-draft';
    };

    return (
        <div>
            <button className="btn btn-ghost" onClick={() => navigate('/clients')} style={{ marginBottom: 'var(--space-lg)' }}>
                <HiOutlineArrowLeft size={18} /> Back to Clients
            </button>

            <div className="grid-3" style={{ gap: 'var(--space-xl)' }}>
                <div className="card" style={{ gridColumn: 'span 1' }}>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                        {client.avatar && client.avatar.startsWith('http') ? (
                            <img src={client.avatar} alt={client.name} className="avatar" style={{ width: 72, height: 72, margin: '0 auto var(--space-md)', objectFit: 'cover' }} />
                        ) : (
                            <div className="avatar avatar-teal" style={{ width: 72, height: 72, fontSize: 24, margin: '0 auto var(--space-md)' }}>
                                {client.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        )}
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-semibold)' }}>{client.name}</h2>
                        <span className={`badge ${client.status === 'active' ? 'badge-approved' : 'badge-archived'}`} style={{ marginTop: 'var(--space-sm)' }}>
                            {client.status}
                        </span>
                    </div>
                    <div className="flex flex-col gap-md">
                        <div className="flex items-center gap-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <HiOutlineMail size={16} /> {client.email}
                        </div>
                        <div className="flex items-center gap-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <HiOutlinePhone size={16} /> {client.phone}
                        </div>
                        <div className="flex items-center gap-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <HiOutlineOfficeBuilding size={16} /> {client.company}
                        </div>
                    </div>
                    <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border)' }}>
                        <div className="flex justify-between" style={{ marginBottom: 'var(--space-sm)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Projects</span>
                            <span style={{ fontWeight: 'var(--font-semibold)' }}>{clientProjects.length}</span>
                        </div>
                        <div className="flex justify-between" style={{ marginBottom: 'var(--space-sm)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Comments</span>
                            <span style={{ fontWeight: 'var(--font-semibold)' }}>{clientComments.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Member Since</span>
                            <span style={{ fontWeight: 'var(--font-semibold)' }}>{new Date(client.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 className="section-title">Projects</h3>
                        {clientProjects.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No projects yet</p>
                        ) : (
                            <table className="data-table">
                                <thead>
                                    <tr><th>Project</th><th>Type</th><th>Status</th><th>Versions</th><th>Updated</th></tr>
                                </thead>
                                <tbody>
                                    {clientProjects.map(p => (
                                        <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)} style={{ cursor: 'pointer' }}>
                                            <td style={{ fontWeight: 500 }}>{p.name}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{p.type}</td>
                                            <td><span className={`badge ${getStatusBadge(p.status)}`}>{p.status.replace('-', ' ')}</span></td>
                                            <td>{p.versions}</td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="card">
                        <h3 className="section-title">Recent Comments</h3>
                        {clientComments.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No comments yet</p>
                        ) : (
                            <div className="flex flex-col gap-md">
                                {clientComments.slice(0, 5).map(c => (
                                    <div key={c.id} style={{ padding: 'var(--space-md)', background: 'var(--bg)', borderRadius: 'var(--radius-md)' }}>
                                        <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>{c.content}</p>
                                        <div className="flex items-center gap-md" style={{ marginTop: 'var(--space-sm)' }}>
                                            <span className={`badge ${c.status === 'open' ? 'badge-open' : 'badge-resolved'}`}>{c.status}</span>
                                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                                {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
