import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import { Navigate, useLocation } from "react-router-dom";
import { ScaleLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {

 const { user, loading } = useContext(AuthContext);
      

      if (loading) {
            return (
                  <div className=" w-full  h-screen flex justify-center items-center">
                        <ScaleLoader size={100} color="#0389C9" />
                  </div>
            )
      } 


    

   

      if(user) {
            return children
      }


      return <Navigate to={'/login'}  ></Navigate>




};

export default PrivateRoute;