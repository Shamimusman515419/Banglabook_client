import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FriendCard from "./FreindCard";


const SuggestFriends = () => {

     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('https://banglabook-server.vercel.app/users'),
     })

     return (
          <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
               {
                    data?.data && data?.data.map(item => <FriendCard key={item._id} data={item}></FriendCard>)
               }
          </div>
     );
};

export default SuggestFriends;