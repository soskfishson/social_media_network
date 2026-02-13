import Logo from '../../assets/logo.svg?react';
import LogoLight from '../../assets/logoLight.svg?react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import useAuth from '../../hooks/useAuth.ts';
import useTheme from '../../hooks/useTheme.ts';
import './header.css';
import { ThemeTypes } from '../../interfaces/interfaces.ts';
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
                <Link to='/profile' className="header-right-side-logged">
                    <img
                        className='header-avatar'
                        src={user.pfplink}
                        alt={`${user.name}'s profile`}
                    />
                    <span className="header-username">
                        {user.name} {user.surname}
                    </span>
                </Link>
            );
        } else {
            return (
                <div className="header-right-side">
                    <Link to="/signup" className="header-link">Sign Up</Link>
                    <Link to="/signin" className="header-link">Sign In</Link>
                </div>
            );
        }
    };

    return (
        <header className={`header header-${variant}`}>
            <Link to='/' className="header-logo-container">
                {theme === ThemeTypes.DARK ? <Logo /> : <LogoLight />}
            </Link>
            {renderRightSide()}
            <BurgerMenu />
        </header>
    );
};

export default Header;