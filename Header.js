import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './header.css';

const Header = () => {
    const location = useLocation();
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    return (
        <header className="header-container">
            <h1>Task Management Application</h1>
            {isAuthenticated && location.pathname !== '/signin' && location.pathname !== '/signup' && (
                <nav className="nav-links">
                    <Link className="header-button" to="/profile">My
                        Profile</Link>
                    <Link className="header-button" to="/account">Account
                        Settings</Link>
                    <Link className="header-button" to="/tasks">Home</Link>
                    <Link className="header-button" to="/completed-tasks">
                        Completed Tasks</Link>
                    <Link to="/analytics" className="header-button">Analytics</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
