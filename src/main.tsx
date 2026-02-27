import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { startMockingSocial } from '@sidekick-monorepo/internship-backend';
import App from './App';
import ToastProvider from './context/ToastContext/ToastProvider';
import ThemeProvider from './context/ThemeContext/ThemeProvider';
import AuthProvider from './context/AuthContext/AuthProvider';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setupInterceptors } from './api/api';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './styles/colors.css';
import './styles/index.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
        },
    },
});

async function enableMocking() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isE2E = (window as any).Cypress;
    if (!isE2E) {
        await startMockingSocial('');
    }
}

setupInterceptors(store);

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider>
                        <AuthProvider>
                            <ThemeProvider>
                                <App />
                            </ThemeProvider>
                        </AuthProvider>
                    </ToastProvider>
                </QueryClientProvider>
            </Provider>
        </StrictMode>,
    );
});
