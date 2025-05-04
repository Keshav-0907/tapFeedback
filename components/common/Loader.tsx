import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
