import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const SuggestFriend = () => {
     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('https://banglabook-server.vercel.app/users'),
     })

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
                         data?.data && data?.data.map(item => <SwiperSlide key={
                              item._id
                         }>
                              <Link to={`otherProfile/profile/${item._id}`} className=" cursor-pointer  h-[250px] shadow-xl rounded-xl   relative">


                                   <div className=" relative h-[180px] ">
                                        <img className=" relative h-[140px] rounded-md   w-full" src={item.image} alt="" />
                                        <p className=" text-base   relative font-medium p-2"> {item?.name}  </p>
                                   </div>
                                   
                                   <Link to={''} className="text-base gap-4 mt-4  w-full   bottom-0  font-medium bg-[#b4c7d9] hover:bg-[#e0e4e7] px-2 py-1 rounded-lg  text-blue-500     flex justify-center items-center ">
                                        <AiOutlineUserAdd></AiOutlineUserAdd>
                                        <span>Add Friend</span>
                                   </Link>

                              </Link>
                         </SwiperSlide>)
                    }


               </Swiper>
          </div>
     );
};

export default SuggestFriend;