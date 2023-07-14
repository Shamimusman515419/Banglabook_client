import { useContext } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { FiMoreHorizontal } from "react-icons/fi";

import { AiFillEdit } from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";



const Profile = () => {
     const { user } = useContext(AuthContext);
     return (
          <div className=" w-full md:mr-10 mr-1 md:px-20 md:-mt-10 ">
               <div className="">

                    <div className=" md:mt-3 -mt-8">
                         <img className="  rounded-md w-full h-[40vh] " src="https://img.freepik.com/free-vector/3d-social-media-background_52683-29718.jpg?w=1380&t=st=1689308805~exp=1689309405~hmac=b1beec3c098f47820dde6ca055cc98ee70e085269d7bba91c37dbd7029b5bca9" alt="" />

                         <div className=" px-8 md:flex justify-between ">
                              <div className=" text-center md:flex gap-4  ">
                                   <img className='  mx-auto border-2 border-white -mt-8 relative h-32 w-32 rounded-full object-cover' src={user?.photoURL} alt="" />

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
                         <NavLink className={"text-lg font-medium" }>About</NavLink>
                         <NavLink to={'/profile/photo'} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Photo</NavLink>
                         <NavLink to={'video'} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Video</NavLink>
                         <NavLink  className={"text-lg font-medium" }>Followers</NavLink>
                    </div>
                    <div className="md:block hidden only:  bg-[#d2cdcd] p-3 rounded-full ">
                         <FiMoreHorizontal stitchTiles={28}></FiMoreHorizontal>
                    </div>
               </div>
                <div className="p-1 md:p-3">
                <Outlet></Outlet>
                </div>
          </div>
     );
};

export default Profile;