
import moment from "moment/moment";
import { useState } from "react";
import { BsReply } from "react-icons/bs";
import { MdDelete, MdOutlineAddReaction } from "react-icons/md";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
const MassageShow = ({ data }) => {
     const [Open, setOpen] = useState(false)


     const [axiosSecure] = useAxiosSecure();
     const handleDelete = (id) => {
          axiosSecure.delete(`/messenger/${id}`).then(result => {
               console.log(result);
          }).catch(error => {
               console.log(error);
          })

     }

     return (
          <div>
               <div onMouseMove={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="  mt-6 hover:bg-[#038ac91a]  rounded p-2 my-2  " >

                    <div className=" flex justify-between  gap-4">
                         <div className=" flex justify-between   cursor-pointer  gap-4">
                              <img className=" border border-[#038ac9d9] mt-2 object-cover w-12 h-12 rounded-full  " src={data?.yourData
                                   ?.[0]?.image} alt="" />
                              <div className="  flex items-center gap-3">
                                   <h1 className=" capitalize textColor text-base  md:text-xl "> {data?.yourData
                                        ?.[0]?.name}</h1>
                                   <p className=" text-sm capitalize"> {moment(data?.time).format('MM/DD/YYYY h:mm A')} </p>
                              </div>
                         </div>
                         {
                              Open ? <div className=" textColor  cursor-pointer  flex items-center gap-3">
                                   <BsReply size={24} />
                                   <MdOutlineAddReaction size={24} />
                                   <MdDelete onClick={() => handleDelete(data?._id)} size={24} />
                              </div> : null
                         }



                    </div>

                    <div className=" ml-16">
                         <h1 className="  px-4 py-1 rounded-xl text-xl font-normal"> {data?.massage} </h1>
                    </div>
               </div>
          </div>
     );
};

export default MassageShow;