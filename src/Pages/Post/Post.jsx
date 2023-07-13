
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";


import { FiX, FiMoreHorizontal } from 'react-icons/fi';
import { PiCloudFog, PiShareFatBold } from 'react-icons/pi';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { BsBookmark, BsEmojiFrown } from 'react-icons/bs';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { AiOutlineSend, AiOutlineGift } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import { useContext, useEffect, useRef, useState } from "react";

import Swal from 'sweetalert2'
import PostApi from "../../Component/Api/PostApi";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import Comment from "./Comment";

// import 'sweetalert2/src/sweetalert2.scss'

const Post = ({ post }) => {
     const { user } = useContext(AuthContext);
     const LikeUser = user?.email;
     const [data, refetch, isLoading] = PostApi();
     const [axiosSecure] = useAxiosSecure();
     const { name, description, activity, comment, PostItem, userImage, _id, like, likeEmail } = post;
     const [open, setOpen] = useState(false)
     const [isPlaying, setIsPlaying] = useState(false);
     const [openDelete, setOpenDelete] = useState(false)
     const [commentText, setCommentText] = useState("")
     const [commentOpen, setCommentOpen] = useState(false)
     const update = { like, likeEmail, LikeUser }

   


     // handleLike api 
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

     const videoRef = useRef(null);


     // handleDelete function 
     const handleDelete = (_id) => {

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


     }

     // commentText  function 




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

     if (!likeEmail) {
          return
     }
     const Email = likeEmail.find(email => email == user?.email);
     console.log(like);
     return (
          <div className={`shadow-md rounded ${open ? " hidden " : "black"}`}>
               <div className=" relative p-2 flex   justify-between gap-2">
                    <div>
                         <div className="  flex  items-start  gap-2  justify-start space-y-1">

                              <img className=" h-9 w-9 rounded-full " src={userImage} alt="" />
                              <p className=" text-lg text-black font-semibold"> {name} <span className="text-lg  font-normal"> {PostItem}</span> <span className="text-lg  font-normal"> /  {activity}</span>  </p>

                         </div>
                    </div>
                    <div className="  flex justify-center items-center gap-5 -mt-6 md:mt-0 ">

                         <div onClick={() => setOpenDelete(!openDelete)} className="rounded-full p-2  hover:bg-[#e2dddd]">

                              <FiMoreHorizontal size={24} className="  cursor-pointer"></FiMoreHorizontal>


                         </div>
                         <div className={` ${openDelete ? "block" : "hidden"} absolute py-3 px-4  right-4 top-11 bg-white rounded-lg shadow-lg `} >
                              <div onClick={() => handleDelete(_id)} className=" hover:bg-[#F2F2F2]  rounded-md pt-2 px-2  cursor-pointer flex justify-start items-center gap-3">
                                   <RiDeleteBin6Line size={18}></RiDeleteBin6Line>
                                   <p className=" text-lg  font-medium"> Delete post</p>

                              </div>
                              <hr className=" my-2" />
                              <div className=" hover:bg-[#F2F2F2]  rounded-md p-1 px-2  cursor-pointer flex justify-start items-center gap-3">
                                   <BsBookmark size={18}></BsBookmark>
                                   <p className=" text-lg  font-medium"> Save post</p>

                              </div>
                              <hr className=" my-2" />
                              <div className=" hover:bg-[#F2F2F2]  rounded-md pb-2 px-2  cursor-pointer flex justify-start items-center gap-3">
                                   <BiEdit size={18}></BiEdit>
                                   <p className=" text-lg  font-medium"> Edit post</p>

                              </div>
                         </div>
                         <FiX onClick={() => setOpen(true)} size={24} className=" cursor-pointer"></FiX>
                    </div>
               </div>

               <div>
                    <p className=" text-black text-base font-medium">{description} </p>

                    {
                         post?.video ? <video ref={videoRef} controls={isPlaying} muted loop ref={videoRef} controls={isPlaying} >   <source src={post?.video} type="video/mp4"></source> </video> : <img className=" w-full max-h-[400px] my-2" src={post?.image} alt="" />
                    }

               </div>

               <div className=" p-2">
                    <div className="  flex justify-between items-center gap-2">
                         <div>
                         {like >= 0 ? <div className=" cursor-pointer"> {like} Other </div> : ""}
                         </div>
                         <div>
                              { comment.length >= 0 ? <div> {comment.length} Other comment </div> : ""}
                         </div>
                    </div>
                   
                    <hr className=" my-2 p-2 " />
                    <div className=" flex   items-center  justify-around gap-5">
                         <button disabled={Email}  onClick={() => handleLike(_id)} className="  hover:bg-[#bbb9b9d4] px-2 py-1 rounded-lg w-full cursor-pointer flex  gap-2 items-center justify-center">
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
                                        <img className=" h-8 w-8 rounded-full  object-cover" src={userImage} alt="" />

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
                                                  <button onClick={() => handleCommnetSubmit(_id)}> <AiOutlineSend size={24} className=" text-[#0a64e2] cursor-pointer"></AiOutlineSend>  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <div>
                                   <hr />
                                   {comment && comment?.map((item, index) => <Comment CommentData={item} key={index}></Comment>)}
                              </div>
                         </div>
                    }

               </div>
          </div>
     );
};

export default Post;