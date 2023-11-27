import { useContext } from "react";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useEffect } from "react";
import useAxiosSecure from "../../../Component/AsioxSecures/useAxiosSecure";
import NotFound from "../../../Component/PostNotFoun/NotFound";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const Followers = () => {
     const { user, userinfo } = useContext(AuthContext);
     const [active, setActive] = useState(2);
     const [data, setData] = useState([]);
     const [axiosSecure] = useAxiosSecure()

     useEffect(() => {
          axiosSecure.get(`/follower?email=${user?.email}`).then(result => {
               setData(result?.data)
          }).catch(e => {
               console.log(e);
          })

     })
     console.log(data);


     const handleDelete = (email) => {
          console.log(email);
          Swal.fire({
               title: 'Are you sure?',
               text: "Want to unfriend this friend of yours",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
               if (result.isConfirmed) {
                    axiosSecure.patch(`/follower?email=${user?.email}`, { email }).then(result => {
                         console.log(result);
                         if (result) {
                              Swal.fire(
                                   'Deleted!',
                                   'Your friend has been deleted.',
                                   'success'
                              )

                         }

                    }).catch((e) => {
                         Swal.fire({
                              icon: 'error',
                              title: `${e.massage}`,
                              text: 'Something went wrong!',

                         })
                    })


               }
          })

     }


     return (
          <div className=" postShadwo min-h-[80vh] p-4 rounded-lg ">

               <div className=" flex my-6  gap-5 items-center">
                    <div onClick={() => setActive(1)} className={` ${active == 1 ? "  text-blue-500  cursor-pointer text-base md:text-xl font-normal    " : " text-black  cursor-pointer text-base md:text-xl "} `}> Followers </div>
                    <div onClick={() => setActive(2)} className={` ${active == 2 ? "  text-blue-500  cursor-pointer  text-base md:text-xl font-normal    " : " text-black text-base  cursor-pointer md:text-xl "}  `}> Following </div>
               </div>




               {
                    active == 1 ?
                         <div>
                              {
                                   data[0]?.followersMe?.length > 0 ? <div className=" mt-10 grid md:grid-cols-2 gap-8">  {
                                        data[0]?.followersMe?.map(item => <div key={item?.email} className=" flex  items-center  gap-2 justify-between  border border-[#0000002b] p-3 rounded-lg">

                                             <Link to={`/otherProfile/profile/${item._id}`} className=" flex items-center gap-2 ">
                                                  <img className=" h-[80px]  border border-blue-500  w-[80px] rounded-lg" src={item?.image} alt="" />
                                                  <div>
                                                       <h1 className="  text-base  md:text-xl font-bold">{item?.name}</h1>
                                                       <p className=" text-sm md:text-lg "> {item?.address} </p>

                                                  </div>
                                             </Link>

                                             <div className=" cursor-pointer ">
                                                  <BsThreeDots size={30} />
                                             </div>

                                        </div>)

                                   }</div> : <NotFound text={"Not following "}></NotFound>
                              }
                         </div>
                         :
                         <div className=" ">
                              <div >




                                   <div>
                                        {
                                             data[0]?.followingMe?.length > 0 ? <div className=" mt-10 grid md:grid-cols-2 gap-8">  {
                                                  data[0]?.followingMe?.map(item => <div key={item?.email} className=" flex  items-center  gap-2 justify-between  border border-[#0000002b] p-3 rounded-lg">

                                                       <Link to={`/otherProfile/profile/${item._id}`} className=" flex items-center gap-2 ">
                                                            <img className=" h-[80px]  border border-blue-500  w-[80px] rounded-lg" src={item?.image} alt="" />
                                                            <div>
                                                                 <h1 className="  text-base  md:text-xl font-bold">{item?.name}</h1>
                                                                 <p className=" text-sm md:text-lg "> {item?.address} </p>

                                                            </div>
                                                       </Link>

                                                       <div onClick={() => handleDelete(item?.email)} className=" cursor-pointer ">
                                                            <BsThreeDots size={30} />
                                                       </div>

                                                  </div>)

                                             }</div> : <NotFound text={"Not followers "}></NotFound>
                                        }
                                   </div>





                              </div>
                         </div>
               }

          </div >
     );
};

export default Followers;