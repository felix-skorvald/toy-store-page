import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', background: '#f1f1f1' }}>
            <p>&copy; {new Date().getFullYear()} Toy Store. All rights reserved.</p>
            <Link to="/Login">Lägg till/Ändra på sidan</Link>
        </footer>
    );
};

export default Footer;