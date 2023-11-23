import { CgProfile } from "react-icons/cg";
import Container from "../../Component/Container/Container";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { useContext, useState } from 'react';

import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
     const [loading, setLoading] = useState(false)
     const [upload, setUpload] = useState(false)
     const [imgloading, setImageLoading] = useState(false)
     const [image, setImage] = useState("");
     const navigate = useNavigate();
     const { createUser, updateUserProfile, verifyUser } = useContext(AuthContext);
     const { register, handleSubmit, formState: { errors } } = useForm();

     // onSubmit

     const onSubmit = data => {
          setLoading(true)
          const name = data.fistName + " " + data.lastName;
          const userInfo = { name, email: data.email, image };
          createUser(data?.email, data?.password).then(result => {
               const user = result.user;
               updateUserProfile(name, image).then(result => {
                    console.log(result);
               }).catch(error => {
                    console.log(error);
               })
               if(user) {
                    fetch('https://banglabook-server.vercel.app/users', {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify(userInfo),
                    }).then((res) => res.json()).then(data => {
                         verifyUser()
                         if (data.insertedId) {
                              setLoading(false)
                              navigate('/')
                         }
                    })
               }

          }).catch(error => {
               console.log(error);
               setLoading(false)

          })

     }
     // handleimage 
     const handleimage = (event) => {
          const selectedImage = event.target.files[0];
          setImageLoading(true)
          const Imagebb_URL = `https://api.imgbb.com/1/upload?key=c7cb5be9cc288736ed86ddfa73d22e32`
          const formData = new FormData();
          formData.append('image', selectedImage);
          fetch(Imagebb_URL, {
               method: "POST",
               body: formData
          }).then(res => res.json()).then(data => {
               if (data?.data?.display_url) {
                    setUpload(true)
                    setImage(data?.data?.display_url)
                    setImageLoading(false)
               }
          })
     }

     return (
          <div className=" bg-[#F0F2F5] min-h-screen p-4 flex justify-center items-center">
               <Container>
                    <div>
                         <div className="w-full ">
                              <div className="hero-content w-full flex-col lg:flex-row-reverse">
                                   <div className="text-center lg:text-left">
                                        <h1 className="text-5xl font-bold text-blue-500">Banglabook</h1>
                                        <p className="py-6 text-black  text-xl ">  Banglabook helps you connect and share with the people in your life.</p>
                                   </div>
                                   <div className=" flex-shrink-0 w-full max-w-sm shadow-2xl ">

                                        <div>
                                             <form onSubmit={handleSubmit(onSubmit)}>
                                                  <div className=" p-4 rounded-2xl w-full">
                                                       <div className="form-control mt-2 ">
                                                            <label htmlFor="fistName" className=" block text-gray-700 text-sm font-bold mb-2">  FirstName:</label>
                                                            <input  {...register("fistName", { required: true })} className="w-full bg-white  text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" type="text" placeholder="  First Name" name="fistName" id="" />
                                                            {errors.name && <span className="text-red-500"> First Name is required</span>}
                                                       </div>
                                                       <div className="form-control mt-2 ">
                                                            <label htmlFor="Last Name" className=" block text-gray-700 text-sm font-bold mb-2">  Last Name:</label>
                                                            <input  {...register("lastName", { required: true })} className="w-full bg-white  text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" type="text" placeholder="  last Name" name="lastName" id="" />
                                                            {errors.name && <span className="text-red-500"> Last Name is required</span>}
                                                       </div>


                                                       <div className="form-control mt-2">
                                                            <label htmlFor="email" className=" block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                                            <input  {...register("email", { required: true })} className="w-full bg-white  text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" type="text" placeholder="email" name="email" id="" />
                                                            {errors.email && <span className="text-red-500"> valid email </span>}
                                                       </div>
                                                       <div className="form-control mt-2">
                                                            <label htmlFor="password" className=" block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                                            <input  {...register("password", { required: true })} className="w-full bg-white  text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" type="text" placeholder="password" name="password" id="" />
                                                            {errors.email && <span className="text-red-500"> password is required    </span>}
                                                       </div>

                                                       <div className=" flex justify-center items-center">

                                                            {
                                                                 imgloading == true ? <p className=" text-xl font-semibold text-blue-500"> Please waiting..  </p> : <div>
                                                                      {
                                                                           upload == true ? <><img className=" mt-4 h-[200px] w-[200px] rounded-full   border border-blue-500" src={image} alt="" /> </> :
                                                                                <div>
                                                                                     <div>
                                                                                          <label htmlFor="profile"> Profile upload</label>
                                                                                     </div>
                                                                                     <label htmlFor="file-upload" >
                                                                                          <div className=' p-4  cursor-pointer md:p-7'>
                                                                                               <CgProfile className='  text-blue-600' size={40}></CgProfile>
                                                                                          </div>
                                                                                          <input onChange={handleimage} accept="image/*" type="file" name="" id="file-upload" className=' hidden' />
                                                                                     </label>
                                                                                </div>
                                                                      }
                                                                 </div>
                                                            }


                                                       </div>
                                                       <div className="form-control  mt-6">

                                                            {
                                                                 loading ? <TbFidgetSpinner className='m-auto animate-spin' size={24} /> : <button disabled={!upload} type="submit" className=" bg-blue-500 text-white py-2 px-4 text-center mx-auto text-xl rounded-lg w-full">Register</button>
                                                            }

                                                       </div>
                                                  </div>
                                             </form>

                                             <p className=" py-2 text-xl font-medium my-2 text-center"> Already registered? <Link to={'/login'} className=" text-blue-400"> Go to log in </Link> </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </Container>

          </div>
     );
};

export default Register;