import { useContext, useState } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { FiMoreHorizontal } from "react-icons/fi";

import { AiFillCamera, AiFillEdit } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const Profile = () => {
     const [axiosSecure] = useAxiosSecure();

     const { user, updateProfilePhoto } = useContext(AuthContext);
     const [showModal, setShowModal] = useState(false);
     const [open, setOpen] = useState(false);
     const [imageLoading, setImageLoading] = useState(false);
     const [image, setImage] = useState(false);
     const [CoverPhoto, setCoverPhoto] = useState("");

     const { data, refetch, isLoading } = useQuery({
          queryKey: ['user'],
          queryFn: () => axiosSecure(`/user/${user?.email}`)
     })

     const userData = data?.data;

     console.log(userData);
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
                    setImage(data?.data?.display_url)
                    setImageLoading(false)
               }
          })
     }

     const name = user?.displayName;
     const updateProfile = () => {
          updateProfilePhoto(name, image).then(result => {
               console.log(result);
               setShowModal(false)
          }).catch(error => {
               console.log(error);
          })
     }


     const handleCoverphoto = (event) => {
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
                    setCoverPhoto(data?.data?.display_url)
                    setImageLoading(false)
               }
          })
     }

     const changeCoverPhoto = () => {
          axiosSecure.patch(`/users/${userData?._id}`, { CoverPhoto }).then(result => {
                   console.log(result);
               if (result) {
                    setOpen(false)
               }


          }).catch(error => {
               console.log(error.massage);
          })
     }

     return (
          <div className=" w-full md:mr-10 mr-1 md:px-20 md:-mt-10 ">
               <div>
                    <div className="">

                         <div className=" md:mt-3 -mt-8  relative ">
                              <div className="  relative ">
                                  {
                                    userData?.Cover ?  <img className=" relative  rounded-md w-full h-[40vh] " src={userData?.Cover} alt="" /> : <img className=" relative  rounded-md w-full h-[40vh] " src="https://img.freepik.com/free-vector/3d-social-media-background_52683-29718.jpg?w=1380&t=st=1689308805~exp=1689309405~hmac=b1beec3c098f47820dde6ca055cc98ee70e085269d7bba91c37dbd7029b5bca9" alt="" /> 
                                  }
                                   <button onClick={() => setOpen(true)} className=" absolute  right-2 text-lg  font-normal bg-[#D8DADF] px-3   bottom-2  py-1 rounded-md "> Change Cover Photo</button>
                              </div>


                              <div className=" px-8 md:flex justify-between ">
                                   <div className=" text-center md:flex gap-4  ">
                                        <div className=" relative ">
                                             <img className='    mx-auto border-2 border-white -mt-8 relative h-32 w-32 rounded-full object-cover' src={user?.photoURL} alt="" />
                                             <AiFillCamera onClick={() => setShowModal(true)} size={24} className="   absolute bottom-0 right-1 border border-white rounded-full cursor-pointer   text-blue-500"></AiFillCamera>
                                        </div>

                                        <div className=" mt-2">
                                             <h1 className='relative uppercase font-semibold text-black  text-2xl'>{user?.displayName}</h1>
                                             <p className=" text-lg">  <NavLink>1.2K followers </NavLink> •  <NavLink>151 following</NavLink> </p>
                                        </div>
                                   </div>
                                   <div>
                                        <div className="  text-center cursor-pointer flex gap-1 w-18 mt-3 h-10 items-center justify-center text-xl bg-[#1A6ED8] text-white p-2 px-4 rounded-lg">
                                             <div className=" ">
                                                  <AiFillEdit size={18}></AiFillEdit>
                                             </div>
                                             Edit
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div>

                         </div>
                    </div>
                    <hr className=" my-2 border" />

                    <div className=" flex items-center justify-between">
                         <div className=" flex  items-center  flex-wrap gap-4 md:gap-6">
                              <NavLink to={'/profile/post'} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Post</NavLink>
                              <NavLink className={"text-lg font-medium"}>About</NavLink>
                              <NavLink to={'/profile/photo'} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Photo</NavLink>
                              <NavLink to={'video'} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Video</NavLink>
                              <NavLink className={"text-lg font-medium"}>Followers</NavLink>
                         </div>
                         <div className="md:block hidden only:  bg-[#d2cdcd] p-3 rounded-full ">
                              <FiMoreHorizontal stitchTiles={28}></FiMoreHorizontal>
                         </div>
                    </div>
                    <div className="p-1 md:p-3">
                         <Outlet></Outlet>
                    </div>



                    {
                         showModal ? <div className=" bg-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                              <div className=" shadow-md  md:min-w-[450px]   p-3 rounded-md min-w-[300px] relative w-auto my-6 mx-auto max-w-[1000px]">

                                   <div>
                                        <h1 className=" text-xl font-medium text-center text-blue-400 my-7"> Change Your Profile</h1>

                                        <div className=" flex justify-center items-center  h-[300px]">

                                             {
                                                  image ? <img className="  object-cover h-full w-full b border  border-blue-600 rounded-full" src={image} alt="" /> :

                                                       <div>
                                                            {
                                                                 <div>
                                                                      {
                                                                           imageLoading ? <FadeLoader color="#36d7b7" /> : <label htmlFor="profile">   <CgProfile className=" text-blue-500" size={50}></CgProfile>

                                                                                <input onChange={handleimage} type="file" className=" hidden" name="" id="profile" />

                                                                           </label>
                                                                      }
                                                                 </div>
                                                            }
                                                       </div>}

                                        </div>
                                   </div>


                                   <div className="flex items-center  justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                             className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                             type="button"
                                             onClick={() => setShowModal(false)}
                                        >
                                             Close
                                        </button>
                                        <button onClick={updateProfile}
                                             className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                             type="button"

                                        >
                                             Post
                                        </button>
                                        <Toaster
                                             position="top-center"
                                             reverseOrder={true}
                                        />
                                   </div>
                              </div>


                         </div> : ""
                    }
               </div>



               <div>
                    {
                         open ? <div className=" bg-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                              <div className=" shadow-md  md:min-w-[550px]   p-3 rounded-md min-w-[300px] relative w-auto my-6 mx-auto max-w-[1000px]">

                                   <div>
                                        <h1 className=" text-xl font-medium text-center text-blue-400 my-7"> Change Your Cover Photo</h1>

                                        <div className=" flex justify-center items-center  h-[300px] md:h-[450px]">

                                             {
                                                  CoverPhoto ? <img className="  object-cover h-full w-full border  border-blue-600   rounded-md" src={CoverPhoto} alt="" /> :

                                                       <div>
                                                            {
                                                                 <div>
                                                                      {
                                                                           imageLoading ? <FadeLoader color="#36d7b7" /> : <label htmlFor="profile">   <CgProfile className=" text-blue-500" size={50}></CgProfile>

                                                                                <input onChange={handleCoverphoto} type="file" className=" hidden" name="" id="profile" />

                                                                           </label>
                                                                      }
                                                                 </div>
                                                            }
                                                       </div>}

                                        </div>
                                   </div>


                                   <div className="flex items-center  justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                             className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                             type="button"
                                             onClick={() => setOpen(false)}
                                        >
                                             Close
                                        </button>
                                        <button onClick={changeCoverPhoto}
                                             className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                             type="button"

                                        >
                                             Post
                                        </button>
                                        <Toaster
                                             position="top-center"
                                             reverseOrder={true}
                                        />
                                   </div>
                              </div>


                         </div> : ""
                    }
               </div>
          </div>
     );
};

export default Profile;