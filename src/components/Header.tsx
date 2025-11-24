import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

type CProps = {
    title?: string;
}

const Header = ({title} : CProps) => {
    return (
        <header className="header">
            <div className="inner">
                <h1 className="logo">
                    <Link to="/">MyApp</Link>
                </h1>

                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
