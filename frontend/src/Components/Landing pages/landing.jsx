import React from 'react';

const Landing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-r from-blue-500 to-teal-500 overflow-auto">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Vanakkam Mowa 👋</h1>
        <p className="text-gray-600 text-lg">Welcome to your landing page! 🚀</p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;