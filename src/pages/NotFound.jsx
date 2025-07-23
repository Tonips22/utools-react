import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedBg from '@components/AnimatedBg.jsx';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <AnimatedBg/>
      <h1 className="text-8xl font-primary mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link to="/" className="hoverable text-gray-50 hover:scale-105 active:scale-95 transit ease-in-out duration-150">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
