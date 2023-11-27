
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Component/AsioxSecures/useAxiosSecure";
import { Link } from "react-router-dom";


const Messanger = ({ handleMessage }) => {
     const { user } = useContext(AuthContext);
     const [allUser, setAlluser] = useState([])

     const [searchName, setSearchName] = useState("")
     useEffect(() => {
          axios.get(`https://banglabook-server.vercel.app/alluser?name=${searchName} `)
               .then(response => {

                    setAlluser(response.data)
               })
               .catch(error => {
                    console.error('Error:', error);
               });

     }, [searchName]);





     const Friend = allUser?.filter(item => item.email !== user?.email);

     return (
          <div>
               <div className=" shadow-xl rounded-xl  p-3 ">
                    <div className=" flex justify-between gap-2">
                         <div>
                              <h1 className=" text-2xl font-bold "> Friends</h1>
                              <p className=" text-lg font-normal my-1"> Start New Conversation</p>
                         </div>
                         <Link to={'/setting'} className=" cursor-pointer ">
                              <AiOutlineSetting className=" text-blue-500" size={24}></AiOutlineSetting>
                         </Link>
                    </div>

                    <div className=" my-3">
                         <div className='  flex items-center  gap-5  bg-[#acb2b69e] shadow px-3 py-2   rounded-lg'>
                              <AiOutlineSearch className='  hidden md:block   iconSize'></AiOutlineSearch>
                              <input onChange={(e) => setSearchName(e.target.value)} className=' outline-none border-none text-base font-normal bg-transparent' type="text" placeholder=' Find Friends  ' />

                         </div>
                    </div>
                    <div className=" ">
                         <h1 className="  textColor text-2xl font-semibold my-2"> inbox </h1>
                       <hr />
                      
                         <div className="  overflow-y-auto h-[80vh] ">

                              <div>
                                   {Friend && Friend.map(item => <div onClick={() => handleMessage(item?.email)} className=" my-5   cursor-pointer p-2 rounded-lg  hover:bg-[#6a6868ad] " key={item?._id} >
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