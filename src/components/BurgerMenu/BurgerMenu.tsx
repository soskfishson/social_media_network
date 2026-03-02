import { useState } from 'react';
import Logo from '../../assets/logo.svg?react';
import useAuth from '../../hooks/useAuth';
import './BurgerMenu.css';
import Button from '../Button/Button.tsx';
import { ButtonType } from '../../interfaces/interfaces.ts';
import { Link } from 'react-router-dom';

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
            <Button
                className={`burger-button ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                type={ButtonType.BUTTON}
            >
                <span></span>
                <span></span>
                <span></span>
            </Button>

            {isOpen && <div className="burger-overlay" onClick={closeMenu} />}

            <nav className={`burger-menu ${isOpen ? 'open' : ''}`}>
                {isLoggedIn && user ? (
                    <>
                        <div className="burger-menu-profile">
                            <Logo />
                            <img
                                src={user.profileImage}
                                alt={user.username}
                                className="burger-profile-avatar"
                            />
                        </div>
                        <ul className="burger-menu-list">
                            <li>
                                <Link to="/profile">Profile info</Link>
                            </li>
                            <li>
                                <Link to="/statistics">Statistics</Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <ul className="burger-menu-list">
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                            <Link to="/signin">Sign in</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default BurgerMenu;
