import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Environment, Grid } from '@react-three/drei';
import { useState, Suspense } from 'react';
import './VersionViewer.css';

function RoomMesh() {
    return (
        <group>
            {/* Floor */}
            <Box args={[8, 0.1, 6]} position={[0, -0.05, 0]}>
                <meshStandardMaterial color="#E8E0D4" />
            </Box>
            {/* Walls */}
            <Box args={[8, 3, 0.1]} position={[0, 1.5, -3]}>
                <meshStandardMaterial color="#F5F0E8" />
            </Box>
            <Box args={[0.1, 3, 6]} position={[-4, 1.5, 0]}>
                <meshStandardMaterial color="#F0EBE3" />
            </Box>
            <Box args={[0.1, 3, 6]} position={[4, 1.5, 0]}>
                <meshStandardMaterial color="#F0EBE3" />
            </Box>
            {/* Furniture placeholder */}
            <Box args={[2, 0.8, 1.2]} position={[0, 0.4, -1]}>
                <meshStandardMaterial color="#DEAC6B" />
            </Box>
            <Box args={[0.6, 1, 0.6]} position={[-2.5, 0.5, 1.5]}>
                <meshStandardMaterial color="#685841" />
            </Box>
            <Box args={[1.4, 0.4, 0.8]} position={[2, 0.2, 1.5]}>
                <meshStandardMaterial color="#8A7A65" />
            </Box>
        </group>
    );
}

export default function VersionViewer() {
    const { id, versionId } = useParams();
    const navigate = useNavigate();
    const versions = useStore(s => s.versions);
    const projects = useStore(s => s.projects);
    const comments = useStore(s => s.comments);

    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

    const project = projects.find(p => p.id === id);
    const version = versions.find(v => v.id === versionId);
    const versionComments = comments.filter(c => c.versionId === versionId);

    if (!project || !version) return <div className="empty-state"><p>Version not found</p></div>;

    return (
        <div className="version-viewer">
            <div className="version-viewer-header">
                <button className="btn btn-ghost" onClick={() => navigate(`/projects/${id}`)}>
                    <HiOutlineArrowLeft size={18} /> {project.name}
                </button>
                <div className="flex items-center gap-md">
                    <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Version {version.versionNumber}</h2>
                    <span className={`badge badge-${version.approvalState === 'approved' ? 'approved' : version.approvalState === 'pending' ? 'needs-review' : 'draft'}`}>
                        {version.approvalState.replace('-', ' ')}
                    </span>
                </div>
                <div className="tabs" style={{ margin: 0 }}>
                    <button className={`tab ${viewMode === '3d' ? 'active' : ''}`} onClick={() => setViewMode('3d')}>3D View</button>
                    <button className={`tab ${viewMode === '2d' ? 'active' : ''}`} onClick={() => setViewMode('2d')}>2D Plan</button>
                </div>
            </div>

            <div className="version-viewer-body">
                <div className="version-viewer-canvas">
                    {viewMode === '3d' ? (
                        <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.6} />
                                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                                <RoomMesh />
                                <Grid infiniteGrid fadeDistance={20} cellColor="#E7E3DD" sectionColor="#D4CFC7" />
                                <OrbitControls enableDamping dampingFactor={0.05} />
                                <Environment preset="apartment" />
                            </Suspense>
                        </Canvas>
                    ) : (
                        <div className="version-viewer-2d">
                            <div className="floor-plan-grid">
                                <div className="room-label" style={{ gridColumn: '1 / 4', gridRow: '1 / 3', background: '#F5E6CC' }}>
                                    <span>Living Room</span>
                                </div>
                                <div className="room-label" style={{ gridColumn: '4 / 6', gridRow: '1 / 2', background: '#E8F0EF' }}>
                                    <span>Kitchen</span>
                                </div>
                                <div className="room-label" style={{ gridColumn: '4 / 6', gridRow: '2 / 3', background: '#FBF5EB' }}>
                                    <span>Dining</span>
                                </div>
                                <div className="room-label" style={{ gridColumn: '1 / 3', gridRow: '3 / 4', background: '#F0EBE3' }}>
                                    <span>Bedroom</span>
                                </div>
                                <div className="room-label" style={{ gridColumn: '3 / 5', gridRow: '3 / 4', background: '#E8E8E8' }}>
                                    <span>Bath</span>
                                </div>
                                <div className="room-label" style={{ gridColumn: '5 / 6', gridRow: '3 / 4', background: '#FDEDED' }}>
                                    <span>Closet</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="version-viewer-sidebar">
                    <div className="card">
                        <h3 className="section-title">Version Info</h3>
                        <div className="flex flex-col gap-sm" style={{ fontSize: 'var(--font-size-sm)' }}>
                            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Version</span><span style={{ fontWeight: 500 }}>{version.versionNumber}</span></div>
                            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Created</span><span style={{ fontWeight: 500 }}>{new Date(version.createdAt).toLocaleDateString()}</span></div>
                            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>File Size</span><span style={{ fontWeight: 500 }}>{(version.fileSize / 1024).toFixed(1)} MB</span></div>
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-md)', lineHeight: 1.5 }}>{version.notes}</p>
                    </div>

                    <div className="card" style={{ marginTop: 'var(--space-md)' }}>
                        <h3 className="section-title">Comments ({versionComments.length})</h3>
                        <div className="flex flex-col gap-sm">
                            {versionComments.slice(0, 6).map(c => (
                                <div key={c.id} style={{ padding: 'var(--space-sm)', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                                    <div className="flex items-center gap-xs" style={{ marginBottom: 2 }}>
                                        <span style={{ fontWeight: 500, fontSize: 'var(--font-size-xs)' }}>{c.authorName}</span>
                                        <span className={`badge ${c.status === 'open' ? 'badge-open' : 'badge-resolved'}`} style={{ fontSize: 9, padding: '1px 6px' }}>{c.status}</span>
                                    </div>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{c.content.slice(0, 100)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
