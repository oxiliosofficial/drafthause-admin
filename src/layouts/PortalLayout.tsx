import { ReactNode } from 'react';
import './PortalLayout.css';

interface PortalLayoutProps {
    children: ReactNode;
}

export function PortalLayout({ children }: PortalLayoutProps) {
    return (
        <div className="portal-theme portal-layout">
            <header className="portal-header">
                <div className="portal-header-inner">
                    <div className="portal-logo">
                        <div className="portal-logo-mark">DH</div>
                        <span className="portal-logo-text">Draft Hause <span className="portal-logo-sub">Client Portal</span></span>
                    </div>
                </div>
            </header>
            <main className="portal-main">
                {children}
            </main>
            <footer className="portal-footer">
                <p>&copy; 2026 Draft Hause. All rights reserved.</p>
            </footer>
        </div>
    );
}
