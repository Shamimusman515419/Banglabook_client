
import PostApi from "../../Component/Api/PostApi";
import NotFound from "../../Component/PostNotFoun/NotFound";
import VideoPost from "../Profilepage/VideoPost";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const OtherVideo = () => {
     const [data, refetch, isLoading] = PostApi();
     const params = useParams()

     const [userinfo, setUserinfo] = useState({})
     console.log(userinfo,);

     useEffect(() => {
          fetch(`http://localhost:5000/userId/${params?.id}`).then(res => res.json()).then(data => {
               setUserinfo(data)
          })

     }, [params?.id]);
     const MyPost = data?.data?.filter(item => item?.email == userinfo?.email);
     let PostData = MyPost?.sort((a, b) => new Date(b.date) - new Date(a.date));
     console.log(PostData);

 

     return (
          <div>
               <div>
                    <div className="  flex justify-center items-center  ">

                         <div className=" w-full   md:w-[1000px]">


                              {
                                   PostData && PostData?.length > 0 ? (<div>
                                        {
                                             PostData?.map(item => <VideoPost key={item._id} post={item}></VideoPost>)
                                        }
                                   </div>) : (<NotFound text={"Post not found please post"}></NotFound>)
                              }


                         </div>
                    </div>
               </div>


          </div>
     );
};

export default OtherVideo;