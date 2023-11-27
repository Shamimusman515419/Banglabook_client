
import { useContext } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Component/Authprovider/Authprovider';
import useAxiosSecure from '../../../Component/AsioxSecures/useAxiosSecure';
import toast from 'react-hot-toast';
import { useState } from 'react';

const FriendCard = ({ item, }) => {
     const [success, setSuccess] = useState("")
     const { user } = useContext(AuthContext)
     const [axiosSecure] = useAxiosSecure();
     const handleClick = (email) => {
          const fromData = { me: user?.email, friend: email }
          console.log(fromData);
          axiosSecure.post('/follower', fromData).then(result => {
               console.log(result);
               if (result) {
                    setSuccess("My friend")
                    toast.success(result?.data?.massage)
               }
          }).catch(e => {
               console.log(e);
               toast.error(e.massage)
          })

     }

     return (
          <div>
               < div className=" cursor-pointer  h-[250px] shadow-xl rounded-xl   relative">


                    < Link to={`/otherProfile/profile/${item?._id}`} className=" relative h-[200px] ">
                         <img className=" relative h-[150px] rounded-md   w-full" src={item.image} alt="" />
                         <p className=" text-base   relative font-medium p-2"> {item?.name}  </p>
                    </Link>

                    <div onClick={() => handleClick(item?.email)} className="text-base gap-4   absolute w-full   bottom-0  font-medium bg-[#b4c7d9] hover:bg-[#e0e4e7] px-2 py-1 rounded-lg  text-blue-500     flex justify-center items-center ">
                         <AiOutlineUserAdd></AiOutlineUserAdd>
                         <span> {success ? success : "Add Friend"} </span>
                    </div>

               </div>
          </div>
     );
};

export default FriendCard;