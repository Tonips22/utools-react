import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedBg from '@components/AnimatedBg.jsx';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <AnimatedBg/>
      <h1 className="text-8xl font-primary font-bold mb-4 z-10">404</h1>
      <p className="text-xl mb-6 z-10">Oops! Page not found.</p>
      <Link to="/" className="hoverable z-10 bg-dark px-4 py-2 rounded-xl group text-gray-50 hover:scale-105 active:scale-95 transit ease-in-out duration-150">
        <span
            className="hoverable text-transparent bg-clip-text bg-gradient-to-r from-light-blue via-purple to-pink bg-[length:200%_100%] bg-left group-hover:bg-right transition-[background-position] duration-200 ease-in-out"
        >
          Go Back Home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
