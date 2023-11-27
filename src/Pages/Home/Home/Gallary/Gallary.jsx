import { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";


const Gallery = () => {
     const [Story, setStory] = useState([])

     useEffect(() => {
          fetch('https://banglabook-server.vercel.app/story').then(res => res.json()).then(data => {
               const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
               setStory(sortedData);
          })

     }, []);

     return (
          <div className="  shadow-lg rounded-lg my-2 p-2">
               <div className=" my-2 flex justify-between items-center">
                    <div className=" flex justify-between gap-3 items-center" >
                    <h1 className=" font-bold text-2xl f my-2"> Gallery </h1>
                    <div>
                         <p className=" text-xl  font-medium">{Story.length}+ Photo</p>
                    </div>
                    </div>
                    <div className=" cursor-pointer ">
                         <AiOutlineSetting size={24} className=" text-blue-400"></AiOutlineSetting>
                    </div>
               </div>

               <div className=" grid grid-cols-3 gap-3">
                    {Story.slice(0,9).map(item=> <div key={item?._id}> 
                     <img className="  w-full h-[120px]  rounded-md"  src={item?.storyImage} alt="" />
                     
                    </div>)}
               </div>

          </div>
     );
};

export default Gallery;