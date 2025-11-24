import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="inner">
                <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
