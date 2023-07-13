import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AiOutlineSearch, AiOutlineClose, AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaBars, FaRegComment } from "react-icons/fa";
import DrowpDounMane from './DrowpDounMane';
import { AuthContext } from '../../Component/Authprovider/Authprovider';
import toast, { Toaster } from "react-hot-toast";
const Navber = () => {
     const [Open, setOpen] = useState(false);
     const [logout, setLogout] = useState(false);

     const { LogOut, user } = useContext(AuthContext);

     const hanbleLogout = () => {
         
          LogOut().then(result => {
               toast.success('Successfully Logout!')

          }).catch(error => {
               console.log(error);
          })
     }

     console.log(user);
     return (
          <>
               <div style={{ fontFamily: 'sans-serif, Roboto' }} className='   fixed top-0 w-full  z-50  bgColor'>

                    <div className=' max-w-[2400px] 2xl:px-32 xl:px-24 md:px20 px-2  '>
                         <div className=' flex bgColor   justify-between items-center gap-3 py-2'>
                              <div className=' flex gap-3 items-center '>
                                   <NavLink className={" text-lg md:text-4xl font-bold "}> Banglabook</NavLink>
                                   <div className=' flex items-center justify-center gap-5  bg-[#038ac9c8] shadow px-3 py-2  rounded'>
                                        <AiOutlineSearch className='  hidden md:block   iconSize'></AiOutlineSearch>
                                        <input className=' outline-none border-none text-xs font-normal bg-transparent' type="text" placeholder=' Find Friends  ' />
                                        <AiOutlineClose className='  hidden md:hidden  iconSize'></AiOutlineClose>
                                   </div>
                                   <div className='  flex gap-10 '>
                                        <AiOutlineHome className='iconSize hidden md:block '></AiOutlineHome>
                                        <AiOutlineUserAdd className='iconSize hidden md:block '></AiOutlineUserAdd>
                                   </div>
                              </div>
                              <div className=' bgColor   flex gap-5 items-center'>
                                   <FaBars onClick={() => setOpen(!Open)} className="iconSize  md:hidden  "></FaBars>
                                   <FaRegComment className=' hidden md:block iconSize'></FaRegComment>
                                   <div className='  relative'>
                                        <MdOutlineNotificationsActive className='  relative iconSize hidden sm:block'></MdOutlineNotificationsActive>
                                        {/* <div className=' h-3 w-3 top-1  bg-red-700 rounded-full absolute '> 5 </div> */}
                                   </div>
                                   <div className=' hidden md:block '>
                                        <div className='   relative flex gap-2 items-center '>
                                        <img className=' relative h-10 w-10 rounded-full ' src={user?.photoURL} alt="" />


                                             <div className=' absolute w-3 h-3  left-8 -top-1  bg-[rgb(1,179,31)] rounded-full '></div>
                                             <div className=' relative  space-y-0'>
                                                  <h1 className='relative  text-base'>{user?.displayName}</h1>
                                                  <span className=' absolute -bottom-3 text-xs mt-4'> Active now</span>
                                             </div>
                                             <div onClick={hanbleLogout} className=' bg-white shadow-lg '>
                                                  <button className=' text-xl font-semibold text-blue-500 '>Logout</button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                    </div>
                    <Toaster
                         position="top-center"
                         reverseOrder={false}
                    />
               </div>

               {
                    Open && <DrowpDounMane></DrowpDounMane>
               }
          </>
     );
};

export default Navber;