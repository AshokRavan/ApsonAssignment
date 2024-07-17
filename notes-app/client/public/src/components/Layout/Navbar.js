import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">My Notes App</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/notes" className="nav-link">Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/notes/new" className="nav-link">New Note</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/notes/trash" className="nav-link">Trash</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
