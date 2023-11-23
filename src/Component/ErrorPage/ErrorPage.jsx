// Error404.js
import React from 'react';
import './errrorpage.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
     return (
          <div className="error-container h-screen  flex justify-center items-center ">
               <div>
                    <h1>404</h1>
                    <p className=' colorPra'>Page Not Found</p>
                    <p className=' colorPra'>Oops! The page you are looking for might be in another castle.</p>

                    <div className="social-icons">
                        <Link to={'/'} href="#" target="_blank" >📘</Link>
                        <Link to={'/'} href="#" target="_blank" >📷</Link>
                        <Link to={'/'} href="#" target="_blank" >🐦</Link>
                        <Link to={'/'} href="#" target="_blank" >📺</Link>
                    </div>

                    <div className=' bg-white w-[180px] text-3xl  mt-8  mx-auto px-5 py-1 rounded-lg text-[#0389C9] font-normal '>
                         <Link to={'/'}> Home </Link>
                    </div>
               </div>
          </div>
     );
};

export default ErrorPage;
