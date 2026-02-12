import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export default function PortalLogin() {
    const clients = useStore(s => s.clients);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const client = clients.find(c => c.email.toLowerCase() === email.toLowerCase());
        if (client) {
            navigate(`/portal/${client.id}`);
        } else {
            setError('No client found with that email. Try: sarah@mitchell-interiors.com');
        }
    };

    return (
        <div style={{ maxWidth: 460, margin: '60px auto', textAlign: 'center' }}>
            <div className="card" style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ marginBottom: 'var(--space-xl)' }}>
                    <div className="avatar avatar-teal" style={{ width: 56, height: 56, fontSize: 20, margin: '0 auto var(--space-md)' }}>DH</div>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>Client Portal Login</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-xs)' }}>
                        Enter your email to view your projects
                    </p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group" style={{ textAlign: 'left', marginBottom: 'var(--space-lg)' }}>
                        <label>Email Address</label>
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setError(''); }}
                            placeholder="your@email.com"
                            required
                        />
                        {error && <span style={{ color: 'var(--error)', fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-xs)' }}>{error}</span>}
                    </div>
                    <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                        Access Portal
                    </button>
                </form>
                <div style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-md)', background: 'var(--teal-bg)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--teal)' }}>
                        <strong>Demo:</strong> Try logging in with <code>sarah@mitchell-interiors.com</code>
                    </p>
                </div>
            </div>
        </div>
    );
}
