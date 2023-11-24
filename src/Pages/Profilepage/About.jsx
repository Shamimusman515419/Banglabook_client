import { useContext } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import CreatePost from "../Post/CreatePost";
import Post from "../Post/Post";
import NotFound from "../../Component/PostNotFoun/NotFound";
import PostApi from "../../Component/Api/PostApi";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";

const About = () => {
     const { user, userinfo } = useContext(AuthContext);

     const [data, refetch, isLoading] = PostApi();
     const AllPost = data?.data;
     const MyPost = AllPost?.filter(item => item.email == user?.email);
     let PostData = MyPost?.sort((a, b) => new Date(b.date) - new Date(a.date));

     return (
          <div className=" grid md:grid-cols-5 gap-5 items-start md:gap-8 ">
               <div className=" col-span-2  p-3 rounded-md">

                    <div className=" postShadwo p-3 rounded-md">
                         <h1 className=" text-center text-base md:text-2xl   font-medium text-black "> {userinfo?.boi} </h1>
                         <div className="  my-4  cursor-pointer text-center bgColor px-4 py-2 rounded-md text-xl  md:text-xl  font-normal">
                              <Link to={'/setting'}> Edit boi</Link>
                         </div>
                    </div>

                    <div className=" postShadwo my-3  p-3 rounded-md">
                         <h1 className=" text-base md:text-2xl font-medium"> Social media</h1>

                         <div >

                              {
                                   userinfo?.media?.length > 0 ? <div>

                                        {
                                             userinfo?.media?.map(item => <div className="  py-3 flex  overflow-hidden items-center justify-start gap-5" key={item?.mediaName}
                                             >
                                                  <div>
                                                       <TbWorld size={24} />
                                                  </div>
                                                  <Link target="_blank" className=" text-[#0389C9]" to={item?.mediaLink}> {item?.mediaLink} </Link>

                                             </div>)
                                        }

                                   </div> : <div className=" mt-5 text-center">
                                        <Link to={'/setting'} className="  my-4  cursor-pointer text-center bgColor px-4 py-2 rounded-md text-xl  md:text-xl  capitalize font-normal" > add Social media</Link>
                                   </div>
                              }

                         </div>

                    </div>
                    <div>
                         {
                              userinfo?.address ? <div className=" postShadwo p-3 rounded-md">
                                   <h1 className=" text-center text-base md:text-2xl   font-medium text-black "> {userinfo?.address} </h1>

                              </div> : null
                         }
                    </div>


               </div>

               <div className=" col-span-3  w-full  overflow-hidden">
                    <div className=" my-5">
                         <CreatePost></CreatePost>
                    </div>

                    {
                         PostData && PostData?.length > 0 ? (<div className="  w-full  overflow-hidden">
                              {
                                   PostData?.map(item => <Post key={item._id} post={item}></Post>)
                              }
                         </div>) : (<NotFound text={"Post not found please post"}></NotFound>)
                    }

               </div>

          </div>
     );
};

export default About;