import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineDotsVertical, HiOutlineTrash, HiOutlinePencil, HiOutlineEye } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ClientList() {
    const clients = useStore(s => s.clients);
    const deleteClient = useStore(s => s.deleteClient);
    const addClient = useStore(s => s.addClient);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', company: '' });
    const perPage = 10;

    const filtered = clients.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleAdd = () => {
        if (!newClient.name || !newClient.email) { toast.error('Name and email are required'); return; }
        addClient({
            id: `c-${Date.now()}`, ...newClient, status: 'active', projectCount: 0,
            createdAt: new Date().toISOString().split('T')[0], lastActivity: new Date().toISOString().split('T')[0],
        });
        setShowAddModal(false);
        setNewClient({ name: '', email: '', phone: '', company: '' });
        toast.success('Client created successfully');
    };

    const handleDelete = () => {
        if (deleteId) {
            deleteClient(deleteId);
            setDeleteId(null);
            toast.success('Client deleted');
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Clients</h1>
                    <p className="page-subtitle">{clients.length} total clients</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <HiOutlinePlus size={18} /> Add Client
                </button>
            </div>

            <div className="filter-bar">
                <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
                    <HiOutlineSearch size={18} />
                    <input className="input search-input" placeholder="Search clients..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
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
                            <th>Name</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Projects</th>
                            <th>Last Activity</th>
                            <th style={{ width: 50 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map(client => (
                            <tr key={client.id}>
                                <td>
                                    <div className="flex items-center gap-md">
                                        <div className="avatar avatar-teal">{client.name.split(' ').map(n => n[0]).join('')}</div>
                                        <span style={{ fontWeight: 500 }}>{client.name}</span>
                                    </div>
                                </td>
                                <td>{client.company}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{client.email}</td>
                                <td><span className={`badge ${client.status === 'active' ? 'badge-approved' : 'badge-archived'}`}>{client.status}</span></td>
                                <td>{client.projectCount}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{new Date(client.lastActivity).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn-icon" onClick={() => setOpenMenu(openMenu === client.id ? null : client.id)}>
                                            <HiOutlineDotsVertical size={18} />
                                        </button>
                                        {openMenu === client.id && (
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item" onClick={() => { navigate(`/clients/${client.id}`); setOpenMenu(null); }}>
                                                    <HiOutlineEye size={16} /> View
                                                </button>
                                                <button className="dropdown-item" onClick={() => { navigate(`/clients/${client.id}`); setOpenMenu(null); }}>
                                                    <HiOutlinePencil size={16} /> Edit
                                                </button>
                                                <div className="dropdown-divider" />
                                                <button className="dropdown-item destructive" onClick={() => { setDeleteId(client.id); setOpenMenu(null); }}>
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

            {/* Add Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Client</h2>
                            <button className="btn-icon" onClick={() => setShowAddModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="flex flex-col gap-lg">
                                <div className="input-group">
                                    <label>Full Name *</label>
                                    <input className="input" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} placeholder="John Smith" />
                                </div>
                                <div className="input-group">
                                    <label>Email *</label>
                                    <input className="input" type="email" value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} placeholder="john@example.com" />
                                </div>
                                <div className="input-group">
                                    <label>Phone</label>
                                    <input className="input" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} placeholder="+1-555-0000" />
                                </div>
                                <div className="input-group">
                                    <label>Company</label>
                                    <input className="input" value={newClient.company} onChange={e => setNewClient({ ...newClient, company: e.target.value })} placeholder="Company Name" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Create Client</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
                        <div className="modal-header">
                            <h2>Delete Client</h2>
                            <button className="btn-icon" onClick={() => setDeleteId(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this client? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                            <button className="btn btn-destructive" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
