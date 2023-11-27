import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const YourFriend = () => {
     const { user } = useContext(AuthContext);

     const [axiosSecure] = useAxiosSecure();
     const [data, setData] = useState([])



     useEffect(() => {
          axiosSecure.get(`/follower?email=${user?.email}`).then(result => {

               let following = result?.data[0]?.followingMe;


               setData(following)
          }).catch(e => {
               console.log(e);
          })

     })

     const handleDelete = (email) => {
          console.log(email);
          axiosSecure.patch(`/follower?email=${user?.email}`, { email }).then(result => {
               console.log(result);
               if (result) {
                    toast.success(" Friend successfully Delete")
               }

          }).catch((e) => {
               toast.error(e.message)
          })
     }



     console.log(data);

     return (
          <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
               {
                    data && data?.map(item => <div key={
                         item?._id
                    }>
                         <div className="   p-2  shadow-md boxshadow   relative ">

                              <Link to={`/otherProfile/profile/${item._id}`} className=" relative  mb-4">
                                   <div className=" h-[220px]  w-[220px] rounded-full mx-auto border-4 border-[#0389C9]">
                                        <img className=" rounded-full  relative   h-full  w-full" src={item.image} alt="" />
                                   </div>
                                   <p className=" text-center  text-base relative  md:text-xl font-medium "> {item?.name} </p>
                                   <p className=" text-center  text-sm relative  md:text-base font-medium  capitalize"> {item?.address ? item?.address : " New users"} </p>

                              </Link>
                              <div onClick={() => handleDelete(item?.email)} className=" mx-3">
                                   <div className="text-base  gap-4     cursor-pointer   w-full    font-medium bg-[#b4c7d9] hover:bg-[#e0e4e7   px-2 py-2 rounded-lg  text-blue-500      text-center ">

                                        <span>Remove Friend</span>
                                   </div>
                              </div>

                         </div>
                    </div>)
               }
          </div>
     );
};

export default YourFriend;