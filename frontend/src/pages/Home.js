import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="min-h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: 'url("/penta-sathwik-l6t1ixFldOo-unsplash.jpg")' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-blue-900/20"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">Welcome to Railways Portal</h1>
        <p className="text-xl md:text-2xl mb-10 drop-shadow-lg">Manage your railway operations efficiently with our modern platform</p>
        <Link to="/login" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full shadow-2xl transition duration-300 text-xl font-semibold drop-shadow-2xl">
          Login
        </Link>
      </div>
    </main>
  );
};

export default Home;
