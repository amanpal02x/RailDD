import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl md:text-2xl font-bold">
          Railways
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/divisions" className="hover:underline">Divisions</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </nav>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/home" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/divisions" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Divisions</Link>
            <Link to="/login" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
