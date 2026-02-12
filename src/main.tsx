import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/tokens.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'toast-custom',
                    duration: 3000,
                    style: {
                        background: '#FFFFFF',
                        color: '#1B1B1B',
                        border: '1px solid #E7E3DD',
                    },
                }}
            />
        </BrowserRouter>
    </React.StrictMode>,
);
