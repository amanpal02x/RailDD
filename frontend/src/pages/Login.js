import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log and redirect
    console.log('Login attempt:', { username, password });
    navigate('/divisions');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-railway-blue">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-railway-blue text-sm md:text-base"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-railway-blue text-sm md:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-railway-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm md:text-base"
          >
            Login
          </button>
        </form>
        <p className="text-center text-xs md:text-sm text-gray-600 mt-4">
          Demo: Any credentials work for now.
        </p>
      </div>
    </div>
  );
};

export default Login;
