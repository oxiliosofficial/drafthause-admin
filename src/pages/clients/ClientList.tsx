import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineSearch, HiOutlineDotsVertical, HiOutlineBan, HiOutlinePencil, HiOutlineEye, HiOutlineCheckCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ClientList() {
    const clients = useStore(s => s.clients);
    const updateClient = useStore(s => s.updateClient);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const perPage = 10;

    const filtered = clients.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleToggleStatus = (id: string, currentStatus: 'active' | 'inactive') => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        updateClient(id, { status: newStatus });
        toast.success(`Client ${newStatus === 'active' ? 'activated' : 'suspended'}`);
        setOpenMenu(null);
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Clients</h1>
                    <p className="page-subtitle">{clients.length} total clients</p>
                </div>
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
                                        {client.avatar && client.avatar.startsWith('http') ? (
                                            <img src={client.avatar} alt={client.name} className="avatar" style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div className="avatar avatar-teal">{client.name.split(' ').map(n => n[0]).join('')}</div>
                                        )}
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

                                                <div className="dropdown-divider" />
                                                <button className="dropdown-item" onClick={() => handleToggleStatus(client.id, client.status)}>
                                                    {client.status === 'active' ? <><HiOutlineBan size={16} /> Suspend Account</> : <><HiOutlineCheckCircle size={16} /> Activate Account</>}
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
        </div>
    );
}
