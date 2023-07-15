import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import toast, { Toaster } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";


const Login = () => {
     const { Login } = useContext(AuthContext);
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false)
     const handleSubmit = (e) => {
          e.preventDefault();
          setLoading(true)
          const from = e.target;
          const email = from.email.value;
          const password = from.password.value;
          console.log(email, password);
          Login(email, password).then((userCredential) => {
               // Signed in 
               const user = userCredential.user;
               navigate('/')
             })
             .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
             });
     }

     return (
          <div>
               <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                         <div>
                              <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
                                   Log in to Banglabook
                              </h2>
                              <form onSubmit={(e) => handleSubmit(e)}>
                                   <div className="mb-4">
                                        <label
                                             htmlFor="email"
                                             className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                             Email
                                        </label>
                                        <input
                                             type="email"
                                             id="email"
                                             name="email"
                                             className="w-full px-3 bg-white text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                             placeholder="Enter your email"
                                        />
                                   </div>
                                   <div className="mb-6">
                                        <label
                                             htmlFor="password"
                                             className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                             Password
                                        </label>
                                        <input
                                             type="password"
                                             id="password"
                                             name="password"
                                             className="w-full bg-white  text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                             placeholder="Enter your password"
                                        />
                                   </div>
                                   <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                   >
                                        Log In
                                   </button>
                                   <p className="text-center text-sm mt-4">
                                        <a
                                             href="#"
                                             className="text-blue-500 hover:text-blue-700 underline"
                                        >
                                             Forgot password?
                                        </a>
                                   </p>
                              </form>
                              <div className="divider"></div>
                              {
                                   loading ? <TbFidgetSpinner></TbFidgetSpinner> : <Link to={'/register'} className=" mx-auto block  rounded-xl text-2xl bg-[#106fd4] px-6 py-2 text-white text-center w-full ">
                                        create account
                                   </Link>
                              }

                              <Toaster
                                   position="top-center"
                                   reverseOrder={false}
                              />
                         </div>
                    </div>
               </div>

          </div>
     );
};

export default Login;