import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { fakeApi } from '../../data/fakeApi';
import { HiOutlineLightBulb, HiOutlineRefresh, HiOutlinePhotograph } from 'react-icons/hi';
import toast from 'react-hot-toast';

const ROOM_TYPES = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Home Office', 'Dining Room'];
const STYLES = ['Modern Minimalist', 'Scandinavian', 'Industrial Loft', 'Art Deco', 'Mid-Century Modern', 'Bohemian', 'Coastal', 'Traditional'];
const BUDGETS = ['Budget-Friendly', 'Mid-Range', 'Premium', 'Luxury'];

export default function AIRoomIdeas() {
    const aiIdeaSets = useStore(s => s.aiIdeaSets);
    const addAIIdeaSet = useStore(s => s.addAIIdeaSet);

    const [tab, setTab] = useState<'generate' | 'gallery'>('generate');
    const [roomType, setRoomType] = useState('Living Room');
    const [style, setStyle] = useState('Modern Minimalist');
    const [budget, setBudget] = useState('Mid-Range');
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);

    const handleGenerate = async (type: 'curated' | 'prompt') => {
        setGenerating(true);
        try {
            const result = await fakeApi.generateAIIdeas(type === 'curated' ? `${style} ${roomType}` : prompt);
            addAIIdeaSet({
                id: `ai-${Date.now()}`,
                prompt: type === 'curated' ? `${style} ${roomType} - ${budget}` : prompt,
                style: style,
                roomType: roomType,
                images: result,
                createdAt: new Date().toISOString(),
                savedItems: [],
            });
            toast.success('AI ideas generated!');
            setTab('gallery');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">AI Room Ideas</h1>
                    <p className="page-subtitle">Generate design inspiration powered by AI</p>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-xl)' }}>
                <button className={`tab ${tab === 'generate' ? 'active' : ''}`} onClick={() => setTab('generate')}>
                    <HiOutlineLightBulb size={16} /> Generate
                </button>
                <button className={`tab ${tab === 'gallery' ? 'active' : ''}`} onClick={() => setTab('gallery')}>
                    <HiOutlinePhotograph size={16} /> Gallery ({aiIdeaSets.length})
                </button>
            </div>

            {tab === 'generate' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                        <h3 className="section-title">Curated Generation</h3>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
                            Select room type, style, and budget for curated AI suggestions.
                        </p>
                        <div className="flex flex-col gap-lg">
                            <div className="input-group">
                                <label>Room Type</label>
                                <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                                    {ROOM_TYPES.map(r => (
                                        <button key={r} className={`btn btn-sm ${roomType === r ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRoomType(r)}>{r}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Style</label>
                                <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                                    {STYLES.map(s => (
                                        <button key={s} className={`btn btn-sm ${style === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setStyle(s)}>{s}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Budget Range</label>
                                <div className="flex gap-xs">
                                    {BUDGETS.map(b => (
                                        <button key={b} className={`btn btn-sm ${budget === b ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setBudget(b)}>{b}</button>
                                    ))}
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={() => handleGenerate('curated')} disabled={generating}>
                                {generating ? 'Generating...' : <><HiOutlineLightBulb size={18} /> Generate Ideas</>}
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                        <h3 className="section-title">Prompt-Based Generation</h3>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
                            Describe your vision in natural language for custom AI-generated concepts.
                        </p>
                        <div className="flex flex-col gap-lg">
                            <div className="input-group">
                                <label>Your Vision</label>
                                <textarea
                                    className="textarea"
                                    value={prompt}
                                    onChange={e => setPrompt(e.target.value)}
                                    placeholder="A cozy reading nook with warm wood tones, floor-to-ceiling bookshelves, and a plush armchair near a large bay window with natural light..."
                                    style={{ minHeight: 180 }}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={() => handleGenerate('prompt')} disabled={generating || !prompt.trim()}>
                                {generating ? 'Generating...' : <><HiOutlineRefresh size={18} /> Generate from Prompt</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'gallery' && (
                <div>
                    {aiIdeaSets.length === 0 ? (
                        <div className="empty-state card">
                            <p>No ideas generated yet. Generate your first set!</p>
                            <button className="btn btn-primary" onClick={() => setTab('generate')} style={{ marginTop: 'var(--space-md)' }}>
                                Generate Ideas
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-xl">
                            {aiIdeaSets.map(set => (
                                <div key={set.id} className="card" style={{ padding: 'var(--space-xl)' }}>
                                    <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
                                        <div>
                                            <h3 style={{ fontWeight: 600 }}>{set.prompt}</h3>
                                            <div className="flex items-center gap-sm" style={{ marginTop: 'var(--space-xs)' }}>
                                                <span className="badge badge-in-progress">{set.style}</span>
                                                <span className="badge badge-draft">{set.roomType}</span>
                                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                                    {new Date(set.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-4" style={{ gap: 'var(--space-md)' }}>
                                        {set.images.map((img, i) => (
                                            <div key={i} style={{
                                                aspectRatio: '4/3',
                                                background: `linear-gradient(135deg, ${['#F5E6CC', '#E8F0EF', '#FBF5EB', '#F0EBE3'][i % 4]} 0%, ${['#DEAC6B', '#0F4540', '#685841', '#1A6B63'][i % 4]}30 100%)`,
                                                borderRadius: 'var(--radius-md)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 'var(--font-size-sm)',
                                                color: 'var(--text-secondary)',
                                                fontWeight: 500,
                                            }}>
                                                Concept {i + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
