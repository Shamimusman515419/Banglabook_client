import { AiFillLike, AiOutlineClose, AiOutlineSend, AiOutlineVideoCamera } from "react-icons/ai";
import { BsFillEmojiNeutralFill } from "react-icons/bs";
import { FaGrinAlt, FaVideo } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { useQuery } from "@tanstack/react-query";

const ChatBoxBig = ({ currentUser, setOpenmessanger }) => {
     const { user } = useContext(AuthContext);
     const { name, email, image } = currentUser;

     const [inputValue, setInputValue] = useState("");
     const [axiosSecure] = useAxiosSecure();
     const MessegerData = { yourEmail: user?.email, friendEmail: email, messeg: inputValue, time: new Date() }
     const { data, refetch, isLoading } = useQuery({
          queryKey: ['messenger'],
          queryFn: () => axiosSecure.get(`/messenger/${user?.email}`),
     })

     const handleSubmit = (event) => {
          event.preventDefault();
          axiosSecure.post('/messenger', { MessegerData }).then(result => {
               console.log(result);
               if (result) {
                    setInputValue('')
                    refetch();
               }
          }).catch(error => {
               console.log(error);
          })
          console.log('Form submitted:', inputValue);

     };

     const handleChange = (e) => {
          setInputValue(e.target.value);
     }





     const friendToMeData = data?.data.filter(item => item.friendEmail == email)
     // console.log(friendToMeData);

     return (
          <div className=" relative  w-full      bg-[#fff]  rounded-lg shadow-lg">
               <div className=' relative shadow-lg'>
                    <div className=' w-full  p-2  flex  justify-between items-center gap-2'>
                         <div className='   relative flex gap-2 items-center '>
                              <img className=' relative h-10 w-10 rounded-full object-cover' src={image} alt="" />


                              <div className=' absolute w-3 h-3  left-8 -top-1  bg-[rgb(1,179,31)] rounded-full '></div>
                              <div className=' relative  space-y-0'>
                                   <h1 className='relative  text-base'>{name}</h1>
                                   <span className=' absolute -bottom-3 text-xs mt-4'> Active now</span>
                              </div>

                         </div>
                         <div className=' flex justify-center items-center gap-4'>
                              <MdCall size={20} className=' text-[#0389C9] cursor-pointer'></MdCall>
                              <AiOutlineVideoCamera size={20} className=' cursor-pointer text-[#0389C9]'></AiOutlineVideoCamera>
                              <AiOutlineClose onClick={() => setOpenmessanger(false)} size={20} className='cursor-pointer  text-[#0389C9]'></AiOutlineClose>
                         </div>
                    </div>
               </div>
               <div className=" h-[75vh]">
                    <div className=" text-center  my-3 flex  flex-col mt-6  justify-center items-center gap-3 ">
                         <img className=' relative h-24 w-24 rounded-full object-cover' src={image} alt="" />
                         <h1 className=" text-xl font-medium "> {name} </h1>
                         <p>Your New Friend </p>
                    </div>

                    <div>
                         <div className="  flex   gap-2 justify-between p-4 w-full">
                              {
                                   friendToMeData?.map(item => <div className=" w-1/2  " key={item._id}>
                                        <h1 className="  bg-[#E4E6E8] px-4 py-1 rounded-xl text-xl font-normal"> {item?.messeg} </h1> </div>)
                              }
                         </div>
                    </div>
               </div>
               <div className=" flex shadow-xl  gap-4 items-center justify-between w-full p-3 ">
                    <div className=" hidden md:block">
                         <div className={`flex justify-center items-center gap-4 }`}>
                              <HiOutlinePhotograph size={24} className='cursor-pointer  text-[#0389C9]'></HiOutlinePhotograph>
                              <FaGrinAlt size={24} className='cursor-pointer  text-[#0389C9]'></FaGrinAlt>

                              <FaVideo size={24} className='cursor-pointer  text-[#0389C9]'></FaVideo>

                         </div>
                    </div>
                    <form onSubmit={handleSubmit} className=' flex  justify-between items-center gap-4 '>
                         <div className=' bg-[#E4E6E8] w-full   px-2 py-1 rounded-xl flex items-center gap-2 justify-between'>
                              <div className=" w-full ">
                                   <input value={inputValue}
                                        onChange={handleChange} className='  w-full  block p-2 outline-none  bg-transparent ' type="text" placeholder='As' />
                              </div>
                              <BsFillEmojiNeutralFill size={24} className='cursor-pointer  text-[#0389C9]'></BsFillEmojiNeutralFill>

                         </div>
                         <div className='flex items-center gap-2 justify-between'>
                              <button type='submit' > <AiOutlineSend className='cursor-pointer  m-2 text-[#0389C9] ' size={24}></AiOutlineSend> </button>  <AiFillLike size={24} className=' m-2 cursor-pointer  text-[#0389C9]'></AiFillLike>


                         </div>
                    </form>
               </div>

          </div>
     );
};

export default ChatBoxBig;