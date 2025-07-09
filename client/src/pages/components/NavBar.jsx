import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Appointment', path: '/appointment' },
    { name: 'Diet Planner', path: '/diet' },
    { name: 'Health Analytics', path: '/analytics' },
    { name: 'Medicine Tracker', path: '/medicine' },
    { name: 'Patient Dashboard', path: '/dashboard' },
    { name: 'Symptom Checker', path: '/symptom' },
    { name: 'Telemedicine', path: '/telemedicine' },
  ];

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-md relative z-10">
      
      {/* Left: Logo */}
      <div className="text-xl font-bold text-indigo-300">
        <Link to="/">MedConnect360</Link>
      </div>

      {/* Center: Full links on large screens */}
      <div className="hidden md:flex flex-1 justify-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-indigo-300 transition duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right: Hamburger + Login */}
      <div className="flex items-center space-x-4">
        {/* Hamburger always visible */}
        <button
          onClick={toggleMenu}
          className="text-white hover:text-indigo-300 focus:outline-none"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Login */}
        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md transition duration-300"
        >
          Login
        </Link>
      </div>

      {/* Hamburger Dropdown for small screens only */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full right-0 mt-2 w-64 bg-gray-700 rounded-md shadow-lg py-2 z-20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 hover:bg-gray-600 text-white text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
