import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AiOutlineSearch, AiOutlineClose, AiOutlineHome, AiOutlineUserAdd, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaBars, FaRegComment } from "react-icons/fa";
import DrowpDounMane from './DrowpDounMane';
import { AuthContext } from '../../Component/Authprovider/Authprovider';
import toast, { Toaster } from "react-hot-toast";
import { BiHelpCircle } from 'react-icons/bi';
const Navber = () => {
     const [Open, setOpen] = useState(false);
     const [logout, setLogout] = useState(false);
     const [ProfileOpen, setProfileOpen] = useState(false);

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

                    <div className=' max-w-[2400px] 2xl:px-32 xl:px-24 md:px-20 px-2  '>
                         <div className=' flex bgColor   justify-between items-center gap-3 py-2'>
                              <div className=' flex gap-3 items-center '>
                                   <NavLink className={" text-base md:text-4xl font-bold "}> Banglabook</NavLink>
                                   <div className=' flex items-center justify-center gap-5  bg-[#038ac9c8] shadow px-3 py-2  rounded'>
                                        <AiOutlineSearch className='  hidden md:block   iconSize'></AiOutlineSearch>
                                        
                                        <input className='  w-20 md:w-full  outline-none border-none text-xs font-normal bg-transparent' type="text" placeholder=' Friends  ' />
                                        <AiOutlineClose className='  hidden md:hidden  iconSize'></AiOutlineClose>
                                   </div>
                                  <div className='hidden md:block '>
                                        <div className='  flex gap-10  '>
                                             <AiOutlineHome className='iconSize hidden md:block '></AiOutlineHome>
                                             <Link to={'/friends/yourFriends'}>  <AiOutlineUserAdd  className='iconSize hidden md:block '></AiOutlineUserAdd></Link>
                                        </div>
                                   </div>
                              </div>
                              <div className=' bgColor   flex gap-5 items-center'>
                                   {
                                        Open ? <AiOutlineClose onClick={() => setOpen(false)} className="iconSize  md:hidden  "></AiOutlineClose> : <FaBars onClick={() => setOpen(true)} className="iconSize  md:hidden  "></FaBars>
                                   }

                                   <Link to={'/messenger'}>   <FaRegComment className=' hidden md:block iconSize'></FaRegComment></Link>
                                   <div className=' hidden sm:block  relative'>
                                        <MdOutlineNotificationsActive className='  relative iconSize hidden sm:block'></MdOutlineNotificationsActive>

                                   </div>
                                   {/* Profile photo  */}
                                   <div onClick={() => setProfileOpen(!ProfileOpen)} className=' cursor-pointer hidden md:block '>
                                        <div className='   relative flex gap-2 items-center '>
                                             <img className=' relative h-10 w-10 rounded-full object-cover' src={user?.photoURL} alt="" />


                                             <div className=' absolute w-3 h-3  left-8 -top-1  bg-[rgb(1,179,31)] rounded-full '></div>
                                             <div className=' relative  space-y-0'>
                                                  <h1 className='relative  text-base'>{user?.displayName}</h1>
                                                  <span className=' absolute -bottom-3 text-xs mt-4'> Active now</span>
                                             </div>

                                        </div>
                                   </div>

                                   {
                                        ProfileOpen ? <div className=' bg-white text-black p-4 rounded-md shadow-lg  fixed top-14 w-[300px]'>
                                             <div>
                                                  <Link onClick={() => setProfileOpen(false)} to={'/profile/post'} className='  cursor-pointer hover:bg-[#E4E6E8] p-2  rounded-lg  relative flex gap-2 items-center '>
                                                       <img className=' relative h-10 w-10 rounded-full object-cover' src={user?.photoURL} alt="" />
                                                       <div className=' relative  space-y-0'>
                                                            <h1 className='relative text-black  text-base'>{user?.displayName}</h1>

                                                       </div>

                                                  </Link>
                                                  <hr />
                                                  <div>
                                                       <Link onClick={() => setProfileOpen(false)} className=' my-2 cursor-pointer hover:bg-[#E4E6E8] p-2  rounded-lg  flex items-center justify-start gap-3 '>
                                                            <AiOutlineSetting size={24}></AiOutlineSetting>
                                                            <p className=' text-xl font-semibold'> Setting</p>
                                                       </Link>
                                                       <Link onClick={() => setProfileOpen(false)} className=' cursor-pointer hover:bg-[#E4E6E8] p-2  rounded-lg  my-2 flex items-center justify-start gap-3 '>
                                                            <BiHelpCircle size={24}></BiHelpCircle>
                                                            <p className=' text-xl font-semibold'> help</p>
                                                       </Link>
                                                       <div onClick={hanbleLogout} className=' cursor-pointer hover:bg-[#E4E6E8] p-2  rounded-lg   my-2 flex items-center justify-start gap-3 '>
                                                            <AiOutlineLogout size={24}></AiOutlineLogout>
                                                            <p className=' text-xl font-semibold'> Logout</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div> : ""
                                   }


                              </div>
                         </div>

                    </div>
                    <Toaster
                         position="top-center"
                         reverseOrder={false}
                    />
               </div>

               <div className='   pt-10'>
                    {
                         Open && <DrowpDounMane setOpen={setOpen} hanbleLogout={hanbleLogout}></DrowpDounMane>
                    }
               </div>
          </>
     );
};

export default Navber;