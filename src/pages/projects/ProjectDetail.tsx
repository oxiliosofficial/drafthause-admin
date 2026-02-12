import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineArrowLeft, HiOutlineEye, HiOutlineScale, HiOutlineCheck, HiOutlineX, HiOutlineDownload } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './ProjectDetail.css';

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const projects = useStore(s => s.projects);
    const clients = useStore(s => s.clients);
    const designers = useStore(s => s.designers);
    const versions = useStore(s => s.versions);
    const comments = useStore(s => s.comments);
    const exportFiles = useStore(s => s.exportFiles);
    const activityEvents = useStore(s => s.activityEvents);
    const addComment = useStore(s => s.addComment);
    const updateComment = useStore(s => s.updateComment);
    const updateVersion = useStore(s => s.updateVersion);

    const [activeTab, setActiveTab] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [commentFilter, setCommentFilter] = useState('all');

    const project = projects.find(p => p.id === id);
    if (!project) return <div className="empty-state"><p>Project not found</p></div>;

    const client = clients.find(c => c.id === project.clientId);
    const primaryDesigner = designers.find(d => d.id === project.primaryDesignerId);
    const supportingDesigners = designers.filter(d => project.supportingDesignerIds.includes(d.id));
    const projectVersions = versions.filter(v => v.projectId === project.id).sort((a, b) => b.versionNumber - a.versionNumber);
    const projectComments = comments.filter(c => c.projectId === project.id);
    const projectExports = exportFiles.filter(e => e.projectId === project.id);
    const projectActivity = activityEvents.filter(e => e.projectId === project.id).slice(0, 15);

    const filteredComments = projectComments.filter(c => commentFilter === 'all' || c.status === commentFilter);

    const statusBadge = (s: string) => {
        const m: Record<string, string> = { 'draft': 'badge-draft', 'in-progress': 'badge-in-progress', 'needs-review': 'badge-needs-review', 'approved': 'badge-approved', 'archived': 'badge-archived', 'pending': 'badge-needs-review', 'changes-requested': 'badge-draft' };
        return m[s] || 'badge-draft';
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        addComment({
            id: `comment-new-${Date.now()}`, projectId: project.id, versionId: projectVersions[0]?.id || '',
            authorId: 'admin', authorType: 'admin', authorName: 'Admin',
            content: commentText, status: 'open', createdAt: new Date().toISOString(),
        });
        setCommentText('');
        toast.success('Comment added');
    };

    const handleApprove = (versionId: string) => {
        updateVersion(versionId, { approvalState: 'approved', approvedBy: 'admin', approvedAt: new Date().toISOString().split('T')[0] });
        toast.success('Version approved');
    };

    const handleRequestChanges = (versionId: string) => {
        updateVersion(versionId, { approvalState: 'changes-requested' });
        toast.success('Changes requested');
    };

    const tabs = ['Overview', 'Versions', 'Files & Exports', 'Comments', 'Activity Log'];

    return (
        <div>
            <button className="btn btn-ghost" onClick={() => navigate('/projects')} style={{ marginBottom: 'var(--space-lg)' }}>
                <HiOutlineArrowLeft size={18} /> Back to Projects
            </button>

            <div className="page-header">
                <div>
                    <h1 className="page-title">{project.name}</h1>
                    <div className="flex items-center gap-md" style={{ marginTop: 'var(--space-xs)' }}>
                        <span className={`badge ${statusBadge(project.status)}`}>{project.status.replace('-', ' ')}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{project.type} · {project.rooms} rooms</span>
                    </div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-xl)' }}>
                {tabs.map((tab, i) => (
                    <button key={tab} className={`tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{tab}</button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 0 && (
                <div className="grid-3" style={{ gap: 'var(--space-lg)' }}>
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <h3 className="section-title">Project Details</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>{project.description}</p>
                        <div className="grid-2" style={{ gap: 'var(--space-lg)' }}>
                            <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Client</span><p style={{ fontWeight: 500 }}>{client?.name}</p></div>
                            <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Location</span><p style={{ fontWeight: 500 }}>{project.location.city}, {project.location.state}</p></div>
                            <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Created</span><p style={{ fontWeight: 500 }}>{new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
                            <div><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Last Updated</span><p style={{ fontWeight: 500 }}>{new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
                        </div>
                        <div style={{ marginTop: 'var(--space-lg)' }}>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Tags</span>
                            <div className="flex gap-xs" style={{ marginTop: 'var(--space-xs)', flexWrap: 'wrap' }}>
                                {project.tags.map(t => <span key={t} className="badge badge-draft">{t}</span>)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 className="section-title">Team</h3>
                            <div className="flex items-center gap-md" style={{ marginBottom: 'var(--space-md)' }}>
                                <div className="avatar avatar-bronze">{primaryDesigner?.name.split(' ').map(n => n[0]).join('')}</div>
                                <div><p style={{ fontWeight: 500 }}>{primaryDesigner?.name}</p><span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Primary Designer</span></div>
                            </div>
                            {supportingDesigners.map(d => (
                                <div key={d.id} className="flex items-center gap-md" style={{ marginBottom: 'var(--space-sm)' }}>
                                    <div className="avatar avatar-teal" style={{ width: 28, height: 28, fontSize: 11 }}>{d.name.split(' ').map(n => n[0]).join('')}</div>
                                    <div><p style={{ fontSize: 'var(--font-size-sm)' }}>{d.name}</p><span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Supporting</span></div>
                                </div>
                            ))}
                        </div>
                        <div className="card">
                            <h3 className="section-title">Latest Version</h3>
                            {projectVersions[0] && (
                                <div>
                                    <p style={{ fontWeight: 500 }}>Version {projectVersions[0].versionNumber}</p>
                                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-xs)' }}>{projectVersions[0].notes}</p>
                                    <span className={`badge ${statusBadge(projectVersions[0].approvalState)}`} style={{ marginTop: 'var(--space-sm)' }}>
                                        {projectVersions[0].approvalState.replace('-', ' ')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Versions Tab */}
            {activeTab === 1 && (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Version</th><th>Created By</th><th>Date</th><th>Notes</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {projectVersions.map(v => {
                                const des = designers.find(d => d.id === v.createdBy);
                                return (
                                    <tr key={v.id}>
                                        <td style={{ fontWeight: 600 }}>v{v.versionNumber}</td>
                                        <td>{des?.name || 'Unknown'}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{new Date(v.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        <td style={{ maxWidth: 280, color: 'var(--text-secondary)' }}><span className="truncate" style={{ display: 'block' }}>{v.notes}</span></td>
                                        <td><span className={`badge ${statusBadge(v.approvalState)}`}>{v.approvalState.replace('-', ' ')}</span></td>
                                        <td>
                                            <div className="flex gap-xs">
                                                <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/projects/${project.id}/versions/${v.id}`)}><HiOutlineEye size={14} /> View</button>
                                                {v.approvalState === 'pending' && (
                                                    <>
                                                        <button className="btn btn-sm btn-primary" onClick={() => handleApprove(v.id)}><HiOutlineCheck size={14} /></button>
                                                        <button className="btn btn-sm btn-destructive" onClick={() => handleRequestChanges(v.id)}><HiOutlineX size={14} /></button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Files & Exports Tab */}
            {activeTab === 2 && (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {projectExports.length === 0 ? (
                        <div className="empty-state"><p>No exports yet</p></div>
                    ) : (
                        <table className="data-table">
                            <thead><tr><th>Filename</th><th>Type</th><th>Size</th><th>Generated By</th><th>Date</th><th>Action</th></tr></thead>
                            <tbody>
                                {projectExports.map(e => (
                                    <tr key={e.id}>
                                        <td style={{ fontWeight: 500 }}>{e.filename}</td>
                                        <td><span className="badge badge-draft">{e.type.toUpperCase()}</span></td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{(e.fileSize / 1000).toFixed(1)} MB</td>
                                        <td>{e.generatedBy}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                        <td><button className="btn btn-sm btn-ghost" onClick={() => toast.success('Download started (simulated)')}><HiOutlineDownload size={14} /> Download</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Comments Tab */}
            {activeTab === 3 && (
                <div>
                    <div className="flex items-center gap-md" style={{ marginBottom: 'var(--space-lg)' }}>
                        <select className="select" style={{ width: 160 }} value={commentFilter} onChange={e => setCommentFilter(e.target.value)}>
                            <option value="all">All Comments</option>
                            <option value="open">Open</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>{filteredComments.length} comments</span>
                    </div>

                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <div className="flex gap-md">
                            <div className="avatar avatar-gold" style={{ flexShrink: 0 }}>A</div>
                            <div style={{ flex: 1 }}>
                                <textarea className="textarea" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." style={{ minHeight: 60 }} />
                                <div className="flex justify-between items-center" style={{ marginTop: 'var(--space-sm)' }}>
                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Supports optional 3D coordinate pins</span>
                                    <button className="btn btn-sm btn-primary" onClick={handleAddComment} disabled={!commentText.trim()}>Post Comment</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-md">
                        {filteredComments.map(c => (
                            <div key={c.id} className="card" style={{ padding: 'var(--space-lg)' }}>
                                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-sm)' }}>
                                    <div className="flex items-center gap-sm">
                                        <div className="avatar avatar-teal" style={{ width: 28, height: 28, fontSize: 10 }}>{c.authorName.split(' ').map(n => n[0]).join('')}</div>
                                        <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{c.authorName}</span>
                                        <span className="badge badge-draft" style={{ fontSize: 10 }}>{c.authorType}</span>
                                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                            {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-sm">
                                        <span className={`badge ${c.status === 'open' ? 'badge-open' : 'badge-resolved'}`}>{c.status}</span>
                                        {c.status === 'open' && (
                                            <button className="btn btn-sm btn-ghost" onClick={() => { updateComment(c.id, { status: 'resolved', resolvedAt: new Date().toISOString() }); toast.success('Comment resolved'); }}>Resolve</button>
                                        )}
                                    </div>
                                </div>
                                <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--text-primary)' }}>{c.content}</p>
                                {c.coordinate && (
                                    <div style={{ marginTop: 'var(--space-sm)', padding: 'var(--space-xs) var(--space-sm)', background: 'var(--teal-bg)', borderRadius: 'var(--radius-sm)', display: 'inline-block' }}>
                                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--teal)' }}>📍 3D Pin: ({c.coordinate.x.toFixed(1)}, {c.coordinate.y.toFixed(1)}, {c.coordinate.z.toFixed(1)})</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Activity Log Tab */}
            {activeTab === 4 && (
                <div className="card">
                    <div className="flex flex-col">
                        {projectActivity.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No activity yet</p>
                        ) : projectActivity.map(e => (
                            <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--border)' }}>
                                <div className="flex items-center gap-md">
                                    <span style={{ fontSize: 16 }}>
                                        {e.type === 'version-created' ? '📐' : e.type === 'comment-added' ? '💬' : e.type === 'approval-changed' ? '✅' : e.type === 'export-generated' ? '📄' : e.type === 'client-portal-view' ? '👁️' : '📋'}
                                    </span>
                                    <div>
                                        <p style={{ fontSize: 'var(--font-size-sm)' }}>{e.description}</p>
                                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{e.actor}</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                    {new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
