import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@drafthause.com' && password === 'admin123') {
            localStorage.setItem('dh-auth', 'true');
            toast.success('Welcome back, Admin!');
            navigate('/dashboard');
        } else {
            toast.error('Invalid credentials');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-md)' }}>
            <div className="card" style={{ maxWidth: 440, width: '100%', padding: 'var(--space-2xl)' }}>
                <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
                    <div style={{ margin: '0 auto var(--space-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Draft Hause" style={{ height: 48, objectFit: 'contain' }} />
                    </div>
                    <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Sign in to Admin Panel</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Draft Hause LiDAR Management System</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            placeholder="admin@drafthause.com"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: 12, fontSize: 'var(--font-size-md)', justifyContent: 'center' }}
                    >
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border)' }}>
                    <p className="text-center" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>Demo Credentials</p>
                    <div style={{ background: 'var(--bg)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-sm)', textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                        <div style={{ marginBottom: 4 }}>Email: admin@drafthause.com</div>
                        <div>Password: admin123</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
