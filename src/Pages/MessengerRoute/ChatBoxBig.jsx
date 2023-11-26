import { AiFillLike, AiOutlineClose, AiOutlineSend, AiOutlineVideoCamera } from "react-icons/ai";
import { BsFillEmojiNeutralFill } from "react-icons/bs";
import { FaGrinAlt, FaVideo } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router-dom";


const ChatBoxBig = ({ currentUser, setOpenmessanger }) => {
     const { user } = useContext(AuthContext);
     const { name, email, image,_id } = currentUser;
     const [chatData, setChatData] = useState([]);

     const [inputValue, setInputValue] = useState("");
     const [axiosSecure] = useAxiosSecure();
     const [Photo, setPhoto] = useState("")
     console.log(user?.email);
     console.log(email);

     const massageData = { yourEmail: user?.email, friendEmail: email, Photo, massage: inputValue, time: new Date() }
     const { data, refetch, isLoading } = useQuery({
          queryKey: ['messenger'],
          queryFn: () => axiosSecure.get(`/messenger`),
     })





     const handleSubmit = (event) => {
          event.preventDefault();
          axiosSecure.post('/messenger', { massageData }).then(result => {
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
          <div className=" relative  w-full      bg-[#fff]  rounded-lg shadow-lg">
               <div className=' relative shadow-lg'>
                    <div className=' w-full  p-2  flex  justify-between items-center gap-2'>
                         <div className='   relative flex gap-2 items-center '>
                              <Link  to={`/otherProfile/profile/${_id}`}>  <img className=' relative h-10 w-10 rounded-full object-cover' src={image} alt="" /> </Link>
                             


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
               <div className=" overflow-y-auto fixed-bottom h-[75vh]">
                    <div className=" text-center  my-3 flex  flex-col mt-6  justify-center items-center gap-3 ">
                         <img className=' relative h-24 w-24 rounded-full object-cover' src={image} alt="" />
                         <h1 className=" text-xl font-medium "> {name} </h1>
                         <p>Your New Friend </p>
                    </div>

                    <div>
                         <div className="  gap-2 p-4 w-full">
                              {
                                   chatData?.map(item => <div className="  mt-6 hover:bg-[#038ac928]  rounded p-2 my-2  " key={item._id}>

                                        <div className=" flex  cursor-pointer  gap-4">
                                             <img className=" mt-2 object-cover w-12 h-12 rounded-full  " src={item?.yourData
                                                  ?.[0]?.image} alt="" />
                                             <div className="  flex items-center gap-3">
                                                  <h1 className=" text-base  md:text-xl "> {item?.yourData
                                                       ?.[0]?.name}</h1>
                                                  <p className=" text-sm"> {moment(item?.time).format('MM/DD/YYYY h:mm A')} </p>
                                             </div>

                                        </div>

                                        <div className=" ml-16">
                                             <h1 className="  px-4 py-1 rounded-xl text-xl font-normal"> {item?.massage} </h1>
                                        </div>
                                   </div>)
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