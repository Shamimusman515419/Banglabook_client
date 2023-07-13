

import CreatePost from "../../Post/CreatePost";
import Post from "../../Post/Post";
import Story from "../CreateStory/Story";

import PostApi from "../../../Component/Api/PostApi";
import { AiOutlineSetting } from "react-icons/ai";
import SuggestFriend from "../SuggestFrind/SuggestFrind";
import Group from "./Group/Group";
import Weather from "../Weather/Weather";
import HappyBirthday from "./HappyBirday/HappyBirday";
import Gallery from "./Gallary/Gallary";
import Games from "../Games/Games";
import Messanger from "../Massanger/Massanger";

const Home = () => {
   const [data, refetch, isLoading] = PostApi();

   let PostData = data?.data.sort((a, b) => new Date(b.date) - new Date(a.date));

   return (


      <div className="   p-2 block md:grid md:grid-cols-7 gap-4 mt-5  w-full">
         <div className=" col-span-7 lg:col-span-5 ">
            <Story></Story>

            <div className="   grid md:grid-cols-7  gap-5">
               <div className=" hidden md:block  z-40  md:col-span-3 lg:col-span-2 ">
                  <div className=" sticky top-16">

                     <div className="  p-3  shadow-lg rounded-lg">
                        <div className=" mt-4 flex  justify-between items-center">
                           <h1 className=" font-semibold text-xl  text-[#343131] bg-white"> Friend Suggestion</h1>
                           <AiOutlineSetting className=" text-blue-500"></AiOutlineSetting>
                        </div>

                        <div className=" mt-3">
                           <SuggestFriend></SuggestFriend>
                        </div>
                     </div> 
                     <Group></Group>
                     <div className=" shadow-lg  rounded-md">
                        <Weather></Weather>
                     </div>

                     

                  </div>
               </div>
               <div className=" max-w-[3000px]  overflow-y-auto   md:col-span-4 lg:col-span-3">
                  <CreatePost></CreatePost>
                  <div className=" mt-3">

                     {PostData && PostData.map(item => <Post key={item._id} post={item}></Post>)}
                  </div>
               </div>
               <div className="  sticky top-0  bottom-0  hidden md:block md:col-span-3 lg:col-span-2 ">
                  <div className=" sticky top-16 ">
                    <HappyBirthday></HappyBirthday>
                    <Gallery></Gallery>
                    <Games></Games>

                  </div>
               </div>
            </div>

           
         </div>
         <div className=" hidden lg:block lg:col-span-2">
           <div className="  sticky top-16 ">
           <Messanger></Messanger>
           </div>
         </div>
      </div>


   );
};

export default Home;