
import { useContext, useRef, useState } from 'react';
import { AiFillLike, AiOutlineClose, AiOutlineSend, AiOutlineVideoCamera } from 'react-icons/ai';
import { BsFillEmojiNeutralFill } from 'react-icons/bs';
import { FaGrinAlt, FaVideo } from 'react-icons/fa';
import { HiOutlinePhotograph } from 'react-icons/hi';

import { MdCall } from 'react-icons/md'
import { AuthContext } from '../../../Component/Authprovider/Authprovider';
import useAxiosSecure from '../../../Component/AsioxSecures/useAxiosSecure';
const ChatBox = ({ setOpenmessanger, currentUser }) => {
     const { user } = useContext(AuthContext);
     const [open, setOpen] = useState(false);
     const { name, email, image } = currentUser;

     const [inputValue, setInputValue] = useState("");
     const [axiosSecure] = useAxiosSecure();
     const MessegerData = { yourEmail: user?.email, friendEmail: email, messeg: inputValue, time: new Date() }
     const handleSubmit = (event) => {
          event.preventDefault();
          axiosSecure.post('/messenger', { MessegerData }).then(result => {
               console.log(result);
               if(result){
                    setInputValue('')
               }
          }).catch(error => {
               console.log(error);
          })
          console.log('Form submitted:', inputValue);
          
     };

     const handleChange = (e) => {
          setInputValue(e.target.value);
     }



     return (
          <div className=" relative w-[340px] bg-[#fff]  rounded-lg shadow-xl h-[500px]">
               <div className=' relative'>
                    <div className=' w-full shadow-xl p-2  flex  justify-between items-center gap-2'>
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
                    <div>
                    <div className=" text-center  my-3 flex  flex-col mt-6  justify-center items-center gap-3 ">
                         <img className=' relative h-16 w-16 rounded-full object-cover' src={image} alt="" />
                         <h1 className=" text-xl font-medium "> {name} </h1>
                         <p>Your New Friend </p>
                    </div>
                    </div>
                    <div className=' pb-5  boxshadow p-2   fixed w-[330px]   bottom-0 flex justify-around items-center gap-3 '>
                         <div className={`flex justify-center items-center gap-4 ${open ? "hidden" : ""}`}>
                              <HiOutlinePhotograph size={20} className='cursor-pointer  text-[#0389C9]'></HiOutlinePhotograph>
                              <FaGrinAlt size={20} className='cursor-pointer  text-[#0389C9]'></FaGrinAlt>

                              <FaVideo size={20} className='cursor-pointer  text-[#0389C9]'></FaVideo>

                         </div>
                         <form onSubmit={handleSubmit} className=' flex  justify-between items-center gap-4 '>
                              <div className=' bg-[#E4E6E8]  px-2 py-1 rounded-xl flex items-center gap-2 justify-between'>
                                   <input value={inputValue}
                                        onChange={handleChange} onFocus={() => setOpen(true)} className=' w-full outline-none  bg-transparent ' type="text" placeholder='As' />
                                   <BsFillEmojiNeutralFill size={20} className='cursor-pointer  text-[#0389C9]'></BsFillEmojiNeutralFill>

                              </div>
                              <div className=''>
                                   {
                                        open ? <button type='submit' > <AiOutlineSend  className='cursor-pointer  text-[#0389C9] ' size={24}></AiOutlineSend> </button> : <AiFillLike size={20} className='cursor-pointer  text-[#0389C9]'></AiFillLike>
                                   }

                              </div>
                         </form>


                    </div>

               </div>
          </div>
     );
};

export default ChatBox;