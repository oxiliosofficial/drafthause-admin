import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineDotsVertical, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ProjectList() {
    const projects = useStore(s => s.projects);
    const clients = useStore(s => s.clients);
    const designers = useStore(s => s.designers);
    const deleteProject = useStore(s => s.deleteProject);
    const updateProject = useStore(s => s.updateProject);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [clientFilter, setClientFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const perPage = 10;

    const filtered = projects.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || p.status === statusFilter;
        const matchClient = clientFilter === 'all' || p.clientId === clientFilter;
        const matchType = typeFilter === 'all' || p.type === typeFilter;
        return matchSearch && matchStatus && matchClient && matchType;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const getClientName = (id: string) => clients.find(c => c.id === id)?.name || 'Unknown';
    const getDesignerName = (id: string) => designers.find(d => d.id === id)?.name || 'Unknown';

    const statusBadge = (s: string) => {
        const m: Record<string, string> = { 'draft': 'badge-draft', 'in-progress': 'badge-in-progress', 'needs-review': 'badge-needs-review', 'approved': 'badge-approved', 'archived': 'badge-archived' };
        return m[s] || 'badge-draft';
    };

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const selectAll = () => setSelectedIds(selectedIds.length === paged.length ? [] : paged.map(p => p.id));

    const handleBulkStatusChange = (status: string) => {
        selectedIds.forEach(id => updateProject(id, { status: status as any }));
        toast.success(`Updated ${selectedIds.length} projects`);
        setSelectedIds([]);
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Projects</h1>
                    <p className="page-subtitle">{projects.length} total projects</p>
                </div>
                <button className="btn btn-primary" onClick={() => toast.success('Create project flow (demo)')}>
                    <HiOutlinePlus size={18} /> Create Project
                </button>
            </div>

            <div className="filter-bar">
                <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 320 }}>
                    <HiOutlineSearch size={18} />
                    <input className="input search-input" placeholder="Search projects..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>
                <select className="select" style={{ width: 150 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="in-progress">In Progress</option>
                    <option value="needs-review">Needs Review</option>
                    <option value="approved">Approved</option>
                    <option value="archived">Archived</option>
                </select>
                <select className="select" style={{ width: 150 }} value={clientFilter} onChange={e => { setClientFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Clients</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <select className="select" style={{ width: 140 }} value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                </select>
            </div>

            {selectedIds.length > 0 && (
                <div className="flex items-center gap-md" style={{ marginBottom: 'var(--space-md)', padding: 'var(--space-md)', background: 'var(--gold-bg)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{selectedIds.length} selected</span>
                    <button className="btn btn-sm btn-ghost" onClick={() => handleBulkStatusChange('in-progress')}>Set In Progress</button>
                    <button className="btn btn-sm btn-ghost" onClick={() => handleBulkStatusChange('archived')}>Archive</button>
                    <button className="btn btn-sm btn-ghost" onClick={() => toast.success('Export summary (demo)')}>Export Summary</button>
                </div>
            )}

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: 40 }}><input type="checkbox" className="checkbox" checked={selectedIds.length === paged.length && paged.length > 0} onChange={selectAll} /></th>
                            <th>Project</th><th>Client</th><th>Designer</th><th>Type</th><th>Status</th><th>Rooms</th><th>Versions</th><th>Updated</th><th style={{ width: 50 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map(p => (
                            <tr key={p.id}>
                                <td><input type="checkbox" className="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                                <td style={{ fontWeight: 500, cursor: 'pointer' }} onClick={() => navigate(`/projects/${p.id}`)}>{p.name}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{getClientName(p.clientId)}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{getDesignerName(p.primaryDesignerId)}</td>
                                <td style={{ textTransform: 'capitalize' }}>{p.type}</td>
                                <td><span className={`badge ${statusBadge(p.status)}`}>{p.status.replace('-', ' ')}</span></td>
                                <td>{p.rooms}</td>
                                <td>{p.versions}</td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>{new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn-icon" onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)}><HiOutlineDotsVertical size={18} /></button>
                                        {openMenu === p.id && (
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item" onClick={() => { navigate(`/projects/${p.id}`); setOpenMenu(null); }}><HiOutlineEye size={16} /> View</button>
                                                <div className="dropdown-divider" />
                                                <button className="dropdown-item destructive" onClick={() => { setDeleteId(p.id); setOpenMenu(null); }}><HiOutlineTrash size={16} /> Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination" style={{ padding: '12px 16px' }}>
                    <span className="pagination-info">Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}</span>
                    <div className="pagination-controls">
                        <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                        ))}
                        <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>›</button>
                    </div>
                </div>
            </div>

            {deleteId && (
                <div className="modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
                        <div className="modal-header"><h2>Delete Project</h2><button className="btn-icon" onClick={() => setDeleteId(null)}>✕</button></div>
                        <div className="modal-body"><p>Are you sure you want to delete this project? This action cannot be undone.</p></div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                            <button className="btn btn-destructive" onClick={() => { deleteProject(deleteId); setDeleteId(null); toast.success('Project deleted'); }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
