// import React from 'react';

// const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
//   const sizeClasses = {
//     small: 'w-6 h-6',
//     medium: 'w-10 h-10',
//     large: 'w-16 h-16'
//   };

//   const spinnerStyle = size === 'small' ? { width: '20px', height: '20px', borderWidth: '2px' } : 
//                        size === 'large' ? { width: '48px', height: '48px', borderWidth: '4px' } : 
//                        { width: '32px', height: '32px', borderWidth: '3px' };

//   const containerStyle = fullPage 
//     ? { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', width: '100%' }
//     : { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' };

//   return (
//     <div style={containerStyle}>
//       <div className="spinner" style={spinnerStyle}></div>
//     </div>
//   );
// };

// export default LoadingSpinner;

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
