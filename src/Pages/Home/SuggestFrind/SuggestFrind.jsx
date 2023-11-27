import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from "react";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import FriendCard from "../Home/FriendCard";

const SuggestFriend = () => {

     const { userinfo } = useContext(AuthContext);
     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('https://banglabook-server.vercel.app/users'),
     })



   
     let friendData = userinfo?.following;

     let  allFriendData = data?.data?.filter(item => !friendData?.includes(item?.email));
      const filterFriend=allFriendData?.filter(item=> item?.email !==userinfo?.email)
     
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
                         filterFriend && filterFriend?.map(item => <SwiperSlide key={
                              item?._id
                         }>
                            <FriendCard  item={item}>
                              
                            </FriendCard>
                         </SwiperSlide>)
                    }
               </Swiper>
          </div>
     );
};

export default SuggestFriend;