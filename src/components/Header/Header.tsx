import Logo from '../../assets/logo.svg?react';
import LogoLight from '../../assets/logoLight.svg?react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import './header.css';
import { ThemeTypes } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

interface HeaderProps {
    variant?: 'default' | 'simple';
}

const Header = ({ variant = 'default' }: HeaderProps) => {
    const { isLoggedIn, user } = useAuth();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const renderRightSide = () => {
        if (variant === 'simple') {
            return (
                <div className="header-right-side">
                    <LanguageSwitcher />
                </div>
            );
        }
        if (isLoggedIn && user) {
            return (
                <div className="header-right-side header-right-side--logged-wrapper">
                    <LanguageSwitcher />
                    <Link
                        to="/profile"
                        className="header-right-side-logged"
                        aria-label={t('a11y.userAvatar', { name: user.username })}
                    >
                        <img
                            className="header-avatar"
                            src={user.profileImage}
                            alt={t('a11y.userAvatar', { name: user.username })}
                        />
                        <span className="header-username" aria-hidden="true">
                            {user.firstName} {user.secondName}
                        </span>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="header-right-side">
                    <LanguageSwitcher />
                    <Link to="/signup" className="header-link" data-testid="signup-link">
                        {t('nav.signUp')}
                    </Link>
                    <Link to="/signin" className="header-link" data-testid="signin-link">
                        {t('nav.signIn')}
                    </Link>
                </div>
            );
        }
    };

    return (
        <header className={`header header-${variant}`} role="banner">
            <Link to="/" className="header-logo-container" aria-label={t('a11y.logoHome')}>
                {theme === ThemeTypes.DARK ? (
                    <Logo aria-hidden="true" />
                ) : (
                    <LogoLight aria-hidden="true" />
                )}
            </Link>
            {renderRightSide()}
            <BurgerMenu />
        </header>
    );
};

export default Header;
