
import { FiMoreHorizontal } from "react-icons/fi";


import { NavLink, Outlet, useParams, } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";


const OtherProfile = () => {
     const [axiosSecure] = useAxiosSecure();

     const params = useParams();
     console.log(params);
     const { data, refetch, isLoading } = useQuery({
          queryKey: ['user'],
          queryFn: () => axiosSecure(`/userId/${params?.id}`)
     })

     const userData = data?.data;
     return (
          <div className=" w-full md:mr-10 mr-1 md:px-20 md:-mt-10 ">
               <div>
                    <div className="">

                         <div className=" md:mt-3 -mt-8  relative ">
                              <div className="  relative ">
                                   {
                                        userData?.Cover ? <img className=" relative  rounded-md w-full object-cover h-[400px] " src={userData?.Cover} alt="" /> : <img className=" relative  rounded-md w-full h-[40vh] " src="https://img.freepik.com/free-vector/3d-social-media-background_52683-29718.jpg?w=1380&t=st=1689308805~exp=1689309405~hmac=b1beec3c098f47820dde6ca055cc98ee70e085269d7bba91c37dbd7029b5bca9" alt="" />
                                   }
                              </div>


                              <div className=" px-8 md:flex justify-between ">
                                   <div className=" text-center md:flex gap-4  ">
                                        <div className=" relative ">
                                             <img className='    mx-auto border-2 border-white -mt-8 relative h-32 w-32 rounded-full object-cover' src={userData?.image} alt="" />
                                        </div>

                                        <div className=" mt-2">
                                             <h1 className='relative uppercase font-semibold text-black  text-2xl'>{userData?.name}</h1>
                                             <p className=" text-lg">  <NavLink>1.2K followers </NavLink> •  <NavLink>151 following</NavLink> </p>
                                        </div>
                                   </div>
                                   <div>

                                   </div>
                              </div>
                         </div>

                         <div>

                         </div>
                    </div>
                    <hr className=" my-2 border" />

                    <div className=" flex items-center justify-between">
                         <div className=" flex  items-center  flex-wrap gap-4 md:gap-6">
                              <NavLink to={`/otherProfile/profile/${params?.id}`} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Post</NavLink>
                              <NavLink className={"text-lg font-medium"}>About</NavLink>
                              <NavLink to={`/otherProfile/profile/${params?.id}/photo/${params?.id}`} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Photo</NavLink>
                              <NavLink to={`/otherProfile/profile/${params?.id}/video/${params?.id}`} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"}>Video</NavLink>
                              <NavLink className={"text-lg font-medium"}>Followers</NavLink>
                         </div>
                         <div className="md:block hidden only:  bg-[#d2cdcd] p-3 rounded-full ">
                              <FiMoreHorizontal stitchTiles={28}></FiMoreHorizontal>
                         </div>
                    </div>
                    <div className="p-1 md:p-3">
                         <Outlet></Outlet>
                    </div>




               </div>



               <div>

               </div>
          </div>
     );
};

export default OtherProfile;