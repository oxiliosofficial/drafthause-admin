import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineDotsVertical, HiOutlineTrash, HiOutlineEye, HiOutlineBan } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function DesignerList() {
    const designers = useStore(s => s.designers);
    const deleteDesigner = useStore(s => s.deleteDesigner);
    const addDesigner = useStore(s => s.addDesigner);
    const updateDesigner = useStore(s => s.updateDesigner);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [newDesigner, setNewDesigner] = useState({ name: '', email: '', phone: '', skills: '' });
    const perPage = 10;

    const filtered = designers.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()) || d.skills.join(' ').toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || d.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleAdd = () => {
        if (!newDesigner.name || !newDesigner.email) { toast.error('Name and email are required'); return; }
        addDesigner({
            id: `d-${Date.now()}`, name: newDesigner.name, email: newDesigner.email, phone: newDesigner.phone,
            status: 'active', skills: newDesigner.skills.split(',').map(s => s.trim()).filter(Boolean),
            projectsAssigned: 0, versionsCreated: 0,
            lastActivity: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString().split('T')[0],
        });
        setShowAddModal(false);
        setNewDesigner({ name: '', email: '', phone: '', skills: '' });
        toast.success('Designer created');
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Designers</h1>
                    <p className="page-subtitle">{designers.length} team members</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <HiOutlinePlus size={18} /> Add Designer
                </button>
            </div>

            <div className="filter-bar">
                <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
                    <HiOutlineSearch size={18} />
                    <input className="input search-input" placeholder="Search designers..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
                </div>
                <select className="select" style={{ width: 160 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th><th>Email</th><th>Status</th><th>Projects</th><th>Versions</th><th>Skills</th><th>Last Activity</th><th style={{ width: 50 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map(d => (
                            <tr key={d.id}>
                                <td>
                                    <div className="flex items-center gap-md">
                                        <div className="avatar avatar-bronze">{d.name.split(' ').map(n => n[0]).join('')}</div>
                                        <span style={{ fontWeight: 500 }}>{d.name}</span>
                                    </div>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{d.email}</td>
                                <td><span className={`badge ${d.status === 'active' ? 'badge-approved' : 'badge-archived'}`}>{d.status}</span></td>
                                <td>{d.projectsAssigned}</td>
                                <td>{d.versionsCreated}</td>
                                <td>
                                    <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                                        {d.skills.slice(0, 2).map(skill => (
                                            <span key={skill} className="badge badge-draft">{skill}</span>
                                        ))}
                                        {d.skills.length > 2 && <span className="badge badge-draft">+{d.skills.length - 2}</span>}
                                    </div>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{new Date(d.lastActivity).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn-icon" onClick={() => setOpenMenu(openMenu === d.id ? null : d.id)}>
                                            <HiOutlineDotsVertical size={18} />
                                        </button>
                                        {openMenu === d.id && (
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item" onClick={() => { navigate(`/designers/${d.id}`); setOpenMenu(null); }}>
                                                    <HiOutlineEye size={16} /> View
                                                </button>
                                                <button className="dropdown-item" onClick={() => {
                                                    updateDesigner(d.id, { status: d.status === 'active' ? 'inactive' : 'active' });
                                                    toast.success(`Designer ${d.status === 'active' ? 'deactivated' : 'activated'}`);
                                                    setOpenMenu(null);
                                                }}>
                                                    <HiOutlineBan size={16} /> {d.status === 'active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <div className="dropdown-divider" />
                                                <button className="dropdown-item destructive" onClick={() => { setDeleteId(d.id); setOpenMenu(null); }}>
                                                    <HiOutlineTrash size={16} /> Delete
                                                </button>
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

            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header"><h2>Add Designer</h2><button className="btn-icon" onClick={() => setShowAddModal(false)}>✕</button></div>
                        <div className="modal-body">
                            <div className="flex flex-col gap-lg">
                                <div className="input-group"><label>Full Name *</label><input className="input" value={newDesigner.name} onChange={e => setNewDesigner({ ...newDesigner, name: e.target.value })} /></div>
                                <div className="input-group"><label>Email *</label><input className="input" type="email" value={newDesigner.email} onChange={e => setNewDesigner({ ...newDesigner, email: e.target.value })} /></div>
                                <div className="input-group"><label>Phone</label><input className="input" value={newDesigner.phone} onChange={e => setNewDesigner({ ...newDesigner, phone: e.target.value })} /></div>
                                <div className="input-group"><label>Skills (comma-separated)</label><input className="input" value={newDesigner.skills} onChange={e => setNewDesigner({ ...newDesigner, skills: e.target.value })} placeholder="3D Modeling, Interior Design" /></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Create</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
                        <div className="modal-header"><h2>Delete Designer</h2><button className="btn-icon" onClick={() => setDeleteId(null)}>✕</button></div>
                        <div className="modal-body"><p>Are you sure you want to delete this designer?</p></div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                            <button className="btn btn-destructive" onClick={() => { deleteDesigner(deleteId); setDeleteId(null); toast.success('Designer deleted'); }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
