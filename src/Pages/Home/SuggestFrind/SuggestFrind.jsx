import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAxiosSecure from "../../../Component/AsioxSecures/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import toast from "react-hot-toast";
import { useState } from "react";

const SuggestFriend = () => {
     const [axiosSecure] = useAxiosSecure();
     const { user,userinfo } = useContext(AuthContext);
     const [success, setSuccess] = useState("")

     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('https://banglabook-server.vercel.app/users'),
     })


  
     const handleClick = (email) => {
          const fromData = { me: user?.email, friend: email }
          console.log(fromData);
          axiosSecure.post('/follower', fromData).then(result => {
               console.log(result);
               if (result) {
                    setSuccess("my friend")
                    toast.success(result?.data?.massage)
               }
          }).catch(e => {
               console.log(e);
               toast.error(e.massage)
          })

     }
     let friendData = userinfo?.following;

     let notMatchingData2 = data?.data?.filter(item => !friendData?.includes(item?.email));

     return (
          <div>
               <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    pagination={{
                         clickable: true,
                    }}

                    className="mySwiper"
               >
                    {
                         notMatchingData2 && notMatchingData2?.map(item => <SwiperSlide key={
                              item._id
                         }>
                              < div className=" cursor-pointer  h-[250px] shadow-xl rounded-xl   relative">


                                   < Link to={`/otherProfile/profile/${item._id}`} className=" relative h-[200px] ">
                                        <img className=" relative h-[150px] rounded-md   w-full" src={item.image} alt="" />
                                        <p className=" text-base   relative font-medium p-2"> {item?.name}  </p>
                                   </Link>

                                   <div onClick={() => handleClick(item?.email)} className="text-base gap-4   absolute w-full   bottom-0  font-medium bg-[#b4c7d9] hover:bg-[#e0e4e7] px-2 py-1 rounded-lg  text-blue-500     flex justify-center items-center ">
                                        <AiOutlineUserAdd></AiOutlineUserAdd>
                                        <span> {success ? success : "Add Friend"} </span>
                                   </div>

                              </div>
                         </SwiperSlide>)
                    }


               </Swiper>
          </div>
     );
};

export default SuggestFriend;