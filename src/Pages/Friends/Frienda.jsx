import { useContext } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { FiMoreHorizontal } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";


const Friends = () => {

     const { user } = useContext(AuthContext);


     return (
          <div className=" w-full  p-3">
               <div className=" flex my-3   items-center justify-between  w-full    gap-4">
                    <div className=" flex items-center gap-4 w-full">
                         <img src={user?.photoURL} className="  w-12 h-12 rounded-full  border-2 border-blue-500 " />
                         <h1 className=" text-black font-medium text-xl my-1"> {user?.displayName} </h1>
                    </div>
                    <div>
                         <FiMoreHorizontal size={32}></FiMoreHorizontal>
                    </div>
               </div>
               <hr className=" p-1 " />
               <div className=" flex justify-around items-center  py-4">
                    <NavLink  to={'/friends/suggestFriends'} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"} >Suggest Friend</NavLink>
                    <NavLink to={'/friends/yourFriends'} className={({ isActive }) => isActive ? "text-lg font-medium text-blue-400" : "text-lg font-medium"} >Your Friend</NavLink>
               </div>

               <div>
                    <Outlet></Outlet>
               </div>
          </div>
     );
};

export default Friends;