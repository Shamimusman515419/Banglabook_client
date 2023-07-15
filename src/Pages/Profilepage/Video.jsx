import { useContext } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import NotFound from "../../Component/PostNotFoun/NotFound";

import CreatePost from "../Post/CreatePost";

import VideoPost from "./VideoPost";

import PostApi from "../../Component/Api/PostApi";

const Video = () => {
     const [data, refetch, isLoading] = PostApi();
     const { user } = useContext(AuthContext);
     const AllPost = data?.data;
   
     return (
          <div>
               <div>
                    <div className="  flex justify-center items-center  ">

                         <div className=" w-full   md:w-[1000px]">
                              <div className=" my-5">
                                   <CreatePost></CreatePost>
                              </div>

                              {
                                   AllPost && AllPost?.length > 0 ? (<div>
                                        {
                                             AllPost?.map(item => <VideoPost key={item._id} post={item}></VideoPost>)
                                        }
                                   </div>) : (<NotFound text={"Post not found please post"}></NotFound>)
                              }


                         </div>
                    </div>
               </div>


          </div>
     );
};

export default Video;