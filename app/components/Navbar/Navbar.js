import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Edcno</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="/login" className="navbar-btn">Login</a>
    </nav>
  );
};

export default Navbar;
