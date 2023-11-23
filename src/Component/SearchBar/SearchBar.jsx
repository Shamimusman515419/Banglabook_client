
import NotFound from "../PostNotFoun/NotFound";
import { useContext } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const SearchBar = () => {
     const { setSearchBarOpen } = useContext(AuthContext)
     const [alluser, setAlluser] = useState([])

     const [searchName, setSearchName] = useState("")

     useEffect(() => {


          axios.get(`https://banglabook-server.vercel.app/alluser?name=${searchName} `)
               .then(response => {

                    setAlluser(response.data)
               })
               .catch(error => {
                    console.error('Error:', error);
               });

     }, [searchName])


     return (
          <div className="  max-w-[300px]">

               <div className=" my-4">

                    <div className=" flex justify-center items-center gap-5">
                         <div onClick={() => setSearchBarOpen(false)} className=" cursor-pointer">
                              <FaArrowLeft size={22} />
                         </div>
                         <div>
                              <input onChange={(e) => setSearchName(e.target.value)} className=" w-full border-none  outline-none  text-black py-2 px-3 rounded-xl bg-[#0002]" type="text" placeholder="Search name" name="" id="" />
                         </div>
                    </div>

               </div>
               <hr className=" h-[2px] bg-[#10080896]" />

               <div className="   h-[80vh]   overflow-y-auto  border-black border-b-2 ">
                    {
                         alluser && alluser?.length > 0 ? (<div>
                              {
                                   alluser?.map(item => <div onClick={() => setSearchBarOpen(false)} key={item?._id}> <Link to={`/otherProfile/profile/${item?._id}`} className="  py-2 px-3 hover:bg-[#00000027]  rounded-md mt-2 cursor-pointer  gap-2  flex  items-center">

                                        <div>
                                             <img className=" h-10 w-10 rounded-full " src={item?.image} alt="" />
                                        </div>
                                        <div>
                                             <h1 className=" text-base font-medium">{item?.name} </h1>
                                        </div>

                                   </Link>
                                        <hr />
                                   </div>)
                              }
                         </div>) : (<NotFound text={" User  not found "}></NotFound>)
                    }
               </div>

          </div>
     );
};

export default SearchBar;