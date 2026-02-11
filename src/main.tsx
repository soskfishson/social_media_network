import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ToastProvider from './context/ToastContext/ToastProvider.tsx';
import ThemeProvider from './context/ThemeContext/ThemeProvider.tsx';
import AuthProvider from './context/AuthContext/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastProvider>
            <AuthProvider>
                <ThemeProvider>
                        <App />
                </ThemeProvider>
            </AuthProvider>
        </ToastProvider>
</StrictMode>,
);
