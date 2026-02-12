import { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineTrash, HiOutlineUpload } from 'react-icons/hi';
import toast from 'react-hot-toast';

const CATEGORIES = ['all', 'Furniture', 'Lighting', 'Flooring', 'Wall Decor', 'Textiles', 'Fixtures'];

// Fallback image if no URL provided
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800';

export default function ProductLibrary() {
    const productItems = useStore(s => s.productItems);
    const addProductItem = useStore(s => s.addProductItem);
    const deleteProductItem = useStore(s => s.deleteProductItem);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', brand: '', sku: '', category: 'Furniture', supplier: '', leadTime: '', dimensions: '', imageUrl: '' });

    const filtered = productItems.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
        const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
        return matchSearch && matchCat;
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewItem(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = () => {
        if (!newItem.name || !newItem.sku) { toast.error('Name and SKU are required'); return; }
        addProductItem({
            id: `prod-${Date.now()}`, name: newItem.name, brand: newItem.brand, sku: newItem.sku,
            category: newItem.category as any, supplier: newItem.supplier,
            leadTime: newItem.leadTime, dimensions: newItem.dimensions, sourceUrl: '', imageUrl: newItem.imageUrl,
        });
        setShowAddModal(false);
        setNewItem({ name: '', brand: '', sku: '', category: 'Furniture', supplier: '', leadTime: '', dimensions: '', imageUrl: '' });
        toast.success('Product added');
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Product Library</h1>
                    <p className="page-subtitle">{productItems.length} items across {CATEGORIES.length - 1} categories</p>
                </div>
                <div className="flex gap-sm">
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <HiOutlinePlus size={18} /> Add Product
                    </button>
                </div>
            </div>

            <div className="filter-bar">
                <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
                    <HiOutlineSearch size={18} />
                    <input className="input search-input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="tabs" style={{ margin: 0 }}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} className={`tab ${categoryFilter === cat ? 'active' : ''}`} onClick={() => setCategoryFilter(cat)}>
                            {cat === 'all' ? 'All' : cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid-3" style={{ gap: 'var(--space-lg)' }}>
                {filtered.map(item => (
                    <div key={item.id} className="card" style={{ padding: 'var(--space-lg)', position: 'relative' }}>
                        <div style={{ height: 160, background: 'var(--bg)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={item.imageUrl || PLACEHOLDER_IMAGE}
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                            />
                            <div style={{ position: 'absolute', top: 8, left: 8 }}>
                                <span className="badge badge-draft">{item.category}</span>
                            </div>
                        </div>
                        <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-xs)' }}>
                            <div>
                                <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 2 }}>{item.name}</h4>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{item.brand}</p>
                            </div>
                            <button className="btn-icon" onClick={() => { deleteProductItem(item.id); toast.success('Product removed'); }} style={{ color: 'var(--text-muted)' }}>
                                <HiOutlineTrash size={16} />
                            </button>
                        </div>
                        <div className="flex justify-between items-center" style={{ marginTop: 'var(--space-md)' }}>
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>SKU: {item.sku}</span>
                        </div>
                        {item.dimensions && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>📐 {item.dimensions}</p>}
                        {item.leadTime && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>📦 {item.leadTime}</p>}
                    </div>
                ))}
            </div>

            {filtered.length === 0 && <div className="empty-state card"><p>No products found</p></div>}

            {/* Add Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header"><h2>Add Product</h2><button className="btn-icon" onClick={() => setShowAddModal(false)}>✕</button></div>
                        <div className="modal-body">
                            <div className="grid-2" style={{ gap: 'var(--space-md)' }}>
                                <div className="input-group"><label>Product Name *</label><input className="input" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} /></div>
                                <div className="input-group"><label>Brand</label><input className="input" value={newItem.brand} onChange={e => setNewItem({ ...newItem, brand: e.target.value })} /></div>
                                <div className="input-group"><label>SKU *</label><input className="input" value={newItem.sku} onChange={e => setNewItem({ ...newItem, sku: e.target.value })} /></div>

                                <div className="input-group"><label>Category</label>
                                    <select className="select" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                                        {CATEGORIES.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="input-group"><label>Supplier</label><input className="input" value={newItem.supplier} onChange={e => setNewItem({ ...newItem, supplier: e.target.value })} /></div>
                                <div className="input-group"><label>Lead Time</label><input className="input" value={newItem.leadTime} onChange={e => setNewItem({ ...newItem, leadTime: e.target.value })} placeholder="2-4 weeks" /></div>
                                <div className="input-group"><label>Dimensions</label><input className="input" value={newItem.dimensions} onChange={e => setNewItem({ ...newItem, dimensions: e.target.value })} placeholder="80 x 40 x 45 cm" /></div>
                                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                    <label>Product Image</label>
                                    <div className="flex items-center gap-md">
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            style={{
                                                width: 80, height: 80, border: '1px dashed var(--border)',
                                                borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', background: 'var(--bg)'
                                            }}
                                        >
                                            {newItem.imageUrl ? (
                                                <img src={newItem.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <HiOutlineUpload size={20} style={{ color: 'var(--text-muted)' }} />
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <button className="btn btn-sm btn-ghost" onClick={() => fileInputRef.current?.click()}>Choose Image...</button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                            />
                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 4 }}>
                                                Upload a product image (JPG, PNG)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
