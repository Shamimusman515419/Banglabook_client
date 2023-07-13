import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";


const Messanger = () => {
     const {user}=useContext(AuthContext)
     const { data, refetch } = useQuery({
          queryKey: ['users'],
          queryFn: () => axios.get('http://localhost:5000/users'),
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
                         { Friend  && Friend.map(item=> <div className=" my-5   cursor-pointer p-2 rounded-lg  hover:bg-[#6a6868ad] " key={item._id} >
                            <div className=" flex gap-2 items-center ">
                            <img className=" h-10 w-10 rounded-full " src={item?.image} alt="" />
                            <h1 className=" text-xl font-semibold "> {item?.name} </h1>
                            </div>

                         </div>)}
                        </div>
                        <h1 className=" text-xl"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga unde perspiciatis molestias minima consectetur nemo pariatur aperiam labore laudantium laborum voluptates quaerat cumque commodi vero, ut aut tenetur provident expedita distinctio quasi? Voluptate commodi quia tempore eaque quasi? Laudantium dolorem fuga dolor expedita ad nostrum cumque minus. Accusantium, deserunt iusto. Culpa, reiciendis ipsum earum qui placeat odit doloribus saepe? Quidem error maxime, perspiciatis officia dolores dolore ipsum porro provident harum et nemo dolor fugiat nesciunt officiis vitae, ad quisquam rem odit voluptates commodi ipsam aliquam corporis. Iure, aperiam! Ea optio corporis quos perspiciatis explicabo cumque blanditiis itaque autem molestias reiciendis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias magnam debitis perferendis quam eius repellendus fuga repudiandae? Magnam consectetur veritatis aliquid, nisi fugit, asperiores adipisci voluptas beatae vitae eum voluptate labore rerum laboriosam? Dicta, quis corporis porro neque est iusto exercitationem architecto earum non atque repellendus sit, explicabo quibusdam molestiae? Voluptatibus esse modi tempora quaerat a commodi iusto quas nemo eos! Blanditiis error quo, cum velit ipsa hic sunt provident. Recusandae dolor nulla quo inventore error omnis porro fugiat saepe. Error vero doloribus molestiae ducimus debitis mollitia autem fuga beatae repellendus! Adipisci, voluptates. Blanditiis, vitae? Labore quae delectus distinctio quod?</h1>
                    </div>
                    </div>
               </div>
          </div>
     );
};

export default Messanger;