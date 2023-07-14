import React from 'react';

const NotFound = ({text}) => {
     return (
          <div className='  flex justify-center items-center  h-[40vh] '>
                <h1 className=' text-blue-400 text-3xl font-bold '> {text} </h1>
          </div>
     );
};

export default NotFound;