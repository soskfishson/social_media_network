import { useState, useEffect, useCallback, type ReactNode } from 'react';
import ThemeContext from './ThemeContext';
import { ThemeTypes } from '../../interfaces/interfaces';

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const getInitialTheme = (): ThemeTypes => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === ThemeTypes.DARK || savedTheme === ThemeTypes.LIGHT) {
            return savedTheme;
        }
        return ThemeTypes.DARK;
    };

    const [theme, setThemeState] = useState<ThemeTypes>(getInitialTheme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme.toLowerCase());
    }, [theme]);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT;
        setThemeState(newTheme);
    }, [theme]);

    const setTheme = useCallback((newTheme: ThemeTypes) => {
        setThemeState(newTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;