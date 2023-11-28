import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FriendCard from "./FreindCard";
import { useContext } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";


const SuggestFriends = () => {
     const { userinfo } = useContext(AuthContext)

     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('https://banglabook-server.vercel.app/users'),
     });
     const friendData = userinfo?.following;

    const notMatchingData2 = data?.data?.filter(item => !friendData?.includes(item.email));
     
   
      
    const Friend = notMatchingData2?.filter(item => item.email !== userinfo?.email);

     return (
          <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
               {
                    Friend && Friend?.map(item => <FriendCard key={item._id} data={item}></FriendCard>)
               }
          </div>
     );
};

export default SuggestFriends;