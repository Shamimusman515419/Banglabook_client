import { AiOutlineStar, AiOutlineUserAdd } from "react-icons/ai";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { ImMusic } from "react-icons/im";
import { IoLogoGameControllerA } from "react-icons/io";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Link } from "react-router-dom";


const DrowpDounMane = () => {
     return (
          <div className=" md:hidden p-4 grid grid-cols-3   shadow-sm bg-white z-40 rounded mt-3  w-full items-center     gap-6">

               <div className=" text-center">
                    <Link className=" ">
                         <ImMusic className="iconSize mx-auto  text-[#0697d0fa]  "></ImMusic>
                    </Link>
                    <h1> Music</h1>
               </div>
               <div className=" text-center">
                    <Link className=" ">
                         <AiOutlineUserAdd className="iconSize mx-auto  text-[#0697d0fa] "></AiOutlineUserAdd>
                    </Link>
                    <h1> Group</h1>
               </div>
               <div className=" text-center">
                    <Link className=" ">
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
                    <Link>
                         <IoLogoGameControllerA className="iconSize  mx-auto  text-[#0697d0fa]"></IoLogoGameControllerA>
                    </Link>
                    <h1> Games</h1>
               </div>
               <div className=" text-center">
                    <Link className=" ">
                         <TiWeatherPartlySunny className="iconSize mx-auto text-[#0697d0fa]   "></TiWeatherPartlySunny>
                    </Link>
                    <h1> Weather</h1>
               </div>
               <div className=" text-center">
                    <Link className=" ">
                         <BsFillCalendarEventFill className="iconSize  mx-auto  text-[#0697d0fa]  "></BsFillCalendarEventFill>
                    </Link>
                    <h1> Calendar</h1>
               </div>






          </div>
     );
};

export default DrowpDounMane;