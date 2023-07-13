import { useContext, useEffect } from "react";
import useAxiosSecure from "../../../Component/AsioxSecures/useAxiosSecure";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import { Link, Navigate, useLocation } from "react-router-dom";


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
          return <p className=" h-[100vh] w-full flex gap-2 items-center justify-center "> Loading... </p>
    }


    if(user){
          return children
    }
    return <Navigate to={'/login'}   state={{from: location}}></Navigate>
         
     
};

export default PrivateRoute;