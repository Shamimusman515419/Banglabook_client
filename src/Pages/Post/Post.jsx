
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";


import { FiX, FiMoreHorizontal } from 'react-icons/fi';
import { PiCloudFog, PiShareFatBold } from 'react-icons/pi';
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import PostApi from "../../Component/Api/PostApi";
import 'sweetalert2/dist/sweetalert2.css';

const Post = ({ post }) => {
     const [data, refetch, isLoading] = PostApi();
     const [axiosSecure] = useAxiosSecure();
     const { name, description, activity, PostItem, userImage, _id } = post;

     const handleLike = () => {
          axiosSecure.put('/post');
     }
     const videoRef = useRef(null);
     const [isPlaying, setIsPlaying] = useState(false);

     const handleDelete = (_id) => {


          const swalWithBootstrapButtons = Swal.mixin({
               customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
               },
               buttonsStyling: false
          })

          swalWithBootstrapButtons.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Yes, delete it!',
               cancelButtonText: 'No, cancel!',
               reverseButtons: true
          }).then((result) => {
               if (result.isConfirmed) {
                    axios.delete(`http://localhost:5000/post/:${_id}`).then(result => {
                         console.log(result);
                         if (result.deletedCount) {
                              refetch();
                              swalWithBootstrapButtons.fire(
                                   'Deleted!',
                                   'Your file has been deleted.',
                                   'success'
                              )
                         }
                    }).catch(error => {
                         console.log(error);
                    })


               } else if (

                    result.dismiss === Swal.DismissReason.cancel
               ) {
                    swalWithBootstrapButtons.fire(
                         'Cancelled',
                         'Your imaginary file is safe :)',
                         'error'
                    )
               }
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

     return (
          <div className=" shadow-md rounded-xl ">
               <div className=" p-2 flex   justify-between gap-2">
                    <div>
                         <div className="  flex  items-start  gap-2  justify-start space-y-1">

                              <img className=" h-9 w-9 rounded-full " src={userImage} alt="" />
                              <p className=" text-lg text-black font-semibold"> {name} <span className="text-lg  font-normal"> {PostItem}</span> <span className="text-lg  font-normal"> /  {activity}</span>  </p>


                         </div>
                    </div>
                    <div className=" flex justify-center items-center gap-5 -mt-6 md:mt-0 ">

                         <div className="rounded-full p-2  hover:bg-[#e2dddd]">
                              <FiMoreHorizontal size={24} className="  cursor-pointer"></FiMoreHorizontal>
                         </div>
                         <FiX onClick={() => handleDelete(_id)} size={24} className=" cursor-pointer"></FiX>
                    </div>
               </div>

               <div>
                    <p className=" text-black text-base font-medium">{description} </p>

                    {
                         post?.video ? <video ref={videoRef} controls={isPlaying} muted loop ref={videoRef} controls={isPlaying} >   <source src={post?.video} type="video/mp4"></source> </video> : <img className=" w-full max-h-[400px] my-2" src={post?.image} alt="" />
                    }

               </div>

               <div className=" p-2">
                    <hr className=" my-2 p-2 " />
                    <div className=" flex   items-center  justify-around gap-5">
                         <div onClick={() => handleLike(_id)} className=" hover:bg-[#bbb9b9d4] px-2 py-1 rounded-lg w-full cursor-pointer flex  gap-2 items-center justify-center">
                              <FaRegHeart size={24}></FaRegHeart>
                              <p className=" font-medium text-base"> Love</p>
                         </div>
                         <div className="  hover:bg-[#bbb9b9d4] px-2 py-1 rounded-lg w-full cursor-pointer flex  gap-2 items-center justify-center">
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
          </div>
     );
};

export default Post;