import Logo from '../../assets/logo.svg?react';
import LogoLight from '../../assets/logoLight.svg?react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import './header.css';
import { ThemeTypes } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

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
                <Link to="/profile" className="header-right-side-logged">
                    <img
                        className="header-avatar"
                        src={user.profileImage}
                        alt={`${user.username}'s profile`}
                    />
                    <span className="header-username">
                        {user.firstName} {user.secondName}
                    </span>
                </Link>
            );
        } else {
            return (
                <div className="header-right-side">
                    <Link to="/signup" className="header-link" data-testid="signup-link">
                        Sign Up
                    </Link>
                    <Link to="/signin" className="header-link" data-testid="signin-link">
                        Sign In
                    </Link>
                </div>
            );
        }
    };

    return (
        <header className={`header header-${variant}`}>
            <Link to="/" className="header-logo-container">
                {theme === ThemeTypes.DARK ? <Logo /> : <LogoLight />}
            </Link>
            {renderRightSide()}
            <BurgerMenu />
        </header>
    );
};

export default Header;
