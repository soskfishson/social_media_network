import { useState } from 'react';
import Logo from '../../assets/logo.svg?react';
import useAuth from '../../hooks/useAuth';
import './BurgerMenu.css';

const BurgerMenu = () => {
    const { isLoggedIn, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };
    return (
        <>
            <button
                className={`burger-button ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {isOpen && <div className="burger-overlay" onClick={closeMenu} />}

            <nav className={`burger-menu ${isOpen ? 'open' : ''}`}>
                {isLoggedIn && user ? (
                    <>
                        <div className="burger-menu-profile">
                            <Logo/>
                            <img
                                src={user.pfplink}
                                alt={user.name}
                                className="burger-profile-avatar"
                            />
                        </div>
                        <ul className="burger-menu-list">
                            <li>
                                <a href="/profile">Profile info</a>
                            </li>
                            <li>
                                <a href="/statistics">Statistics</a>
                            </li>
                        </ul>
                    </>
                ) : (
                    <ul className="burger-menu-list">
                        <li>
                            <a href="/signup">Sign up</a>
                        </li>
                        <li>
                            <a href="/signin">Sign in</a>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default BurgerMenu;