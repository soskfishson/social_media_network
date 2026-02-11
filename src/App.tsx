import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import ProtectedRoute from './utils/ProtectedRoute.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';
import SignInPage from './pages/SignInPage/SignInPage.tsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import { ErrorType } from './interfaces/interfaces.ts';
import './styles/colors.css';
import './styles/index.css';

const App = ()=>  {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/signin' element={<SignInPage/>} />
                <Route path='signup' element={<SignUpPage/>} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/profile' element={<ProfilePage />} />
                </Route>
                <Route path='*' element={<ErrorPage error={ErrorType.NOT_FOUND}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
