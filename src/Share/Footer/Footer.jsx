import { AiFillCalendar, AiOutlineHome, AiOutlineStar, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { FaBars, FaBirthdayCake, FaRegComment } from "react-icons/fa";
import { ImMusic } from "react-icons/im";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Link } from "react-router-dom";
import Container from "../../Component/Container/Container";
import { MdOutlineNotificationsActive } from "react-icons/md";

const Footer = () => {
     return (
          <div>
               

                    <div className="   bgColor px-6 mt-8   ">
                         <div className=" flex items-center justify-center  gap-8  ">
                         
                              <div className="bg-[#1590CB]  rounded  p-2  ">
                                   <Link className=" ">
                                        <AiOutlineHome className="iconSize   "></AiOutlineHome>
                                   </Link>

                              </div>
                              <div className="bg-[#1590CB]  rounded  p-2  ">
                                   <Link className=" ">
                                        <AiOutlineUsergroupAdd className="iconSize   "></AiOutlineUsergroupAdd>
                                   </Link>

                              </div>
                              <div className="bg-[#1590CB]  rounded  p-2  ">
                                   <Link className=" ">
                                        <MdOutlineNotificationsActive className="iconSize   "></MdOutlineNotificationsActive>
                                   </Link>
                              </div>
                              <div className="bg-[#1590CB]  rounded  p-2  ">
                                   <Link>
                                        <FaRegComment className="iconSize  "></FaRegComment>
                                   </Link>
                              </div>
                             
                              <div className="bg-[#1590CB]  rounded p-2 ">
                                   <Link>
                                        <TiWeatherPartlySunny className="iconSize"></TiWeatherPartlySunny>
                                   </Link>
                              </div>
                             
                             

                         </div>
                    </div>

              
          </div>
     );
};

export default Footer;