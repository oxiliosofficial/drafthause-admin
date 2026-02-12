import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function PortalDashboard() {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const clients = useStore(s => s.clients);
    const projects = useStore(s => s.projects);
    const versions = useStore(s => s.versions);
    const comments = useStore(s => s.comments);
    const approvals = useStore(s => s.approvals);
    const addComment = useStore(s => s.addComment);

    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [activeTab, setActiveTab] = useState(0);

    const client = clients.find(c => c.id === clientId);
    if (!client) return (
        <div className="empty-state card">
            <p>Client not found</p>
            <button className="btn btn-primary" onClick={() => navigate('/portal/login')} style={{ marginTop: 'var(--space-md)' }}>Back to Login</button>
        </div>
    );

    const clientProjects = projects.filter(p => p.clientId === client.id);
    const selectedProject = activeProject ? projects.find(p => p.id === activeProject) : clientProjects[0];
    const projectVersions = selectedProject ? versions.filter(v => v.projectId === selectedProject.id).sort((a, b) => b.versionNumber - a.versionNumber) : [];
    const projectComments = selectedProject ? comments.filter(c => c.projectId === selectedProject.id) : [];
    const projectApprovals = selectedProject ? approvals.filter(a => {
        const versionIds = projectVersions.map(v => v.id);
        return versionIds.includes(a.versionId);
    }) : [];

    const handleAddComment = () => {
        if (!commentText.trim() || !selectedProject) return;
        addComment({
            id: `portal-comment-${Date.now()}`,
            projectId: selectedProject.id,
            versionId: projectVersions[0]?.id || '',
            authorId: client.id,
            authorType: 'client',
            authorName: client.name,
            content: commentText,
            status: 'open',
            createdAt: new Date().toISOString(),
        });
        setCommentText('');
        toast.success('Comment posted');
    };

    const statusBadge = (s: string) => {
        const m: Record<string, string> = { 'draft': 'badge-draft', 'in-progress': 'badge-in-progress', 'needs-review': 'badge-needs-review', 'approved': 'badge-approved', 'archived': 'badge-archived', 'pending': 'badge-needs-review' };
        return m[s] || 'badge-draft';
    };

    const tabs = ['Overview', 'Versions', 'Comments', 'Approvals'];

    return (
        <div>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>Welcome, {client.name.split(' ')[0]}</h1>
                <p style={{ color: 'var(--text-secondary)' }}>View your projects and provide feedback</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-xl)' }}>
                <div className="card" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="section-title">Your Projects</h3>
                    <div className="flex flex-col gap-sm">
                        {clientProjects.map(p => (
                            <button
                                key={p.id}
                                onClick={() => { setActiveProject(p.id); setActiveTab(0); }}
                                style={{
                                    display: 'block',
                                    textAlign: 'left',
                                    padding: 'var(--space-md)',
                                    borderRadius: 'var(--radius-md)',
                                    border: selectedProject?.id === p.id ? '2px solid var(--teal)' : '1px solid var(--border)',
                                    background: selectedProject?.id === p.id ? 'var(--teal-bg)' : 'var(--surface)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)',
                                    width: '100%',
                                }}
                            >
                                <p style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{p.name}</p>
                                <span className={`badge ${statusBadge(p.status)}`} style={{ marginTop: 'var(--space-xs)' }}>{p.status.replace('-', ' ')}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    {selectedProject ? (
                        <>
                            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
                                <div>
                                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>{selectedProject.name}</h2>
                                    <span className={`badge ${statusBadge(selectedProject.status)}`}>{selectedProject.status.replace('-', ' ')}</span>
                                </div>
                            </div>

                            <div className="tabs" style={{ marginBottom: 'var(--space-lg)' }}>
                                {tabs.map((t, i) => (
                                    <button key={t} className={`tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
                                ))}
                            </div>

                            {activeTab === 0 && (
                                <div className="card">
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>{selectedProject.description}</p>
                                    <div className="grid-2" style={{ gap: 'var(--space-md)' }}>
                                        <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Type</span><p style={{ fontWeight: 500, textTransform: 'capitalize' }}>{selectedProject.type}</p></div>
                                        <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Rooms</span><p style={{ fontWeight: 500 }}>{selectedProject.rooms}</p></div>
                                        <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Versions</span><p style={{ fontWeight: 500 }}>{projectVersions.length}</p></div>
                                        <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Last Updated</span><p style={{ fontWeight: 500 }}>{new Date(selectedProject.updatedAt).toLocaleDateString()}</p></div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 1 && (
                                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                    <table className="data-table">
                                        <thead><tr><th>Version</th><th>Date</th><th>Notes</th><th>Status</th></tr></thead>
                                        <tbody>
                                            {projectVersions.map(v => (
                                                <tr key={v.id}>
                                                    <td style={{ fontWeight: 600 }}>v{v.versionNumber}</td>
                                                    <td style={{ color: 'var(--text-secondary)' }}>{new Date(v.createdAt).toLocaleDateString()}</td>
                                                    <td style={{ color: 'var(--text-secondary)', maxWidth: 300 }}>{v.notes}</td>
                                                    <td><span className={`badge ${statusBadge(v.approvalState)}`}>{v.approvalState.replace('-', ' ')}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 2 && (
                                <div>
                                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                                        <div className="flex gap-md">
                                            <div className="avatar avatar-teal" style={{ flexShrink: 0 }}>{client.name.split(' ').map(n => n[0]).join('')}</div>
                                            <div style={{ flex: 1 }}>
                                                <textarea className="textarea" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Leave feedback..." style={{ minHeight: 60 }} />
                                                <button className="btn btn-sm btn-primary" onClick={handleAddComment} disabled={!commentText.trim()} style={{ marginTop: 'var(--space-sm)' }}>Post</button>
                                            </div>
                                        </div>
                                    </div>
                                    {projectComments.map(c => (
                                        <div key={c.id} className="card" style={{ padding: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                                            <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--space-xs)' }}>
                                                <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{c.authorName}</span>
                                                <span className="badge badge-draft" style={{ fontSize: 10 }}>{c.authorType}</span>
                                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{c.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 3 && (
                                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                    {projectApprovals.length === 0 ? (
                                        <div className="empty-state"><p>No approvals for this project</p></div>
                                    ) : (
                                        <table className="data-table">
                                            <thead><tr><th>Version</th><th>Status</th><th>Requested</th><th>Decision</th></tr></thead>
                                            <tbody>
                                                {projectApprovals.map(a => {
                                                    const v = versions.find(ver => ver.id === a.versionId);
                                                    return (
                                                        <tr key={a.id}>
                                                            <td style={{ fontWeight: 500 }}>v{v?.versionNumber || '?'}</td>
                                                            <td><span className={`badge ${statusBadge(a.status)}`}>{a.status}</span></td>
                                                            <td style={{ color: 'var(--text-secondary)' }}>{new Date(a.requestedAt).toLocaleDateString()}</td>
                                                            <td>{a.decidedAt ? new Date(a.decidedAt).toLocaleDateString() : '–'}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="empty-state card"><p>Select a project to view details</p></div>
                    )}
                </div>
            </div>
        </div>
    );
}
