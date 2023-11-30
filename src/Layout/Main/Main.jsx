import { Link, Outlet } from "react-router-dom";
import Navber from "../../Share/Navber/Navber";

import { LuVideo } from 'react-icons/lu';
import { IoSettingsOutline } from "react-icons/io5";
import Container from "../../Component/Container/Container";
import { AiFillCalendar, AiOutlineStar, AiOutlineUsergroupAdd } from "react-icons/ai";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaBars, FaBirthdayCake } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
import Footer from "../../Share/Footer/Footer";
const Main = () => {
     return (
          <div>
               <div>
                    <Navber></Navber>
                    <div className="flex gap-8 pt-10">
                         <div className=" hidden md:block">
                              <Container>

                                   <div className=" fixed  bgColor px-6 mt-8 rounded-lg py-8 ">
                                        <div className=" flex flex-col justify-center gap-8  ">
                                             <div className="bg-[#1590CB]  rounded  p-4  ">
                                                  <Link className=" ">
                                                       <FaBars className="iconSize   "></FaBars>
                                                  </Link>

                                             </div>
                                             <hr />
                                             <div className="bg-[#1590CB]  rounded  p-4  ">
                                                  <Link to={'/video'}>
                                                       <LuVideo className="iconSize   "></LuVideo>
                                                  </Link>

                                             </div>
                                             <div className="bg-[#1590CB]  rounded  p-4  ">
                                                  <Link to={'/friends/yourFriends'}>
                                                       <AiOutlineUsergroupAdd className="iconSize   "></AiOutlineUsergroupAdd>
                                                  </Link>

                                             </div>
                                             <div className="bg-[#1590CB]  rounded  p-4  ">
                                                  <Link className=" ">
                                                       <BsNewspaper className="iconSize   "></BsNewspaper>
                                                  </Link>
                                             </div>
                                             <div className="bg-[#1590CB]  rounded  p-4  ">
                                                  <Link>
                                                       <AiOutlineStar className="iconSize  "></AiOutlineStar>
                                                  </Link>
                                             </div>
                                             <div className="bg-[#1590CB]  rounded p-4 ">
                                                  <Link>
                                                       <AiFillCalendar className="iconSize"></AiFillCalendar>
                                                  </Link>
                                             </div>
                                             <div className="bg-[#1590CB]  rounded p-4 ">
                                                  <Link to="/weather">
                                                       <TiWeatherPartlySunny className="iconSize"></TiWeatherPartlySunny>
                                                  </Link>
                                             </div>
                                             <div className="bg-[#1590CB]  rounded p-4 ">
                                                  <Link to={'/massage'}>
                                                       <FaBirthdayCake className="iconSize"></FaBirthdayCake>
                                                  </Link>
                                             </div>
                                             <div className="bg-[#1590CB]  rounded p-4 ">
                                                  <Link  to={'/setting'}>
                                                       <IoSettingsOutline className="iconSize  text-white" />
                                                    
                                                  </Link>
                                             </div>

                                        </div>
                                   </div>

                              </Container>
                         </div>
                         <div className=" w-full">
                              <Outlet></Outlet>
                         </div>
                    </div>
                    <div className="  md:hidden fixed  mx-2  left-0 right-0 bottom-0  ">
                         <Footer></Footer>
                    </div>


               </div>
          </div>
     );
};

export default Main;