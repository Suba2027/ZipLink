import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
  const sizeMap = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-14 h-14 border-4'
  };

  return (
    <div className={`flex items-center justify-center w-full ${fullPage ? 'min-h-[75vh]' : 'py-6'}`}>
      <div 
        className={`animate-spin rounded-full border-slate-700/50 border-t-cyan-400 ${sizeMap[size] || sizeMap.medium}`}
      />
    </div>
  );
};

export default LoadingSpinner;
