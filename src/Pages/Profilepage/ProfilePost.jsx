import { useContext } from "react";
import PostApi from "../../Component/Api/PostApi";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import Post from "../Post/Post";
import CreatePost from "../Post/CreatePost";
import NotFound from "../../Component/PostNotFoun/NotFound";

const ProfilePost = () => {
     const [data, refetch, isLoading] = PostApi();
     const { user } = useContext(AuthContext);
     const AllPost = data?.data;
     const MyPost = AllPost?.filter(item => item.email == user?.email);
     let PostData = MyPost?.sort((a, b) => new Date(b.date) - new Date(a.date));
     console.log(PostData);


     return (
          <div>
               <div className=" grid md:grid-cols-5 gap-3 ">
                    <div className=" col-span-2">

                         <div className=" postShadwo p-3">
                              <div className=" gap-2 my-3  flex justify-between items-center">
                                   <p className=" text-xl font-medium">Photo</p>
                                   <p className=" text-blue-500 text-base">See more photo</p>
                              </div>
                              {
                                   PostData.length > 0 && PostData ? (
                                        <div className=" grid md:grid-cols-3  gap-3"> {PostData.map(item => <div className=" " key={item._id} >
                                             <img className=" w-full h-40 object-cover  rounded-md overflow-hidden " src={item.image} alt="" />
                                        </div>)} </div>
                                   ) : (<NotFound text={"Post not found please post"}></NotFound>)
                              }
                         </div>

                         <h1>    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus exercitationem dolorum id, maxime corrupti alias sint sapiente incidunt suscipit obcaecati ab labore ratione harum voluptate aperiam rerum ducimus nisi

                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus exercitationem dolorum id, maxime corrupti alias sint sapiente incidunt suscipit obcaecati ab labore ratione harum voluptate aperiam rerum ducimus nisi</h1> . Quis.
                    </div>
                    <div className=" col-span-3 ">
                         <div className=" my-5">
                              <CreatePost></CreatePost>
                         </div>

                         {
                              PostData && PostData.length > 0 ? (<div>
                                   {
                                        PostData?.map(item => <Post key={item._id} post={item}></Post>)
                                   }
                              </div>) : (<NotFound text={"Post not found please post"}></NotFound>)
                         }


                    </div>
               </div>
          </div>
     );
};

export default ProfilePost;