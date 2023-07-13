import React from 'react';

const Comment = ({ CommentData }) => {



     const { name, img, commentText } = CommentData;

     return (
          <div className=' my-4'>
               <div className=' flex justify-start  gap-4'>
                    <img className=' h-12 w-12 rounded-full p-2 ' src={img} alt="" />
                    <div className='bg-[#E7F3FF]   p-2 rounded-xl'>
                         <p className='  font-semibold text-xl text-black '> {name} <span className=' cursor-pointer text-blue-400 text-base'> follow</span> </p>
                         <p className=' text-base font-medium'> {commentText}</p>
                    </div>
               </div>

          </div>
     );
};

export default Comment;