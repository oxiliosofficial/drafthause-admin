import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineSearch, HiOutlineDotsVertical, HiOutlineEye, HiOutlineBan, HiOutlineCheckCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function DesignerList() {
    const designers = useStore(s => s.designers);
    const updateDesigner = useStore(s => s.updateDesigner);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const perPage = 10;

    const filtered = designers.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()) || d.skills.join(' ').toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || d.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Designers</h1>
                    <p className="page-subtitle">{designers.length} team members</p>
                </div>
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
                    <option value="pending">Pending Approval</option>
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
                                        {d.avatar && d.avatar.startsWith('http') ? (
                                            <img src={d.avatar} alt={d.name} className="avatar" style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div className="avatar avatar-bronze">{d.name.split(' ').map(n => n[0]).join('')}</div>
                                        )}
                                        <span style={{ fontWeight: 500 }}>{d.name}</span>
                                    </div>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{d.email}</td>
                                <td>
                                    <span className={`badge ${d.status === 'active' ? 'badge-approved' : d.status === 'pending' ? 'badge-needs-review' : 'badge-archived'}`}>
                                        {d.status === 'pending' ? 'Pending Approval' : d.status}
                                    </span>
                                </td>
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
                                                {d.status === 'pending' ? (
                                                    <button className="dropdown-item" onClick={() => {
                                                        updateDesigner(d.id, { status: 'active' });
                                                        toast.success(`Designer approved and activated`);
                                                        setOpenMenu(null);
                                                    }}>
                                                        <HiOutlineCheckCircle size={16} /> Approve Account
                                                    </button>
                                                ) : (
                                                    <button className="dropdown-item" onClick={() => {
                                                        updateDesigner(d.id, { status: d.status === 'active' ? 'inactive' : 'active' });
                                                        toast.success(`Designer ${d.status === 'active' ? 'suspended' : 'activated'}`);
                                                        setOpenMenu(null);
                                                    }}>
                                                        {d.status === 'active' ? <><HiOutlineBan size={16} /> Suspend Account</> : <><HiOutlineCheckCircle size={16} /> Activate Account</>}
                                                    </button>
                                                )}
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
