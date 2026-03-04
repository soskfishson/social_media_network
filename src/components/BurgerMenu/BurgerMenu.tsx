import { useState } from 'react';
import Logo from '../../assets/logo.svg?react';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import './BurgerMenu.css';
import Button from '../Button/Button';
import { ButtonType } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

const BurgerMenu = () => {
    const { isLoggedIn, user } = useAuth();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        const next = !isOpen;
        setIsOpen(next);
        document.body.style.overflow = next ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <Button
                className={`burger-button ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                type={ButtonType.BUTTON}
                data-testid="burger-button"
                aria-label={isOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
                aria-expanded={isOpen}
                aria-controls="burger-nav"
            >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </Button>

            {isOpen && <div className="burger-overlay" onClick={closeMenu} aria-hidden="true" />}

            <nav
                id="burger-nav"
                className={`burger-menu ${isOpen ? 'open' : ''}`}
                data-testid="burger-nav"
                aria-label="Mobile navigation"
                aria-hidden={!isOpen}
            >
                {isLoggedIn && user ? (
                    <>
                        <div className="burger-menu-profile">
                            <Logo />
                            <img
                                src={user.profileImage}
                                alt={t('a11y.userAvatar', { name: user.username })}
                                className="burger-profile-avatar"
                            />
                        </div>
                        <ul className="burger-menu-list" role="list">
                            <li>
                                <Link to="/profile" onClick={closeMenu}>
                                    {t('nav.profileInfo')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/statistics" onClick={closeMenu}>
                                    {t('nav.statistics')}
                                </Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <ul className="burger-menu-list" role="list">
                        <li>
                            <Link to="/signup" data-testid="burger-signup-link" onClick={closeMenu}>
                                {t('nav.signUp')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" data-testid="burger-signin-link" onClick={closeMenu}>
                                {t('nav.signIn')}
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default BurgerMenu;
