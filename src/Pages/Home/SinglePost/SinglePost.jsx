
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";


import { FiX, FiMoreHorizontal } from 'react-icons/fi';
import { PiShareFatBold } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { BsBookmark, BsEmojiFrown } from 'react-icons/bs';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { AiOutlineSend, AiOutlineGift } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';

import { useContext, useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2'

import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
import PostApi from "../../../Component/Api/PostApi";
import useAxiosSecure from "../../../Component/AsioxSecures/useAxiosSecure";
import Comment from "../../Post/Comment";
import EditPost from "../../Post/EditPost";

const SinglePost = () => {
     const params = useParams();
     const router = useNavigation();
     const { user } = useContext(AuthContext);
     const [showPost, setShopPost] = useState(false)
     const LikeUser = user?.email;
     const route = useNavigate();
     const [data, refetch, isLoading] = PostApi();
     const [axiosSecure] = useAxiosSecure();
     const [open, setOpen] = useState(false);
     const [isPlaying, setIsPlaying] = useState(false);
     const [post, setPost] = useState("");
     const [openDelete, setOpenDelete] = useState(false);
     const [openEdit, setOpenEdit] = useState(false)
     const [commentText, setCommentText] = useState("");
     const [commentOpen, setCommentOpen] = useState(false);
     const [otherPhoto, setOtherPhoto] = useState([]);
     const [value, setValue] = useState("");





     const update = { like: post?.like, likeEmail: post?.likeEmail, LikeUser }
     const userData = post?.user;
     const comment = post?.comment;
     const email = post?.email;
     const _id = post?._id;
     const postInfo = userData?.[0];
     const handleLike = (id) => {
          axiosSecure.patch(`/post/${id}`, update).then(result => {
               console.log(result.data.modifiedCount)
               if (result.data.modifiedCount) {
                    refetch();
               }
          }).catch(error => {
               console.log(error.massage);
          })
     }
     useEffect(() => {
          const AllPost = data?.data;
          const singleData = AllPost?.find(item => item?._id == params?.id);
          const DataPost = AllPost?.filter(item => item?.email == email);
          setPost(singleData)
          setOtherPhoto(DataPost)
     }, [params, data, user, email]);
     const videoRef = useRef(null);
     // handleDelete function 
     const handleDelete = ({ _id, email }) => {

          if (email === user?.email) {
               setOpenDelete(true)
               Swal.fire({
                    title: 'Are you sure?',
                    text: "Do you want to delete the post?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
               }).then((result) => {
                    if (result.isConfirmed) {
                         axiosSecure.delete(`/post/${_id}`).then(result => {
                              console.log(result);
                              if (result.data) {
                                   refetch();
                                   setOpenDelete(false)
                                   Swal.fire(
                                        'Deleted!',
                                        'Your Post has been deleted.',
                                        'success'
                                   )
                              }
                         }).catch(error => {
                              Swal.fire({
                                   icon: 'error',
                                   title: `${error.massage}`,
                                   text: 'Something went wrong!',

                              })

                         })

                    }
               })
          } else {
               Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Sorry, this is not your post, someone else s post  You cannot delete",

               });


          }



     }

     const handleCommnetSubmit = (id) => {
          const CommentData = { commentText, img: user?.photoURL, name: user?.displayName, email: user?.email }
          const commentUpdate = { CommentData, comment };
          axiosSecure.patch(`/postComment/${id}`, commentUpdate).then(result => {
               console.log(result.data.modifiedCount)
               if (result.data.modifiedCount) {
                    refetch();
                    setCommentOpen(false)
               }
          }).catch(error => {
               console.log(error.massage);
          })

     }


     useEffect(() => {
          const handleScroll = () => {
               const videoElement = videoRef.current;
               const rect = videoElement.getBoundingClientRect();
               const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

               if (isVisible && !isPlaying) {
                    videoElement.play();
                    setIsPlaying(true);
               } else if (!isVisible && isPlaying) {
                    videoElement.pause();
                    setIsPlaying(false);
               }
          };

          window.addEventListener('scroll', handleScroll);

          return () => {
               window.removeEventListener('scroll', handleScroll);
          };
     }, [isPlaying]);

     if (!post?.likeEmail) {
          return
     }
     const Email = post?.likeEmail.find(email => email == user?.email);

     console.log(showPost);

     return (


          <div className=" max-w-[1100px] py-5 mx-auto  min-h-[1000px] flex items-center gap-2">

               <div>


                    <div className="    grid md:grid-cols-2 gap-8 border  rounded">


                         <div className=" md:hidden block">
                              <div>
                                   {
                                        showPost ? <div onMouseLeave={() => setShopPost(false)} onMouseOver={() => setShopPost(true)} className=" w-full absolute   bg-white z-40   md:max-w-[400px]  top-4 left-4 p-4    rounded-xl  postShadwo ">

                                             <div className=" flex   flex-col   gap-3">

                                                  <div className=" text-center mx-auto">
                                                       <img onClick={() => route(`/otherProfile/profile/${postInfo?._id ? postInfo?._id : ""}`)} className=" cursor-pointer w-[120px] rounded-full h-[120px]  text-base " src={postInfo?.image} alt="" />
                                                  </div>
                                                  <div className="  mt-2  text-center ">
                                                       <Link to={`/otherProfile/profile/${postInfo?._id ? postInfo?._id : ""}`} className=" text-base hover:underline    md:text-xl  font-medium"> {postInfo?.name} </Link>

                                                       <div>
                                                            <p>
                                                                 <Link to={`/otherProfile/profile/${postInfo._id}`} > {postInfo?.followers?.length ? postInfo?.followers?.length : 0} followers </Link> •  <Link to={`/otherProfile/profile/${postInfo._id}`}>  {postInfo?.following?.length ? postInfo?.following?.length : 0} following</Link> </p>
                                                       </div>
                                                  </div>

                                                  <div className="  text-center text-base textColor capitalize   md:text-lg">
                                                       {
                                                            postInfo?.address ? <p>{postInfo?.address}</p> : "new user"
                                                       }
                                                  </div>
                                                  <div className="  text-center text-base textColor capitalize   md:text-lg">
                                                       {
                                                            postInfo?.address ? <p>{postInfo?.collage}</p> : ""
                                                       }
                                                  </div>




                                             </div>


                                             <div className=" w-full">
                                                  <button className=" w-full secondCommonButton my-3"> Following</button>
                                                  <button className=" w-full secondCommonButton my-3"> Massage</button>
                                             </div>


                                        </div> : null
                                   }


                              </div>
                              <div className=" w-full  relative p-2 flex   justify-between gap-2">
                                   <Link to={`/otherProfile/profile/${postInfo?._id ? postInfo?._id : ""}`}>
                                        <div className="  flex  items-start  gap-2  justify-start space-y-1">

                                             <img className=" h-9 w-9 rounded-full " src={postInfo?.image ? postInfo?.image : ""} alt="" />
                                             <p onMouseLeave={() => setShopPost(false)} onMouseOver={() => setShopPost(true)} className=" hover:underline text-base  md:text-lg text-black font-semibold"> {postInfo?.name ? postInfo?.name : ""} <span className="text-[12px]  md:text-sm font-normal"> {post?.PostItem}</span> <span className="text-[12px]  md:text-sm  font-normal"> /  {post?.activity}</span>  </p>

                                        </div>
                                   </Link>
                                   <div>

                                   </div>
                                   <div className="  flex justify-center items-center gap-5 -mt-6 md:mt-0 ">
                                        <div onClick={() => setOpenDelete(!openDelete)} className="rounded-full p-2  hover:bg-[#e2dddd]">

                                             <FiMoreHorizontal size={24} className="  cursor-pointer"></FiMoreHorizontal>


                                        </div>
                                        <div className={` ${openDelete ? "block" : "hidden"} absolute py-3 px-4  right-4 top-11 bg-white rounded-lg shadow-lg `} >
                                             {user?.email == postInfo?.email ? <div onClick={() => handleDelete({ _id, email })} className=" hover:bg-[#F2F2F2]  rounded-md pt-2 px-2  cursor-pointer flex justify-start items-center gap-3">
                                                  <RiDeleteBin6Line size={18}></RiDeleteBin6Line>
                                                  <p className=" text-lg  font-medium"> Delete post</p>

                                             </div> : null
                                             }


                                             <hr className=" my-2" />
                                             <div className=" hover:bg-[#F2F2F2]  rounded-md p-1 px-2  cursor-pointer flex justify-start items-center gap-3">
                                                  <BsBookmark size={18}></BsBookmark>
                                                  <p className=" text-lg  font-medium"> Save post</p>

                                             </div>
                                             <hr className=" my-2" />
                                             {
                                                  user?.email == postInfo?.email ? <div onClick={() => setOpenEdit(true)} className=" hover:bg-[#F2F2F2]  rounded-md pb-2 px-2  cursor-pointer flex justify-start items-center gap-3">
                                                       <BiEdit size={18}></BiEdit>
                                                       <p className=" text-lg  font-medium"> Edit post</p>

                                                  </div> : null
                                             }

                                        </div>
                                        <FiX onClick={() => setOpen(true)} size={24} className=" cursor-pointer"></FiX>
                                   </div>
                              </div>
                         </div>
                         <div className="  md:hidden hidden ">
                              <p className=" text-black text-sm md:text-base font-medium">{post?.description} </p>
                         </div>



                         <div className=" w-full h-[400px] md:h-[700px]  ">
                              {
                                   post?.video ? <video className="  w-full h-full overflow-hidden  object-cover" ref={videoRef} controls={isPlaying} muted loop ref={videoRef} controls={isPlaying} >   <source src={post?.video} type="video/mp4"></source> </video> : <img className=" w-full h-full  object-cover" src={post?.image} alt="" />
                              }
                         </div>

                         <div className={`w-full overflow-hidden rounded relative  block`}>

                              <div className=" hidden md:block">
                                   <div>
                                        {
                                             showPost ? <div onMouseLeave={() => setShopPost(false)} onMouseOver={() => setShopPost(true)} className=" w-full absolute   bg-white z-40   md:max-w-[400px]  top-4 left-4 p-4    rounded-xl  postShadwo ">

                                                  <div className=" flex   flex-col   gap-3">

                                                       <div className=" text-center mx-auto">
                                                            <img onClick={() => route(`/otherProfile/profile/${postInfo?._id ? postInfo?._id : ""}`)} className=" cursor-pointer w-[120px] rounded-full h-[120px]  text-base " src={postInfo?.image} alt="" />
                                                       </div>
                                                       <div className="  mt-2  text-center ">
                                                            <Link to={`/otherProfile/profile/${postInfo?._id ? postInfo?._id : ""}`} className=" text-base hover:underline    md:text-xl  font-medium"> {postInfo?.name} </Link>

                                                            <div>
                                                                 <p>
                                                                      <Link to={`/otherProfile/profile/${postInfo._id}`} > {postInfo?.followers?.length ? postInfo?.followers?.length : 0} followers </Link> •  <Link to={`/otherProfile/profile/${postInfo._id}`}>  {postInfo?.following?.length ? postInfo?.following?.length : 0} following</Link> </p>
                                                            </div>
                                                       </div>

                                                       <div className="  text-center text-base textColor capitalize   md:text-lg">
                                                            {
                                                                 postInfo?.address ? <p>{postInfo?.address}</p> : "new user"
                                                            }
                                                       </div>
                                                       <div className="  text-center text-base textColor capitalize   md:text-lg">
                                                            {
                                                                 postInfo?.address ? <p>{postInfo?.collage}</p> : ""
                                                            }
                                                       </div>




                                                  </div>


                                                  <div className=" w-full">
                                                       <button className=" w-full secondCommonButton my-3"> Following</button>
                                                       <button className=" w-full secondCommonButton my-3"> Massage</button>
                                                  </div>


                                             </div> : null
                                        }


                                   </div>
                                   <div className=" w-full  relative p-2 flex   justify-between gap-2">
                                        <Link to={`/otherProfile/profile/${postInfo?._id ? postInfo?._id : ""}`}>
                                             <div className="  flex  items-start  gap-2  justify-start space-y-1">

                                                  <img className=" h-9 w-9 rounded-full " src={postInfo?.image ? postInfo?.image : ""} alt="" />
                                                  <p onMouseLeave={() => setShopPost(false)} onMouseOver={() => setShopPost(true)} className=" hover:underline text-base  md:text-lg text-black font-semibold"> {postInfo?.name ? postInfo?.name : ""} <span className="text-[12px]  md:text-sm font-normal"> {post?.PostItem}</span> <span className="text-[12px]  md:text-sm  font-normal"> /  {post?.activity}</span>  </p>

                                             </div>
                                        </Link>
                                        <div>

                                        </div>
                                        <div className="  flex justify-center items-center gap-5 -mt-6 md:mt-0 ">
                                             <div onClick={() => setOpenDelete(!openDelete)} className="rounded-full p-2  hover:bg-[#e2dddd]">

                                                  <FiMoreHorizontal size={24} className="  cursor-pointer"></FiMoreHorizontal>


                                             </div>
                                             <div className={` ${openDelete ? "block" : "hidden"} absolute py-3 px-4  right-4 top-11 bg-white rounded-lg shadow-lg `} >
                                                  {user?.email == postInfo?.email ? <div onClick={() => handleDelete({ _id, email })} className=" hover:bg-[#F2F2F2]  rounded-md pt-2 px-2  cursor-pointer flex justify-start items-center gap-3">
                                                       <RiDeleteBin6Line size={18}></RiDeleteBin6Line>
                                                       <p className=" text-lg  font-medium"> Delete post</p>

                                                  </div> : null
                                                  }


                                                  <hr className=" my-2" />
                                                  <div className=" hover:bg-[#F2F2F2]  rounded-md p-1 px-2  cursor-pointer flex justify-start items-center gap-3">
                                                       <BsBookmark size={18}></BsBookmark>
                                                       <p className=" text-lg  font-medium"> Save post</p>

                                                  </div>
                                                  <hr className=" my-2" />
                                                  {
                                                       user?.email == postInfo?.email ? <div onClick={() => setOpenEdit(true)} className=" hover:bg-[#F2F2F2]  rounded-md pb-2 px-2  cursor-pointer flex justify-start items-center gap-3">
                                                            <BiEdit size={18}></BiEdit>
                                                            <p className=" text-lg  font-medium"> Edit post</p>

                                                       </div> : null
                                                  }

                                             </div>
                                             <FiX onClick={() => setOpen(true)} size={24} className=" cursor-pointer"></FiX>
                                        </div>
                                   </div>
                              </div>

                              <div className="  hidden md:block">
                                   <p className=" text-black text-sm md:text-base font-medium">{post?.description} </p>
                              </div>


                              <hr />

                              <div className=" max-h-[500px]  md:max-h-[300px]   overflow-y-auto ">

                                   {comment  ?  <div>  { comment?.map((item, index) => <Comment CommentData={item} key={index}></Comment>)}</div>  : < h1 className=" text-base   md:text-2xl font-semibold textColor flex justify-center items-center gap-2"> No comments were made </h1>}

                              </div>




                              <div className=" p-2">
                                   <div className="  flex justify-between items-center gap-2">
                                        <div>
                                             {post?.like >= 0 ? <div className=" cursor-pointer"> {post?.like} Other </div> : ""}
                                        </div>
                                        <div onClick={() => setCommentOpen(!commentOpen)} className=" cursor-pointer">
                                             {comment.length >= 0 ? <div> {comment.length} Other comment </div> : ""}
                                        </div>
                                   </div>

                                   <hr className=" my-2 p-2 " />
                                   <div className=" flex   items-center  justify-around gap-2">
                                        <button disabled={Email} onClick={() => handleLike(post?._id)} className="  hover:bg-[#bbb9b9d4] px-2 py-1 rounded-lg w-full cursor-pointer flex  gap-2 items-center justify-center">
                                             {
                                                  Email ? <FcLike size={24}></FcLike> : <FaRegHeart size={24}></FaRegHeart>
                                             }

                                             <p className=" font-medium text-base"> Love</p>
                                        </button>

                                        <div onClick={() => setCommentOpen(!commentOpen)} className="  hover:bg-[#bbb9b9d4] px-2 py-1 rounded-lg w-full cursor-pointer flex  gap-2 items-center justify-center">
                                             <FaRegCommentDots size={24}></FaRegCommentDots>
                                             <p className=" font-medium text-base"> comment</p>
                                        </div>
                                        <div className=" hover:bg-[#bbb9b9d4] px-2 py-1 rounded-lg w-full cursor-pointer flex  gap-2 items-center justify-center">
                                             <PiShareFatBold size={24}></PiShareFatBold>
                                             <p className=" font-medium text-base">Share</p>
                                        </div>
                                   </div>
                              </div>
                              <div>
                                   <hr className=" " />
                              </div>

                              <div className="py-3">
                                   {
                                        commentOpen && <div>
                                             <div className=" flex   justify-around  flex-wrap gap-2">
                                                  <p onClick={(e) => setCommentText(e.target.textContent)} className=" p-1 px-3 rounded-xl bg-[#c3bdbda2] cursor-pointer inline-block"> ❤️❤️❤️❤️❤️</p>
                                                  <p onClick={(e) => setCommentText(e.target.textContent)} className=" p-1 px-3 rounded-xl bg-[#c3bdbda2] cursor-pointer inline-block">Congratulations!!!❤️</p>
                                                  <p onClick={(e) => setCommentText(e.target.textContent)} className=" p-1 px-3 rounded-xl bg-[#c3bdbda2] cursor-pointer inline-block">Awesome ❤️</p>
                                                  <p onClick={(e) => setCommentText(e.target.textContent)} className=" p-1 px-3 rounded-xl bg-[#c3bdbda2] cursor-pointer inline-block">Right 👍</p>
                                                  <p onClick={(e) => setCommentText(e.target.textContent)} className=" p-1 px-3 rounded-xl bg-[#c3bdbda2] cursor-pointer inline-block">Looking good 👍</p>
                                                  <p onClick={(e) => setCommentText(e.target.textContent)} className=" p-1 px-3 rounded-xl bg-[#c3bdbda2] cursor-pointer inline-block">Very nice 👍</p>
                                             </div>

                                             <div className=" my-3 flex justify-end gap-3">
                                                  <div>
                                                       <img className=" h-8 w-8 rounded-full  object-cover" src={user?.photoURL} alt="" />

                                                  </div>
                                                  <div className=" bg-[#F0F2F5] w-full p-2 rounded ">
                                                       <div>
                                                            <div>
                                                                 <textarea onChange={(e) => setCommentText(e.target.value)} value={commentText} className="w-full outline-none bg-[#F0F2F5]" name="massage" id="" ></textarea>

                                                            </div>
                                                            <div className=" flex gap-2 justify-between items-center">
                                                                 <div className=" flex gap-3">
                                                                      <BsEmojiFrown size={20} className=" text-[#0a64e2] cursor-pointer"></BsEmojiFrown>
                                                                      <MdOutlinePhotoCamera size={20} className=" text-[#0a64e2] cursor-pointer"></MdOutlinePhotoCamera>
                                                                      <AiOutlineGift size={20} className=" text-[#0a64e2] cursor-pointer"></AiOutlineGift>
                                                                 </div>
                                                                 <button onClick={() => handleCommnetSubmit(post?._id)}> <AiOutlineSend size={24} className=" text-[#0a64e2] cursor-pointer"></AiOutlineSend>  </button>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>


                                        </div>
                                   }

                              </div>
                         </div >

                    </div>

                    <h1 className=" text-base  md:text-3xl  font-semibold textColor py-6">  Other Post </h1>
                    <hr />
                    <div className=" mt-7 grid md:grid-cols-3 gap-2">

                         {
                              otherPhoto?.map(item => <div key={item?._id} className=" cursor-pointer  w-full h-[400px] rounded   ">
                                   {
                                        item?.video ? <Link to={`/post/${item?._id}`}> <video className="  w-full h-full overflow-hidden  object-cover" ref={videoRef} controls={isPlaying} muted loop ref={videoRef} controls={isPlaying} >   <source src={item?.video} type="video/mp4"></source> </video> </Link> : <Link to={`/post/${item?._id}`}>  <img onClick={() => router(`/post/${item?._id}`)} className=" w-full h-full  object-cover" src={item?.image} alt="" /> </Link>
                                   }
                              </div>)
                         }

                    </div>
                    <EditPost openEdit={openEdit} setOpenEdit={setOpenEdit} post={post}></EditPost>
               </div>
          </div >
     );
};

export default SinglePost;