import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const settings = useStore(s => s.settings);
    const updateSettings = useStore(s => s.updateSettings);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-subtitle">Manage your application preferences</p>
                </div>
            </div>

            <div style={{ maxWidth: 700 }}>
                <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                    <h3 className="section-title">Company Information</h3>
                    <div className="flex flex-col gap-lg">
                        <div className="input-group">
                            <label>Company Name</label>
                            <input className="input" value={settings.companyName} onChange={e => updateSettings({ companyName: e.target.value })} />
                        </div>
                        <div className="grid-2" style={{ gap: 'var(--space-md)' }}>

                            <div className="input-group">
                                <label>Measurement Unit</label>
                                <select className="select" value={settings.measurementUnit} onChange={e => updateSettings({ measurementUnit: e.target.value as 'metric' | 'imperial' })}>
                                    <option value="metric">Metric (m, cm)</option>
                                    <option value="imperial">Imperial (ft, in)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 
                <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                    <h3 className="section-title">Appearance</h3>
                    <div className="flex flex-col gap-lg">
                        <div className="input-group">
                            <label>Theme</label>
                            <select className="select" value={settings.theme} onChange={e => updateSettings({ theme: e.target.value as 'light' | 'dark' })}>
                                <option value="light">Light</option>
                                <option value="dark">Dark (coming soon)</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Language</label>
                            <select className="select" value={settings.language} onChange={e => updateSettings({ language: e.target.value })}>
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                    <h3 className="section-title">Notifications</h3>
                    <div className="flex flex-col gap-md">
                        {[
                            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email alerts for important events' },
                            { key: 'desktopNotifications', label: 'Desktop Notifications', desc: 'Push notifications in your browser' },
                            { key: 'approvalReminders', label: 'Approval Reminders', desc: 'Get reminders for pending approvals' },
                            { key: 'commentNotifications', label: 'Comment Notifications', desc: 'Notify when new comments are posted' },
                        ].map(n => (
                            <div key={n.key} className="flex items-center justify-between" style={{ padding: 'var(--space-md) 0', borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <p style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{n.label}</p>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{n.desc}</p>
                                </div>
                                <button
                                    className={`toggle-switch ${(settings as any)[n.key] ? 'active' : ''}`}
                                    onClick={() => updateSettings({ [n.key]: !(settings as any)[n.key] })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                    <h3 className="section-title">Default Export Settings</h3>
                    <div className="flex flex-col gap-lg">
                        <div className="input-group">
                            <label>Default Export Format</label>
                            <select className="select" value={settings.defaultExportFormat} onChange={e => updateSettings({ defaultExportFormat: e.target.value })}>
                                <option value="pdf">PDF</option>
                                <option value="dwg">DWG (AutoCAD)</option>
                                <option value="obj">OBJ (3D Model)</option>
                                <option value="glb">GLB (3D Binary)</option>
                                <option value="fbx">FBX</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Auto-Report Generation</label>
                            <div className="flex items-center gap-md">
                                <button
                                    className={`toggle-switch ${settings.autoSaveInterval > 0 ? 'active' : ''}`}
                                    onClick={() => updateSettings({ autoSaveInterval: settings.autoSaveInterval > 0 ? 0 : 5 })}
                                />
                                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                    {settings.autoSaveInterval > 0 ? `Every ${settings.autoSaveInterval} minutes` : 'Disabled'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                    <h3 className="section-title">Portal Settings</h3>
                    <div className="flex flex-col gap-md">
                        <div className="flex items-center justify-between" style={{ padding: 'var(--space-md) 0', borderBottom: '1px solid var(--border)' }}>
                            <div>
                                <p style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>Client Portal Access</p>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Allow clients to log in and view their projects</p>
                            </div>
                            <button
                                className={`toggle-switch ${settings.portalEnabled ? 'active' : ''}`}
                                onClick={() => updateSettings({ portalEnabled: !settings.portalEnabled })}
                            />
                        </div>
                        <div className="flex items-center justify-between" style={{ padding: 'var(--space-md) 0' }}>
                            <div>
                                <p style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>Allow Client Commenting</p>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Clients can leave comments on versions</p>
                            </div>
                            <button
                                className={`toggle-switch ${settings.clientCommenting ? 'active' : ''}`}
                                onClick={() => updateSettings({ clientCommenting: !settings.clientCommenting })}
                            />
                        </div>
                    </div>
                </div>
                */}

                <button className="btn btn-primary" onClick={() => toast.success('Settings saved successfully')}>
                    Save Settings
                </button>
            </div>
        </div>
    );
}
