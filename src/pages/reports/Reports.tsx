import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { fakeApi } from '../../data/fakeApi';
import { HiOutlineDocumentDownload, HiOutlineDocumentText } from 'react-icons/hi';
import toast from 'react-hot-toast';

const REPORT_TYPES = [
    { id: 'project-summary', name: 'Project Summary Report', desc: 'Overview of all projects with status, versions, and key metrics', icon: '📊' },
    { id: 'client-activity', name: 'Client Activity Report', desc: 'Breakdown of client engagement and project activity', icon: '👤' },
    { id: 'designer-performance', name: 'Designer Performance Report', desc: 'Versions created, projects completed, and turnaround times', icon: '🎨' },
    { id: 'approval-audit', name: 'Approval Audit Report', desc: 'Full audit trail of all approval decisions', icon: '✅' },
    { id: 'version-history', name: 'Version History Report', desc: 'Detailed changelog of all project versions', icon: '📐' },
    { id: 'comment-analysis', name: 'Comment Analysis Report', desc: 'Summary of feedback themes and resolution rates', icon: '💬' },
];

export default function Reports() {
    const projects = useStore(s => s.projects);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState('all');
    const [dateRange, setDateRange] = useState('last-30');
    const [format, setFormat] = useState('pdf');
    const [generating, setGenerating] = useState(false);
    const [generatedReports, setGeneratedReports] = useState<Array<{ name: string; type: string; date: string; format: string }>>([]);

    const handleGenerate = async () => {
        if (!selectedType) { toast.error('Select a report type'); return; }
        setGenerating(true);
        try {
            await fakeApi.generateReport(selectedType);
            const report = REPORT_TYPES.find(r => r.id === selectedType)!;
            setGeneratedReports(prev => [{
                name: report.name, type: selectedType, date: new Date().toISOString(), format,
            }, ...prev]);
            toast.success('Report generated successfully');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Reports</h1>
                    <p className="page-subtitle">Generate and download project reports</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
                <div>
                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 className="section-title">Select Report Type</h3>
                        <div className="flex flex-col gap-sm">
                            {REPORT_TYPES.map(r => (
                                <button
                                    key={r.id}
                                    className={`card ${selectedType === r.id ? 'selected-card' : ''}`}
                                    onClick={() => setSelectedType(r.id)}
                                    style={{
                                        padding: 'var(--space-md)',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        border: selectedType === r.id ? '2px solid var(--gold)' : '1px solid var(--border)',
                                        background: selectedType === r.id ? 'var(--gold-bg)' : 'var(--surface)',
                                    }}
                                >
                                    <div className="flex items-center gap-md">
                                        <span style={{ fontSize: 22 }}>{r.icon}</span>
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{r.name}</p>
                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{r.desc}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 className="section-title">Report Options</h3>
                        <div className="flex flex-col gap-lg">
                            <div className="input-group">
                                <label>Project Scope</label>
                                <select className="select" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
                                    <option value="all">All Projects</option>
                                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Date Range</label>
                                <select className="select" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                                    <option value="last-7">Last 7 days</option>
                                    <option value="last-30">Last 30 days</option>
                                    <option value="last-90">Last 90 days</option>
                                    <option value="all-time">All time</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Format</label>
                                <select className="select" value={format} onChange={e => setFormat(e.target.value)}>
                                    <option value="pdf">PDF</option>
                                    <option value="csv">CSV</option>
                                    <option value="xlsx">Excel (XLSX)</option>
                                </select>
                            </div>
                            <button className="btn btn-primary" onClick={handleGenerate} disabled={generating || !selectedType}>
                                {generating ? (
                                    <><span className="skeleton" style={{ width: 16, height: 16, borderRadius: '50%' }} /> Generating...</>
                                ) : (
                                    <><HiOutlineDocumentDownload size={18} /> Generate Report</>
                                )}
                            </button>
                        </div>
                    </div>

                    {generatedReports.length > 0 && (
                        <div className="card">
                            <h3 className="section-title">Generated Reports</h3>
                            <div className="flex flex-col gap-sm">
                                {generatedReports.map((r, i) => (
                                    <div key={i} className="flex items-center justify-between" style={{ padding: 'var(--space-md)', background: 'var(--bg)', borderRadius: 'var(--radius-md)' }}>
                                        <div className="flex items-center gap-md">
                                            <HiOutlineDocumentText size={20} style={{ color: 'var(--gold)' }} />
                                            <div>
                                                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{r.name}</p>
                                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                                    {new Date(r.date).toLocaleTimeString()} · {r.format.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="btn btn-sm btn-ghost" onClick={() => toast.success('Download started (demo)')}>
                                            <HiOutlineDocumentDownload size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
