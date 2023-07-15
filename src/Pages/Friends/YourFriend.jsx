import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const YourFriend = () => {

     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('https://banglabook-server.vercel.app/users'),
     })

     return (
          <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
               {
                    data?.data && data?.data.map(item => <div key={
                         item._id
                    }>
                         <div className="  h-[320px]  shadow-xl rounded-xl   relative">

                              <div className=" relative ">
                                   <img className=" relative rounded-md  h-60 w-full" src={item.image} alt="" />
                                   <p className=" text-base relative font-medium p-2"> {item?.name} </p>

                              </div>
                              <Link to={''} className="text-base gap-4 absolute w-full   bottom-1  font-medium bg-[#b4c7d9] hover:bg-[#e0e4e7] px-2 py-1 rounded-lg  text-blue-500     flex justify-center items-center ">

                                   <span>Remove Friend</span>
                              </Link>

                         </div>
                    </div>)
               }
          </div>
     );
};

export default YourFriend;