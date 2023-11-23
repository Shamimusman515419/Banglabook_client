import { useContext, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authprovider/Authprovider';

const axiosSecure = axios.create({
     baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
     const { LogOut } = useContext(AuthContext)
     const navigate = useNavigate(); 

     useEffect(() => {
          const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
               const token = localStorage.getItem('access-token');
               if (token) { 
                    config.headers.Authorization = `Bearer ${token}`;
               }
               return config;
          });

          const responseInterceptor = axiosSecure.interceptors.response.use(
               (response) => response,
               async (error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                         await LogOut();
                         navigate('/login');
                    }
                    return Promise.reject(error);
               }
          );

          return () => {
               axiosSecure.interceptors.request.eject(requestInterceptor);
               axiosSecure.interceptors.response.eject(responseInterceptor);
          };
     }, [LogOut, navigate,axiosSecure]);

     return [axiosSecure];
};

export default useAxiosSecure;