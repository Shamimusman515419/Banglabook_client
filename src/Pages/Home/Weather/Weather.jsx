import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const API_KEY = '4f11a68a3cb5cae77560d129eaa5e71a'; // Replace with your OpenWeatherMap API key

const Weather = () => {
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



     return (
          <div className="container mx-auto p-4 bg-[#11A1E6] text-white">
               <h1 className="text-5xl font-bold mb-4  text-center my-3">Weather </h1>

               {error && <p className="text-red-500 mb-4">{error}</p>}
               {weatherData && (
                    <div>
                    <div className=' flex items-center justify-around'>
                         <p className="mb-2 text-4xl font-semibold my-3"> {weatherData.main.temp} °C</p>
                         <div className=' bg-[#3CB0E8] text-xl px-2 py-1 rounded-md '>
                              {
                                   moment().format("h:mm: a")
                              }

                         </div>
                     </div>
                     <div className=' text-base my-2'>
                          {moment().format("[Today is] dddd") }
                     </div>
                     <div>
                         {moment().format("dddd, MMMM Do YYYY, [Bangladesh]")}
                     </div>
                    </div>
               )}
          </div>
     );
};

export default Weather;
