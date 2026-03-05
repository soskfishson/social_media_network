import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import ProtectedRoute from './utils/ProtectedRoute';
import { ErrorType } from './interfaces/interfaces';
import Loader from './components/Loader/Loader';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));

const NavigationProgress = () => {
    const location = useLocation();

    useEffect(() => {
        nprogress.start();

        const timer = setTimeout(() => {
            nprogress.done();
        }, 200);

        return () => {
            clearTimeout(timer);
            nprogress.done();
        };
    }, [location]);

    return null;
};

const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <NavigationProgress />

            <Suspense fallback={<Loader fullPage size="large" message="Downloading assets..." />}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                    <Route path="*" element={<ErrorPage error={ErrorType.NOT_FOUND} />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
