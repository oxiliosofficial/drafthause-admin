import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineExternalLink, HiOutlineTrash } from 'react-icons/hi';
import { fakeApi } from '../../data/fakeApi';
import toast from 'react-hot-toast';

const CATEGORIES = ['all', 'Furniture', 'Lighting', 'Flooring', 'Wall Decor', 'Textiles', 'Fixtures'];

export default function ProductLibrary() {
    const productItems = useStore(s => s.productItems);
    const addProductItem = useStore(s => s.addProductItem);
    const deleteProductItem = useStore(s => s.deleteProductItem);

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importUrl, setImportUrl] = useState('');
    const [importing, setImporting] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', brand: '', sku: '', price: '', category: 'Furniture', supplier: '', leadTime: '', dimensions: '' });

    const filtered = productItems.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
        const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
        return matchSearch && matchCat;
    });

    const handleAdd = () => {
        if (!newItem.name || !newItem.sku) { toast.error('Name and SKU are required'); return; }
        addProductItem({
            id: `prod-${Date.now()}`, name: newItem.name, brand: newItem.brand, sku: newItem.sku,
            price: parseFloat(newItem.price) || 0, category: newItem.category as any, supplier: newItem.supplier,
            leadTime: newItem.leadTime, dimensions: newItem.dimensions, sourceUrl: '',
        });
        setShowAddModal(false);
        setNewItem({ name: '', brand: '', sku: '', price: '', category: 'Furniture', supplier: '', leadTime: '', dimensions: '' });
        toast.success('Product added');
    };

    const handleImport = async () => {
        if (!importUrl.trim()) { toast.error('Enter a URL'); return; }
        setImporting(true);
        try {
            const data = await fakeApi.scrapeProductUrl(importUrl);
            addProductItem({
                id: `prod-import-${Date.now()}`, name: data.name, brand: data.brand, sku: data.sku,
                price: data.price, category: 'Furniture', supplier: 'Imported', leadTime: '4-6 weeks',
                dimensions: '80 x 40 x 45 cm', sourceUrl: importUrl,
            });
            setShowImportModal(false);
            setImportUrl('');
            toast.success(`Imported: ${data.name}`);
        } finally {
            setImporting(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Product Library</h1>
                    <p className="page-subtitle">{productItems.length} items across {CATEGORIES.length - 1} categories</p>
                </div>
                <div className="flex gap-sm">
                    <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>
                        <HiOutlineExternalLink size={18} /> Import from URL
                    </button>
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
                        <div style={{ height: 140, background: 'var(--bg)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 40, opacity: 0.3 }}>📦</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-xs)' }}>
                            <span className="badge badge-draft">{item.category}</span>
                            <button className="btn-icon" onClick={() => { deleteProductItem(item.id); toast.success('Product removed'); }} style={{ color: 'var(--text-muted)' }}>
                                <HiOutlineTrash size={16} />
                            </button>
                        </div>
                        <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>{item.name}</h4>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{item.brand}</p>
                        <div className="flex justify-between items-center" style={{ marginTop: 'var(--space-md)' }}>
                            <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>${item.price.toLocaleString()}</span>
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
                                <div className="input-group"><label>Price</label><input className="input" type="number" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} /></div>
                                <div className="input-group"><label>Category</label>
                                    <select className="select" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                                        {CATEGORIES.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="input-group"><label>Supplier</label><input className="input" value={newItem.supplier} onChange={e => setNewItem({ ...newItem, supplier: e.target.value })} /></div>
                                <div className="input-group"><label>Lead Time</label><input className="input" value={newItem.leadTime} onChange={e => setNewItem({ ...newItem, leadTime: e.target.value })} placeholder="2-4 weeks" /></div>
                                <div className="input-group"><label>Dimensions</label><input className="input" value={newItem.dimensions} onChange={e => setNewItem({ ...newItem, dimensions: e.target.value })} placeholder="80 x 40 x 45 cm" /></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Import Modal */}
            {showImportModal && (
                <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
                        <div className="modal-header"><h2>Import from URL</h2><button className="btn-icon" onClick={() => setShowImportModal(false)}>✕</button></div>
                        <div className="modal-body">
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
                                Paste a product URL from a furniture retailer to automatically import product details.
                            </p>
                            <div className="input-group">
                                <label>Product URL</label>
                                <input className="input" value={importUrl} onChange={e => setImportUrl(e.target.value)} placeholder="https://store.com/product/..." />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowImportModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleImport} disabled={importing}>
                                {importing ? 'Importing...' : 'Import Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
