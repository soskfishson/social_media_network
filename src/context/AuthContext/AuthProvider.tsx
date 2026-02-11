import { type ReactNode, useState } from 'react';
import {
    type AuthContextType,
    type LoginPayload,
    type RegisterPayload,
    ToastType,
    type User,
} from '../../interfaces/interfaces.ts';
import { mockUserData } from '../../mockData/mockData.ts';
import AuthContext from './AuthContext';
import useToast from '../../hooks/useToast.ts';

const generateMockToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { addToast } = useToast();
    const [accessToken, setAccessToken] = useState<string | null>(() =>
        localStorage.getItem('accessToken')
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(() =>
        localStorage.getItem('refreshToken')
    );

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async ({ email, password }: LoginPayload): Promise<void> => {
        setIsLoading(true);

        if (email === mockUserData.email && password === mockUserData.password) {
            const newAccessToken = generateMockToken();
            const newRefreshToken = generateMockToken();

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            setUser(mockUserData);

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            localStorage.setItem('user', JSON.stringify(mockUserData));

        } else {
            new Error('Неверный email или пароль');
        }
        setIsLoading(false);
    };

    const register = async (data: RegisterPayload): Promise<void> => {
        setIsLoading(true);

        const newUser: User = {
            ...data,
            description: '',
            pfplink: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + data.name
        };

        const newAccessToken = generateMockToken();
        const newRefreshToken = generateMockToken();

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setUser(newUser);

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        addToast('You are logged out!', ToastType.WARNING)
    };

    const value: AuthContextType = {
        user,
        accessToken,
        refreshToken,
        isLoggedIn: !!accessToken,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;