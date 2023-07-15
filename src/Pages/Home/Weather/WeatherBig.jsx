import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import animationData from '../../../assets/weather.json'
const API_KEY = '4f11a68a3cb5cae77560d129eaa5e71a'; // Replace with your OpenWeatherMap API key
import Lottie from 'react-lottie';
const WeatherBig = () => {
     const [city, setCity] = useState('Bangladesh');
     const [weatherData, setWeatherData] = useState(null);
     const [error, setError] = useState(null);

     const handleInputChange = (event) => {
          setCity(event.target.value);
     };

     useEffect(() => {
          if (city.trim() !== '') {
               axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
                    .then((response) => {
                         setWeatherData(response.data);
                         setError(null);
                    })
                    .catch((error) => {
                         console.error(error);
                         setWeatherData(null);
                         setError('Failed to Not Found');
                    });
          }
     }, [city]);


     const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
               preserveAspectRatio: "xMidYMid slice"
          }
     };
     return (
          <div className='flex justify-center items-center  h-screen md:h-[90vh]'>


               <div className="container mx-auto p-4 bg-[#11A1E6] w-screen  text-white">
               <h1 className="  text-2xl  md:text-8xl font-bold mb-4  text-center my-3 ">Weather </h1>
                    <div className=' flex justify-center items-center  '>
                         <div className=' w-full p-2   md:w-[400px]  md:h-[400px]  h-[40vh] '>
                         <Lottie
                              options={defaultOptions}
                              
                              
                         />
                         </div>

                    </div>
                    <div>
                       

                         {error && <p className="text-red-500 mb-4">{error}</p>}
                         {weatherData && (
                              <div>
                                   <div className=' flex items-center justify-around'>
                                        <p className="mb-2 text-2xl  md:text-6xl font-semibold my-3"> {weatherData.main.temp} °C</p>
                                        <div className=' bg-[#3CB0E8] text-xl  md:text-2xl px-2 py-1 rounded-md '>
                                             {
                                                  moment().format("h:mm: a")
                                             }

                                        </div>
                                   </div>
                                   <div className=' text-center text-base md:text-xl my-2'>
                                        {moment().format("[Today is] dddd")}
                                   </div>
                                   <div className=' text-center text-base md:text-xl my-2'>
                                        {moment().format("dddd, MMMM Do YYYY, [Bangladesh]")}
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default WeatherBig;
