import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";


const Messanger = ({handleMessage}) => {
     const {user}=useContext(AuthContext)
     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('https://banglabook-server.vercel.app/users'),
     })

     const Friend= data?.data?.filter(item=> item.email !==user?.email);
  
     return (
          <div>
               <div className=" shadow-xl rounded-xl  p-3 ">
                   <div className=" flex justify-between gap-2">
                   <div>
                   <h1 className=" text-2xl font-bold "> Friends</h1>
                    <p className=" text-lg font-normal my-1"> Start New Conversation</p>
                   </div>
                    <div className=" cursor-pointer ">
                                   <AiOutlineSetting className=" text-blue-500" size={24}></AiOutlineSetting>
                              </div>
                   </div>

                    <div className=" my-3">
                         <div className='  flex items-center  gap-5  bg-[#acb2b69e] shadow px-3 py-2   rounded-lg'>
                              <AiOutlineSearch className='  hidden md:block   iconSize'></AiOutlineSearch>
                              <input className=' outline-none border-none text-base font-normal bg-transparent' type="text" placeholder=' Find Friends  ' />
                             
                         </div>
                    </div>
                    <div className=" ">
                    <div className=" scrollbar-hidden h-[80vh] ">
                     <h1 className=" text-xl font-semibold my-2"> Friend </h1>
                        <div>
                         { Friend  && Friend.map(item=> <div onClick={()=>handleMessage(item?.email)} className=" my-5   cursor-pointer p-2 rounded-lg  hover:bg-[#6a6868ad] " key={item._id} >
                            <div className=" flex gap-2 items-center ">
                            <img className=" h-10 w-10 rounded-full object-cover " src={item?.image} alt="" />
                            <h1 className=" text-xl font-semibold "> {item?.name} </h1>
                            </div>

                         </div>)}
                        </div>
                       
                    </div>
                    </div>
               </div>
          </div>
     );
};

export default Messanger;