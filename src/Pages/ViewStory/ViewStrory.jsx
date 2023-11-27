import { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import './ViewStrory.css'
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
const ViewStrory = () => {

   const { user,currentStory, setCurrentStory } = useContext(AuthContext);
   const [story, setStory] = useState([]);
   useEffect(() => {
      fetch('https://banglabook-server.vercel.app/story').then(res => res.json()).then(data => {
         const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
         setStory(sortedData);
      })

   }, []);
   console.log(story);

return (

      <>
         <div className="justify-center  hidden  items-center md:flex overflow-x-hidden overflow-y-auto fixed inset-0  outline-none focus:outline-none  ">

            <div className="">
               <div className=" hidden md:block   md:fixed top-0 w-1/4 bottom-0 h-screen  overflow-y-scroll p-3 ">

                  <div className=" flex  items-center  justify-between  gap-4 my-2"><div className=" flex  items-center gap-4 my-2">
                     <img className=" h-12 w-12 rounded-full border-2 border-blue-500 " src={user?.photoURL} alt="" />
                     <h1 className=" text-xl font-medium ">  {user?.displayName}</h1>
                  </div>
                     <Link to={'/'}> <img className=" h-10 w-10 rounded-full " src={logo} alt="" />  </Link>
                  </div>
                  <Link to={'/'} className=" textColor text-2xl py-3 "> Create Story</Link>
                  <hr className=" mt-4 p-1" />
                  <div>
                     {
                        story && story?.map((data,index) => <div onClick={()=>setCurrentStory(index)} key={data._id}>
                           <div className="  my-5 flex justify-state items-center gap-3   cursor-pointer p-2 rounded-lg textColor hover:text-black  hover:bg-[#6a6868ad] ">
                              <img className=" h-14 w-14 rounded-full border-2 border-blue-500 " src={data?.img} alt="" />
                              <h1 className="   capitalize  text-xl font-medium ">  {data?.name ? data?.name : "Shamim hossain"}</h1>
                           </div>
                            <hr />
                        </div>)
                     }
                  </div>
               </div>

               <div className=" grid md:grid-cols-5 gap-4">
                  <div className=" hidden md:block md:col-span-2">

                  </div>
                  <div className=" w-full md:col-span-3">
                     <Link className=" z-50 absolute top-2 p-3 cursor-pointer  right-1 " to={'/'}>
                        <div className=" flex  items-center gap-3 " >
                           <h1 className=" text-blue-500 text-xl  md:text-2xl font-bold "> Banglabook</h1>
                           <GrClose className=" text-red-500" size={29}></GrClose>
                        </div>
                     </Link>
                     <div>
                        <Swiper autoplay={{
                           delay: 2500,
                           disableOnInteraction: false,
                        }}
                        loop={true}
                           navigation={true}
                           modules={[Autoplay, Pagination, Navigation]}
                           className="swiper">
                    

                           {
                              story && story.slice(currentStory? currentStory : 0).map(story => (
                                 <SwiperSlide key={story._id}>
                                    <div className="p-5 flex justify-center items-center md:h-screen">
                                       <div className="relative">
                                          <div className='relative rounded-xl overflow-hidden'>
                                             <img className='w-full md:w-[70vh] h-[80vh] relative object-cover' src={story?.storyImage} alt="" />
                                             <div className="absolute top-3 left-2">
                                                <div className="flex justify-end gap-3 items-center">
                                                   <img className="object-cover w-12 h-12 md:w-18 md:w-18 rounded-full border-2 border-blue-600" src={story?.img} alt="" />
                                                   <h1 className="text-2xl text-white font-bold">{story?.name ? story?.name : "Shamim hossain"}</h1>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </SwiperSlide>
                              ))
                           }
                        </Swiper>
                     </div>
                  </div>
               </div>
            </div>

         </div>

         <div className=" md:hidden">

            <div className=" p-2">
               <div className=" flex  items-center  justify-between  gap-4 my-2"><div className=" flex  items-center gap-4 my-2">
                  <img className=" h-12 w-12 rounded-full border-2 border-blue-500 " src={user?.photoURL} alt="" />
                  <h1 className=" text-xl font-medium ">  {user?.displayName}</h1>
               </div>
                  <Link to={'/'}> <img className=" h-10 w-10 rounded-full " src={logo} alt="" />  </Link>
               </div>
            </div>
         <Swiper centeredSlides={true} autoplay={{
               delay: 2500,
               disableOnInteraction: true,
            }}
              
               modules={[Autoplay, Pagination, Navigation]} className="swiper">

               {
                  story && story.slice(currentStory? currentStory : 0).map(story => <SwiperSlide key={story._id}>
                     <div className=" p-5 flex justify-center items-center  md:h-screen ">
                        <div className=" relative">
                           <div className=' relative  rounded-xl  overflow-hidden'>
                              <img className='  w-full  md:w-[70vh]  h-[80vh] relative object-cover  ' src={story?.storyImage} alt="" />
                              <div className=" absolute top-3 left-2 ">
                                 <div className=" flex justify-end gap-3 items-center">
                                    <img className=" object-cover  w-12 h-12 md:w-18 md:w-18 rounded-full border-2 border-blue-600" src={story?.img} alt="" />
                                    <h1 className=" text-white   text-xl font-bold ">{story?.name ? story?.name : "Shamim hossain"}</h1>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>)
               }
            </Swiper>
         </div>

      </>
   );
};

export default ViewStrory;