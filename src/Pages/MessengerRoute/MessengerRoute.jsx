import { useState } from "react";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import Messanger from "../Home/Massanger/Massanger";
import ChatBoxBig from "./ChatBoxBig";

const MessengerRoute = () => {
     const [axiosSecure] = useAxiosSecure();
     const [openMessanger, setOpenmessanger] = useState(false);
     const [currentUser, setCurrentUser] = useState("");

     const handleMessage = (eamil) => {
          console.log(eamil);
          axiosSecure.get(`/user/${eamil}`).then(result => {
               // console.log(result.data);
               setCurrentUser(result.data)
               setOpenmessanger(true)

          }).catch(error => {
               console.log(error);
          })
     }
     console.log(currentUser, "dfgadfdfd");


     return (
          <div className="   grid md:grid-cols-4 gap-4 ">



               <div className=" md:col-span-1">
                    <Messanger handleMessage={handleMessage}></Messanger>

                    {openMessanger ?
                         <div className=" block md:hidden">
                              <div className="  w-full    fixed top-6   z-50   right-2 flex justify-center items-center       md:w-3/5  ">
                                   <ChatBoxBig setOpenmessanger={setOpenmessanger} currentUser={currentUser}></ChatBoxBig>
                              </div>
                         </div> : ""
                    }

               </div>
               <div className="  md:col-span-3 hidden md:block">
                    {
                         currentUser ? <> <div className="  w-full    mt-14   z-50   right-2 flex justify-center items-center       ">
                              <ChatBoxBig setOpenmessanger={setOpenmessanger} currentUser={currentUser}></ChatBoxBig>
                         </div></> : <div className=" flex justify-center items-center min-h-[1000px] gap-2">

                               <div className=" w-[400px] h-[400px] rounded-full flex  justify-center  items-center gap-1 bg-[#CCCFD2]">
                                   <h1 className=" text-2xl   md:text-4xl font-bold  textColor"> No chats selected</h1>
                               </div>
                         </div>
                    }

               </div>


          </div>
     );
};

export default MessengerRoute;