import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineArrowLeft, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';

export default function DesignerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const designers = useStore(s => s.designers);
    const projects = useStore(s => s.projects);
    const versions = useStore(s => s.versions);
    const comments = useStore(s => s.comments);
    const activityEvents = useStore(s => s.activityEvents);

    const designer = designers.find(d => d.id === id);
    if (!designer) return <div className="empty-state"><p>Designer not found</p></div>;

    const assignedProjects = projects.filter(p => p.primaryDesignerId === designer.id || p.supportingDesignerIds.includes(designer.id));
    const designerVersions = versions.filter(v => v.createdBy === designer.id);
    const designerComments = comments.filter(c => c.authorId === designer.id);
    const designerActivity = activityEvents.filter(e => e.actor === designer.name).slice(0, 10);

    const getStatusBadge = (s: string) => {
        const m: Record<string, string> = { 'draft': 'badge-draft', 'in-progress': 'badge-in-progress', 'needs-review': 'badge-needs-review', 'approved': 'badge-approved', 'archived': 'badge-archived' };
        return m[s] || 'badge-draft';
    };

    return (
        <div>
            <button className="btn btn-ghost" onClick={() => navigate('/designers')} style={{ marginBottom: 'var(--space-lg)' }}>
                <HiOutlineArrowLeft size={18} /> Back to Designers
            </button>

            <div className="grid-3" style={{ gap: 'var(--space-xl)' }}>
                <div className="card">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                        {designer.avatar && designer.avatar.startsWith('http') ? (
                            <img src={designer.avatar} alt={designer.name} className="avatar" style={{ width: 72, height: 72, margin: '0 auto var(--space-md)', objectFit: 'cover' }} />
                        ) : (
                            <div className="avatar avatar-bronze" style={{ width: 72, height: 72, fontSize: 24, margin: '0 auto var(--space-md)' }}>
                                {designer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        )}
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>{designer.name}</h2>
                        <span className={`badge ${designer.status === 'active' ? 'badge-approved' : 'badge-archived'}`}>{designer.status}</span>
                        {designer.bio && <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-md)', lineHeight: 1.5 }}>{designer.bio}</p>}
                    </div>
                    <div className="flex flex-col gap-md">
                        <div className="flex items-center gap-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}><HiOutlineMail size={16} /> {designer.email}</div>
                        <div className="flex items-center gap-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}><HiOutlinePhone size={16} /> {designer.phone}</div>
                    </div>
                    <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border)' }}>
                        <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>Skills</h4>
                        <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                            {designer.skills.map(skill => <span key={skill} className="badge badge-in-progress">{skill}</span>)}
                        </div>
                    </div>
                    <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border)' }}>
                        <div className="flex justify-between" style={{ marginBottom: 'var(--space-sm)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Projects</span>
                            <span style={{ fontWeight: 600 }}>{assignedProjects.length}</span>
                        </div>
                        <div className="flex justify-between" style={{ marginBottom: 'var(--space-sm)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Versions</span>
                            <span style={{ fontWeight: 600 }}>{designerVersions.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Comments</span>
                            <span style={{ fontWeight: 600 }}>{designerComments.length}</span>
                        </div>
                    </div>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 className="section-title">Assigned Projects</h3>
                        <table className="data-table">
                            <thead><tr><th>Project</th><th>Role</th><th>Status</th><th>Versions</th></tr></thead>
                            <tbody>
                                {assignedProjects.map(p => (
                                    <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)} style={{ cursor: 'pointer' }}>
                                        <td style={{ fontWeight: 500 }}>{p.name}</td>
                                        <td>{p.primaryDesignerId === designer.id ? 'Primary' : 'Supporting'}</td>
                                        <td><span className={`badge ${getStatusBadge(p.status)}`}>{p.status.replace('-', ' ')}</span></td>
                                        <td>{p.versions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card">
                        <h3 className="section-title">Activity Feed</h3>
                        <div className="flex flex-col">
                            {designerActivity.length === 0 ? (
                                <p style={{ color: 'var(--text-muted)' }}>No recent activity</p>
                            ) : designerActivity.map(e => (
                                <div key={e.id} className="activity-item" style={{ display: 'flex', gap: 'var(--space-md)', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>{e.description}</div>
                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                        {new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
