import { useState } from "react";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import ChatBox from "../Home/Massanger/ChatBox";
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

     return (
          <div className="   gap-4 ">


               <Messanger handleMessage={handleMessage}></Messanger>

               {openMessanger ?
                     <div className=" block md:hidden">
                         <div className="  w-full    fixed top-6   z-50   right-2 flex justify-center items-center       md:w-3/5  ">
                         <ChatBoxBig setOpenmessanger={setOpenmessanger} currentUser={currentUser}></ChatBoxBig>
                    </div>
                     </div>  : ""
               }

               <div className=" hidden md:block">
                    <div className="  w-full    fixed top-16   z-50   right-2 flex justify-center items-center       md:w-3/5  ">
                         <ChatBoxBig setOpenmessanger={setOpenmessanger} currentUser={currentUser}></ChatBoxBig>
                    </div>
               </div>


          </div>
     );
};

export default MessengerRoute;