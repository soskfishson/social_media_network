import { type ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    type AuthContextType,
    type LoginPayload,
    type RegisterPayload,
    ToastType,
} from '../../interfaces/interfaces';
import AuthContext from './AuthContext';
import useToast from '../../hooks/useToast';
import {
    loginThunk,
    registerThunk,
    logout as logoutAction,
    getMeThunk,
} from '../../redux/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Loader from '../../components/Loader/Loader';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useAppDispatch();
    const { addToast } = useToast();
    const { t } = useTranslation();

    const { user, accessToken, isLoading } = useAppSelector((state) => state.auth);
    const wasLoggedIn = useRef<boolean>(!!accessToken);

    useEffect(() => {
        if (wasLoggedIn.current && !accessToken) {
            addToast(t('toast.sessionExpired'), ToastType.WARNING);
        }
        wasLoggedIn.current = !!accessToken;
    }, [accessToken, addToast, t]);

    useEffect(() => {
        if (accessToken && !user) {
            dispatch(getMeThunk());
        }
    }, [dispatch, accessToken, user]);

    const login = async (payload: LoginPayload) => {
        const resultAction = await dispatch(loginThunk(payload));
        if (loginThunk.fulfilled.match(resultAction)) {
            addToast(t('toast.welcomeBack'), ToastType.SUCCESS);
        } else {
            throw new Error(resultAction.payload as string);
        }
    };

    const register = async (payload: RegisterPayload) => {
        const resultAction = await dispatch(registerThunk(payload));
        if (registerThunk.fulfilled.match(resultAction)) {
            addToast(t('toast.accountCreated'), ToastType.SUCCESS);
        } else {
            throw new Error(resultAction.payload as string);
        }
    };

    const logout = async () => {
        dispatch(logoutAction());
        addToast(t('toast.loggedOut'), ToastType.WARNING);
    };

    const value: AuthContextType = {
        user,
        accessToken,
        isLoggedIn: !!accessToken,
        isLoading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {isLoading && <Loader fullPage message={t('common.loading')} />}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
