import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../Component/Authprovider/Authprovider";
const CreateStory = () => {
const {user}=useContext(AuthContext)
     return (
          <><Link  to={'/createStory'}>
               <div className=" cursor-pointer h-60 w-full border-2 rounded-lg relative ">
                    <div className=" relative text-center ">
                         <img className=" relative w-full  h-44 object-cover " src={user?.photoURL
} alt="" />

                         <div className="  flex justify-center items-center ">
                              <AiOutlinePlus className=" w-10" size={26}></AiOutlinePlus>
                         </div>

                         <h1> Create Story</h1>
                        
                    </div>
               </div>
          </Link>
          </>

     );
};

export default CreateStory;