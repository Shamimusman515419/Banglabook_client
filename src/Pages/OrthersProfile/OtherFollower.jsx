
import {  useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import NotFound from "../../Component/PostNotFoun/NotFound";



const OtherFollowers = () => {
     const [axiosSecure] = useAxiosSecure()
     const params = useParams();
 
     console.log(params);
     const { data, refetch, isLoading } = useQuery({
          queryKey: ['user'],
          queryFn: () => axiosSecure(`/userId/${params?.id}`)
     })

   




     const [active, setActive] = useState(2);
     const [dataFriend, setDataFriend] = useState([]);


     useEffect(() => {
          axiosSecure.get(`/follower?email=${data?.data?.email}`).then(result => {
               setDataFriend(result?.data)
          }).catch(e => {
               console.log(e);
          })

     })


     return (
          <div className=" postShadwo min-h-[80vh] p-4 rounded-lg ">

               <div className=" flex my-6  gap-5 items-center">
                    <div onClick={() => setActive(2)} className={` ${active == 2 ? "  text-blue-500  cursor-pointer text-base md:text-xl font-normal    " : " text-black  cursor-pointer text-base md:text-xl "} `}>Followers  </div>
                    <div onClick={() => setActive(1)} className={` ${active == 1 ? "  text-blue-500  cursor-pointer  text-base md:text-xl font-normal    " : " text-black text-base  cursor-pointer md:text-xl "}  `}> Following  </div>
               </div>




               {
                    active == 1 ?
                         <div>
                              {
                                   dataFriend[0]?.followingMe?.length > 0 ? <div className=" mt-10 grid md:grid-cols-2 gap-8">  {
                                        dataFriend[0]?.followingMe?.map(item => <div key={item?.email} className=" flex  items-center  gap-2 justify-between  border border-[#0000002b] p-3 rounded-lg">

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
                                             dataFriend[0]?.followersMe?.length > 0 ? <div className=" mt-10 grid md:grid-cols-2 gap-8">  {
                                                  dataFriend[0]?.followersMe?.map(item => <div key={item?.email} className=" flex  items-center  gap-2 justify-between  border border-[#0000002b] p-3 rounded-lg">

                                                       <Link to={`/otherProfile/profile/${item._id}`} className=" flex items-center gap-2 ">
                                                            <img className=" h-[80px]  border border-blue-500  w-[80px] rounded-lg" src={item?.image} alt="" />
                                                            <div>
                                                                 <h1 className="  text-base  md:text-xl font-bold">{item?.name}</h1>
                                                                 <p className=" text-sm md:text-lg ">  {item?.address} </p>

                                                            </div>
                                                       </Link>

                                                       <div className=" cursor-pointer ">
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

export default OtherFollowers;