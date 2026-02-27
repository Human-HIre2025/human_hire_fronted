import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-12 h-12 border-4 border-[#a64d79] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
