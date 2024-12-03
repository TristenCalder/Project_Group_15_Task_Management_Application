import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        navigate('/signin');
    };

    return (
        <header className="header-container">
            <div className="header-title">
                <h1>Task Management Application</h1>
                <small className="credits" style={{ float: 'right', fontSize: '0.8em' }}>
                    Developed by: Tristen Calder and Elliott Kinsley
                </small>
            </div>
            {isAuthenticated && location.pathname !== '/signin' && location.pathname !== '/signup' && (
                <nav className="nav-links">
                    <Link className="header-button" to="/profile">My Profile</Link>
                    <Link className="header-button" to="/account">Account Settings</Link>
                    <Link className="header-button" to="/tasks">Home</Link>
                    <Link className="header-button" to="/completed-tasks">Completed Tasks</Link>
                    <Link className="header-button" to="/analytics">Analytics</Link>
                    <button className="header-button logout-button" onClick={handleLogout}>Logout</button>
                </nav>
            )}
        </header>
    );
};

export default Header;