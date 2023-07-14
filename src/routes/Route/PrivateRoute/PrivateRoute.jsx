import { useContext, useEffect } from "react";
import useAxiosSecure from "../../../Component/AsioxSecures/useAxiosSecure";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import { Navigate, useLocation } from "react-router-dom";
import { ScaleLoader } from 'react-spinners';

const PrivateRoute = ({children}) => {
     const location=useLocation()
     const [axiosSecure] =useAxiosSecure();
     const {user,loading}=useContext(AuthContext);

      useEffect(()=>{
          axiosSecure.get(`/user/${user?.email}`).then(result=>{
            //    console.log(result);
            }).catch(error=>{
               console.log(error);
            })
      } ,[user?.email])


      

     if(loading){
          return(
            <div className=" w-full  h-screen flex justify-center items-center">
              <ScaleLoader   size={100}  color="#0389C9" /> 
          </div>
          )
    }


    if(user){
          return children
    }
    return <Navigate to={'/login'}   state={{from: location}}></Navigate>
         
     
};

export default PrivateRoute;