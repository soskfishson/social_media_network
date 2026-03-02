import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import ThemeContext from './ThemeContext';
import { ThemeTypes } from '../../interfaces/interfaces';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const getInitialTheme = (): ThemeTypes => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme as ThemeTypes) || ThemeTypes.DARK;
    };

    const [theme, setThemeState] = useState<ThemeTypes>(getInitialTheme);

    const muiTheme = useMemo(() => {
        const isDark = theme === ThemeTypes.DARK;

        return createTheme({
            palette: {
                mode: isDark ? 'dark' : 'light',
                primary: {
                    main: '#7A44FF',
                },
                background: {
                    default: isDark ? '#0E1223' : '#FFFFFF',
                    paper: isDark ? '#0E1223' : '#FFFFFF',
                },
                text: {
                    primary: isDark ? '#FFFFFF' : '#000000',
                    secondary: isDark ? '#8791B7' : '#667085',
                },
                divider: isDark ? '#384162' : '#E0E2E7',
            },
            typography: {
                fontFamily: "'Inter', sans-serif",
            },
        });
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme.toLowerCase());
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT));
    }, []);

    const setTheme = useCallback((newTheme: ThemeTypes) => {
        setThemeState(newTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            <MUIThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
