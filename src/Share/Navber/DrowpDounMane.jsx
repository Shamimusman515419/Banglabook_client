import { useContext } from "react";
import { AiOutlineLogout, AiOutlineStar, AiOutlineUserAdd } from "react-icons/ai";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { LuVideo } from "react-icons/lu";
import { IoLogoGameControllerA, IoMdSettings } from "react-icons/io";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Component/Authprovider/Authprovider";


const DrowpDounMane = ({ setOpen, hanbleLogout }) => {
     const { user } = useContext(AuthContext)
     return (
          <div className=" md:hidden  fixed top-8 p-4 grid grid-cols-3   shadow-sm bg-white z-40 rounded mt-3  w-full items-center     gap-6">


               <div className=" text-center">
                    <Link onClick={() => setOpen(false)} to={'/profile/post'} className='  md:hidden cursor-pointer hover:bg-[#E4E6E8] p-2  rounded-lg  relative flex gap-2 items-center '>
                         <img className=' relative h-10 w-10 rounded-full object-cover' src={user?.photoURL} alt="" />
                    </Link>
               </div>
               <div className=" text-center">
                    <Link onClick={() => setOpen(false)} to={'/video'}>
                         <LuVideo className="iconSize mx-auto  text-[#0697d0fa]  "></LuVideo>
                    </Link>
                    <h1> Video</h1>
               </div>
               <div className=" text-center">
                    <Link onClick={() => setOpen(false)}  to="/friends/yourFriends">
                         <AiOutlineUserAdd className="iconSize mx-auto  text-[#0697d0fa] "></AiOutlineUserAdd>
                    </Link>
                    <h1> Group</h1>
               </div>
               <div className=" text-center">
                    <Link  onClick={() => setOpen(false)} to={'/messenger'}>
                         <FaRegComment className="iconSize mx-auto  text-[#0697d0fa]"></FaRegComment>
                    </Link>
                    <h1> Comment</h1>
               </div>
               <div className=" text-center">
                    <Link>
                         <AiOutlineStar className="iconSize mx-auto  text-[#0697d0fa] "></AiOutlineStar>
                    </Link>
                    <h1> Start</h1>
               </div>
               
               <div className=" text-center">
                    <Link  onClick={() => setOpen(false)} to="/weather">
                         <TiWeatherPartlySunny className="iconSize mx-auto text-[#0697d0fa]   "></TiWeatherPartlySunny>
                    </Link>
                    <h1> Weather</h1>
               </div>
               <div className=" text-center">
                    <Link  onClick={() => setOpen(false)} to="/setting">
                         <IoMdSettings className="iconSize  mx-auto  text-[#0697d0fa]  "></IoMdSettings>
                    </Link>
                    <h1> Setting</h1>
               </div>
               <div className=" text-center">
                    <div onClick={hanbleLogout} >
                         <AiOutlineLogout className="iconSize  mx-auto  text-[#0697d0fa]  "></AiOutlineLogout>
                         <h1> Logout</h1>
                    </div>
               </div>






          </div>
     );
};

export default DrowpDounMane;