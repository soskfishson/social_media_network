import { renderWithProviders, screen } from '../tests/test-utils';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import type { User } from '../interfaces/interfaces';

const PrivateContent = () => <div>Private Content</div>;
const SignInPage = () => <div>Sign In Page</div>;

describe('ProtectedRoute — unauthenticated', () => {
    const renderUnauthenticated = () =>
        renderWithProviders(
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<PrivateContent />} />
                </Route>
                <Route path="/signin" element={<SignInPage />} />
            </Routes>,
            {
                authValue: { isLoggedIn: false, user: null },
                initialEntries: ['/profile'],
            },
        );

    it('redirects to /signin when user is not authenticated', async () => {
        renderUnauthenticated();
        expect(await screen.findByText('Sign In Page')).toBeInTheDocument();
    });

    it('does not render private content when not authenticated', async () => {
        renderUnauthenticated();
        expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
    });
});

describe('ProtectedRoute — authenticated', () => {
    const renderAuthenticated = () =>
        renderWithProviders(
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<PrivateContent />} />
                </Route>
                <Route path="/signin" element={<SignInPage />} />
            </Routes>,
            {
                authValue: { isLoggedIn: true, user: { id: 1 } as unknown as User },
                initialEntries: ['/profile'],
            },
        );

    it('renders private content when authenticated', () => {
        renderAuthenticated();
        expect(screen.getByText('Private Content')).toBeInTheDocument();
    });

    it('does not redirect to sign-in when authenticated', () => {
        renderAuthenticated();
        expect(screen.queryByText('Sign In Page')).not.toBeInTheDocument();
    });
});
