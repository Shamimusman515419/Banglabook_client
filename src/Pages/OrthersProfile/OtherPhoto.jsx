import React, { useContext } from 'react';
import PostApi from '../../Component/Api/PostApi';
import NotFound from '../../Component/PostNotFoun/NotFound';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';



const OtherPhoto = () => {
     const [userinfo, setUserinfo] = useState({})
     const [data, refetch, isLoading] = PostApi();
     const params = useParams();
     console.log(params);

     useEffect(() => {
          fetch(`https://banglabook-server.vercel.app/userId/${params?.id}`).then(res => res.json()).then(data => {
               setUserinfo(data)
          })

     }, [params?.id])


     const AllPost = data?.data;
     const MyPost = AllPost?.filter(item => item.email == userinfo?.email);
     let PostData = MyPost?.sort((a, b) => new Date(b.date) - new Date(a.date));
     console.log(PostData);

     console.log(PostData);
     return (
          <div>

               {
                    PostData?.length > 0 && PostData ? (
                         <div className="  flex  flex-wrap gap-3"> {PostData.map(item => <div className=" " key={item._id} >
                              <img className={` w-60  h-72 object-cover  rounded-md overflow-hidden  ${item?.video ? "hidden" : "block"}`} src={item?.image} alt="" />
                         </div>)} </div>

                    ) : (<NotFound text={"Post not found please post"}></NotFound>)
               }
          </div>
     );
};

export default OtherPhoto;