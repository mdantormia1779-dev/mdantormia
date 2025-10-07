import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
