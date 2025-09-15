import React from "react";

export const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-transparent border-r-transparent border-l-green-500 border-b-sky-500"></div>
        
        {/* Inner Ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-gray-100 rounded-full animate-spin border-t-sky-400 border-r-transparent border-b-transparent border-l-green-400" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-sky-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-6">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</p>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};
