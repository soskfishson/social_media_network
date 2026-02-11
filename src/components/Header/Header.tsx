import Logo from '../../assets/logo.svg?react';
import LogoLight from '../../assets/logoLight.svg?react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import useAuth from '../../hooks/useAuth.ts';
import useTheme from '../../hooks/useTheme.ts';
import './header.css';
import { ThemeTypes } from '../../interfaces/interfaces.ts';

interface HeaderProps {
    variant?: 'default' | 'simple';
}

const Header = ({ variant = 'default' }: HeaderProps) => {
    const { isLoggedIn, user } = useAuth();
    const { theme } = useTheme();
    const renderRightSide = () => {
        if (variant === 'simple') {
            return null;
        }
        if (isLoggedIn && user) {
            return (
                <div className="header-right-side">
                    <img
                        className='header-avatar'
                        src={user.pfplink}
                        alt={`${user.name}'s profile`}
                    />
                    <span className="header-username">
                        {user.name} {user.surname}
                    </span>
                </div>
            );
        } else {
            return (
                <div className="header-right-side">
                    <a href="/signup" className="header-link">Sign Up</a>
                    <a href="/signin" className="header-link">Sign In</a>
                </div>
            );
        }
    };

    return (
        <header className={`header header-${variant}`}>
            <div className="header-logo-container">
                {theme === ThemeTypes.DARK ? <Logo /> : <LogoLight />}
            </div>
            {renderRightSide()}
            <BurgerMenu />
        </header>
    );
};

export default Header;