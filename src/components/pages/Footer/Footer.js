import React from 'react';
import './Footer.css';
import MobileNavbar from './MobileNavbar';

const Footer = () => {
    return (
        <>
            <hr />              
            <footer className="footer-container">
                <div className="website-rights">
                    &copy; Copyright | Gearsoft Technologies
                </div>
            </footer>
            <MobileNavbar />
        </>
    );
}

export default Footer;
