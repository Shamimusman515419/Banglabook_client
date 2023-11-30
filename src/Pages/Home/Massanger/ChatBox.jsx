
import { useContext, useState } from 'react';
import { AiFillLike, AiOutlineClose, AiOutlineSend, AiOutlineVideoCamera } from 'react-icons/ai';
import { BsFillEmojiNeutralFill } from 'react-icons/bs';
import { FaGrinAlt, FaVideo } from 'react-icons/fa';
import { HiOutlinePhotograph } from 'react-icons/hi';

import { MdCall } from 'react-icons/md'
import { AuthContext } from '../../../Component/Authprovider/Authprovider';
import useAxiosSecure from '../../../Component/AsioxSecures/useAxiosSecure';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SortMassage from './SortMassage';
import { Link } from 'react-router-dom';
const ChatBox = ({ setOpenmessanger, currentUser }) => {
     const { user } = useContext(AuthContext);
     const [open, setOpen] = useState(false);
     const { name, email, image, _id } = currentUser;
     const [Photo, setPhoto] = useState("");
     const [chatData, setChatData] = useState([])
     const [axiosSecure] = useAxiosSecure();
     const [inputValue, setInputValue] = useState("");

     const massageData = { yourEmail: user?.email, friendEmail: email, Photo, massage: inputValue, time: new Date() }
     console.log(massageData);
     console.log(inputValue);

     const handleSubmit = (event) => {
          event.preventDefault();
          axiosSecure.post('/messenger', { massageData }).then(result => {
               if (result) {
                    setOpen(false)
                    setInputValue('')
               }
          }).catch(error => {
               console.log(error);
          })

     };

     const handleChange = (e) => {
          setInputValue(e.target.value);
     }

     const { data, refetch, isLoading } = useQuery({
          queryKey: ['messenger'],
          queryFn: () => axiosSecure.get(`/messenger`),
     });

     useEffect(() => {
          refetch();

          const getData = async () => {
               const YourMassage = await data?.data.filter(item => item.yourEmail === user?.email && item?.friendEmail === email);
               const FriendMassage = await data?.data.filter(item => item.yourEmail === email && item?.friendEmail === user?.email);
               const massageDaa = [...YourMassage, ...FriendMassage]
               const projectData = massageDaa.sort((a, b) => new Date(a.time) - new Date(b.time));
               setChatData(projectData)

               console.log(YourMassage, FriendMassage);
          }
          getData();
     }, [user?.email, data, email])

     return (
          <div className=" relative w-full sm:w-[390px] bg-[#fff]  rounded-lg shadow-xl h-[500px]">
               <div className=' relative'>
                    <div className=' w-full shadow-xl p-2  flex  justify-between items-center gap-2'>
                         <div className='   relative flex gap-2 items-center '>
                              <Link to={`/otherProfile/profile/${_id}`}>  <img className=' cursor-pointer relative h-10 w-10 rounded-full object-cover' src={image} alt="" />
                              </Link>


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
                    <div className='  w-full sm:h-[400px]  overflow-y-auto p-2'>
                         <div className=" text-center  my-3 flex  flex-col mt-6  justify-center items-center gap-3 ">
                              <img className=' relative h-16 w-16 rounded-full object-cover' src={image} alt="" />
                              <h1 className=" text-xl font-medium "> {name} </h1>
                              <p>Your New Friend </p>
                         </div>
                         <hr className="  mx-9 h-[2px] bg-[#038ac9e2]" />

                         {
                              chatData?.map(item => <SortMassage data={item} key={item?._id}></SortMassage>)
                         }</div>
                    <div className=' pb-5  boxshadow bg-white p-2   fixed w-[390px] bottom-0 flex justify-around items-center gap-3 '>
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
                                        open ? <button type='submit' > <AiOutlineSend className='cursor-pointer  text-[#0389C9] ' size={24}></AiOutlineSend> </button> : <AiFillLike size={20} className='cursor-pointer  text-[#0389C9]'></AiFillLike>
                                   }

                              </div>
                         </form>


                    </div>

               </div>
          </div>
     );
};

export default ChatBox;