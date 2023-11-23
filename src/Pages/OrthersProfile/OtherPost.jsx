
import Post from "../Post/Post";
import PostApi from "../../Component/Api/PostApi";
import NotFound from "../../Component/PostNotFoun/NotFound";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


const OtherPost = () => {
     const params = useParams();
     const [data, refetch, isLoading] = PostApi();
     const [userinfo, setUserinfo] = useState({})
     console.log(userinfo);

     useEffect(() => {
          fetch(`http://localhost:5000/userId/${params?.id}`).then(res => res.json()).then(data => {
               setUserinfo(data)
          })

     }, [params?.id]);


     const AllPost = data?.data;
     console.log(AllPost);
     const MyPost = AllPost?.filter(item => item?.email == userinfo?.email);
     let PostData = MyPost?.sort((a, b) => new Date(b.date) - new Date(a.date));
     console.log(PostData);

     console.log(MyPost);
     return (
          <div>
               <div className=" grid md:grid-cols-5 gap-3 ">
                    <div className=" col-span-2 md:block hidden">

                         <div className=" postShadwo p-3">
                              <div className=" gap-2 my-3  flex justify-between items-center">
                                   <p className=" text-xl font-medium">Photo</p>
                                   <p className=" text-blue-500 text-base">See more photo</p>
                              </div>
                              {
                                   PostData?.length > 0 && PostData ? (
                                        <div className=" flex  flex-wrap gap-3"> {PostData.map(item => <div className=" " key={item._id} >
                                             <img className={`w-40 h-40 object-cover  rounded-md overflow-hidden  ${item?.video ? "hidden" : "block"}`} src={item.image} alt="" />
                                        </div>)} </div>
                                   ) : (<NotFound text={"Post not found please post"}></NotFound>)
                              }
                         </div>

                    </div>
                    <div className=" col-span-3 ">


                         {
                              PostData && PostData?.length > 0 ? (<div>
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

export default OtherPost;