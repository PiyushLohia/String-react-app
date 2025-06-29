import React from 'react';
import loadingGif from '../assets/loading.gif';

const Loader = () => {
  return (
        <div className='h-screen w-full flex items-center justify-center flex-col bg-slate-400 backdrop-filter backdrop-blur-md'>

      <div className=" flex items-center justify-center bg-gray">
      <img
        className="h-64 w-64 object-contain"
        src={loadingGif}
        alt=""
        />
    </div>
    <h1 className=' text-white text-xl'>LOADING....</h1>
        </div>
  );
};

export default Loader;
