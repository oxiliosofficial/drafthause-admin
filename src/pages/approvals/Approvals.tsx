import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Approvals() {
    const approvals = useStore(s => s.approvals);
    const versions = useStore(s => s.versions);
    const projects = useStore(s => s.projects);
    const designers = useStore(s => s.designers);
    const updateApproval = useStore(s => s.updateApproval);
    const navigate = useNavigate();
    const [tab, setTab] = useState('pending');

    const filtered = approvals.filter(a => {
        if (tab === 'pending') return a.status === 'pending';
        if (tab === 'approved') return a.status === 'approved';
        if (tab === 'rejected') return a.status === 'rejected';
        return true;
    });

    const getProject = (vId: string) => {
        const v = versions.find(ver => ver.id === vId);
        return v ? projects.find(p => p.id === v.projectId) : null;
    };

    const getVersion = (vId: string) => versions.find(v => v.id === vId);
    const getDesigner = (vId: string) => {
        const v = versions.find(ver => ver.id === vId);
        return v ? designers.find(d => d.id === v.createdBy) : null;
    };

    const handleApprove = (id: string) => {
        updateApproval(id, { status: 'approved', decidedBy: 'Admin', decidedAt: new Date().toISOString() });
        toast.success('Approved');
    };

    const handleReject = (id: string) => {
        updateApproval(id, { status: 'rejected', decidedBy: 'Admin', decidedAt: new Date().toISOString() });
        toast.success('Rejected');
    };

    const pendingCount = approvals.filter(a => a.status === 'pending').length;
    const approvedCount = approvals.filter(a => a.status === 'approved').length;
    const rejectedCount = approvals.filter(a => a.status === 'rejected').length;

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Approvals</h1>
                    <p className="page-subtitle">{pendingCount} awaiting review</p>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-xl)' }}>
                <button className={`tab ${tab === 'pending' ? 'active' : ''}`} onClick={() => setTab('pending')}>Pending ({pendingCount})</button>
                <button className={`tab ${tab === 'approved' ? 'active' : ''}`} onClick={() => setTab('approved')}>Approved ({approvedCount})</button>
                <button className={`tab ${tab === 'rejected' ? 'active' : ''}`} onClick={() => setTab('rejected')}>Rejected ({rejectedCount})</button>
                <button className={`tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>All ({approvals.length})</button>
            </div>

            {filtered.length === 0 ? (
                <div className="empty-state card"><p>No {tab !== 'all' ? tab : ''} approvals</p></div>
            ) : (
                <div className="flex flex-col gap-md">
                    {filtered.map(a => {
                        const project = getProject(a.versionId);
                        const version = getVersion(a.versionId);
                        const designer = getDesigner(a.versionId);

                        return (
                            <div key={a.id} className="card" style={{ padding: 'var(--space-lg)' }}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-lg">
                                        <div>
                                            <div className="flex items-center gap-sm">
                                                <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, cursor: 'pointer' }}
                                                    onClick={() => project && navigate(`/projects/${project.id}`)}>
                                                    {project?.name || 'Unknown Project'}
                                                </h3>
                                                <span className="badge badge-draft">v{version?.versionNumber || '?'}</span>
                                            </div>
                                            <div className="flex items-center gap-md" style={{ marginTop: 'var(--space-xs)' }}>
                                                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                                    by {designer?.name || 'Unknown'}
                                                </span>
                                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                                    {new Date(a.requestedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                                </span>
                                            </div>
                                            {version?.notes && (
                                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-sm)', maxWidth: 550 }}>
                                                    {version.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-sm">
                                        {a.status === 'pending' ? (
                                            <>
                                                <button className="btn btn-primary btn-sm" onClick={() => handleApprove(a.id)}>
                                                    <HiOutlineCheck size={16} /> Approve
                                                </button>
                                                <button className="btn btn-destructive btn-sm" onClick={() => handleReject(a.id)}>
                                                    <HiOutlineX size={16} /> Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className={`badge ${a.status === 'approved' ? 'badge-approved' : 'badge-archived'}`}>
                                                {a.status}
                                                {a.decidedBy && ` by ${a.decidedBy}`}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
