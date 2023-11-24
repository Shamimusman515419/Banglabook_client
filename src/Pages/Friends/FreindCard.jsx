
import { useContext } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Component/Authprovider/Authprovider';
import useAxiosSecure from '../../Component/AsioxSecures/useAxiosSecure';
import toast from 'react-hot-toast';
import { useState } from 'react';

const FriendCard = ({ data }) => {
     const [active, setActive] = useState("")
     const { user } = useContext(AuthContext)
     const [axiosSecure] = useAxiosSecure()
     const handleClick = (email) => {
          const fromData = { me: user?.email, friend: email }
          console.log(fromData);
          axiosSecure.post('/follower', fromData).then(result => {
               console.log(result);
               if (result) {
                    setActive("Send Request")
                    toast.success(result?.data?.massage)
               }
          }).catch(e => {
               console.log(e);
               toast.error(e.massage)
          })

     }
     return (
          <div>
               <div className="  h-[320px]  shadow-xl rounded-xl   relative">

                    <Link to={`/otherProfile/profile/${data._id}`} className=" relative  mb-4">
                         <div className=" h-[220px]  w-[220px] rounded-full mx-auto border-4 border-[#0389C9]">
                              <img className=" rounded-full  relative   h-full  w-full" src={data.image} alt="" />
                         </div>
                         <p className=" text-center  text-base relative  md:text-xl font-medium p-2"> {data?.name} </p>

                    </Link>
                    <div onClick={() => handleClick(data?.email)} className="text-base  cursor-pointer gap-4 absolute w-full   bottom-1  font-medium bg-[#b4c7d9] hover:bg-[#e0e4e7] px-2 py-1 rounded-lg  text-blue-500     flex justify-center items-center ">
                         <AiOutlineUserAdd></AiOutlineUserAdd>
                         <span> {active ? active : "Add Friend"} </span>
                    </div>

               </div>
          </div>
     );
};

export default FriendCard;