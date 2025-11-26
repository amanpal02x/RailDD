import React from 'react';
import { Link } from 'react-router-dom';

const Divisions = () => {
  const divisions = [
    {
      name: 'Bilaspur',
      description: 'Manage operations and services in Bilaspur division.',
      icon: '🚂',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Raipur',
      description: 'Handle logistics and connectivity in Raipur area.',
      icon: '🛤️',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Nagpur',
      description: 'Oversee infrastructure and traffic in Nagpur zone.',
      icon: '⚡',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="min-h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: 'url("/image.png")' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-blue-900/20"></div>
      <div className="relative z-10 w-full py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white drop-shadow-2xl">Select Division</h1>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {divisions.map((division, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col items-center text-center border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${division.color} rounded-full flex items-center justify-center mb-4`}>
                  <span className="text-xl md:text-2xl">{division.icon}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-railway-blue mb-2">{division.name}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">{division.description}</p>
                <div className="w-12 h-1 md:w-16 bg-yellow-300 mb-4"></div>
                <Link
                  to={`/${division.name.toLowerCase()}`}
                  className="bg-railway-blue hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg transition duration-300 shadow-md text-center block text-sm md:text-base"
                >
                  Explore {division.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divisions;
