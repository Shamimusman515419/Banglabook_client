
import moment from "moment/moment";
import { useState } from "react";
import { BsReply, BsThreeDots } from "react-icons/bs";
import { MdDelete, MdOutlineAddReaction } from "react-icons/md";
import useAxiosSecure from "../../../Component/AsioxSecures/useAxiosSecure";
const SortMassage = ({ data }) => {
     const [Open, setOpen] = useState(false);

     const [axiosSecure] = useAxiosSecure();
     const handleDelete = (id) => {
          axiosSecure.delete(`/messenger/${id}`).then(result => {
               console.log(result);
          }).catch(error => {
               console.log(error);
          })

     }

     return (
          <div className=" relative">
               <div className="  mt-6 hover:bg-[#038ac91a]  rounded p-2 my-2  " >

                    <div className=" flex justify-between  gap-4">
                         <div className=" flex justify-between   cursor-pointer  gap-4">
                              <img className=" border border-[#038ac9d9] mt-2 object-cover sm:w-12 w-8 h-8 sm:h-12 rounded-full  " src={data?.yourData
                                   ?.[0]?.image} alt="" />
                              <div className="  flex items-center gap-3">
                                   <h1 className=" capitalize textColor text-base  "> {data?.yourData
                                        ?.[0]?.name}</h1>
                                   <p className=" text-sm capitalize"> {moment(data?.time).format('ddd h:mm A')} </p>
                              </div>
                         </div>

                         <div className=" textColor" onMouseMove={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                              <BsThreeDots size={22} />
                         </div>




                    </div>
                  
                    <div className=" ml-10  rounded-xl  ">
                         <h1 className=" w-[90%]    px-4 py-1 rounded-xl text-base font-normal"> {data?.massage} </h1>
                    </div>
               </div>

               {
                    Open ? <div onMouseMove={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className=" postShadwo textColor  absolute top-2  p-2 rounded right-2 bg-white  cursor-pointer  flex items-center gap-3">
                         <BsReply size={24} />
                         <MdOutlineAddReaction size={24} />
                         <MdDelete onClick={() => handleDelete(data?._id)} size={24} />

                    </div> : null
               }
          </div>
     );
};

export default SortMassage;