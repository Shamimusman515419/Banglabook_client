import { useContext } from "react";
import Container from "../../Component/Container/Container";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import toast from "react-hot-toast";



const Setting = () => {
     const [axiosSecure] = useAxiosSecure();
     const { user, userinfo } = useContext(AuthContext);
     const [boi, setBoi] = useState("");
     const [media, setMedia] = useState([])
     const [Gender, setGender] = useState("");
     const [mediaName, setMediaName] = useState("Facebook");
     const [mediaLink, setMediaLink] = useState(null);


     const handleLink = () => {

          const data = { mediaName, mediaLink }
          setMedia([...media, data])
          setMediaLink("")
     };

     const handleSubmit = async () => {
          const fromData = { boi, media, Gender };

          axiosSecure.patch(`/users/${user?.email}`, fromData).then(result => {

               if (result) {
                    toast.success(" update Account");
                    window.location.reload()

               }
          })

     }
     return (
          <div className=" mt-14">
               <div>
                    <Container>

                         <div className=" text-center md:w-[900px] mx-auto">

                              <div className="  w-full  py-2 px-4 rounded-lg bg-[#CCCFD2] flex justify-between  items-center gap-2  ">
                                   <div className=" flex items-center gap-2">
                                        <img className=" object-cover w-16 h-16 rounded-full  border-2 border-[#0389C9]" src={user?.photoURL} alt="" />
                                        <h1 className=" text-base  md:text-xl "> {user?.displayName} </h1>
                                   </div>

                                   <div>
                                        <button className="  text-base md:text-xl  rounded-lg px-4 py-2 bgColor">Change profile</button>
                                   </div>
                              </div>

                              <div>
                                   <div className=" mt-10 ">
                                        <h1 className=" my-2  text-base  text-start md:text-2xl font-medium"> website</h1>

                                        <div className=" text-start">

                                             {
                                                  userinfo?.media?.length > 0 ? <div>

                                                       {
                                                            userinfo?.media?.map(item => <div className="  py-3 flex  items-center justify-start gap-5" key={item?.mediaName}
                                                            >
                                                                 <div>
                                                                      <TbWorld size={24} />
                                                                 </div>
                                                                 <Link target="_blank" className=" text-[#0389C9]" to={item?.mediaLink}> {item?.mediaLink} </Link>

                                                            </div>)
                                                       }

                                                  </div> : null
                                             }
                                             {
                                                  media?.map(item => <div className="  py-3 flex  items-center justify-start gap-5" key={item?.mediaName}
                                                  >
                                                       <div>
                                                            <TbWorld size={24} />
                                                       </div>
                                                       <Link target="_blank" className=" text-[#0389C9]" to={item?.mediaLink}> {item?.mediaLink} </Link>

                                                  </div>)
                                             }
                                        </div>
                                        <div className="  rounded-lg  gap-4 grid md:grid-cols-3">
                                             <div>
                                                  <select onChange={(e) => setMediaName(e.target.value)} className="  py-3 rounded-md p-2  text-xl w-full border outline-none  border-[#0389C9]">
                                                       <option className=" py-3  text-xl" value={"Facebook"}> Facebook </option>
                                                       <option className=" py-3 text-xl" value={"Linkedin"}> Linkedin </option>
                                                       <option className=" py-3 text-xl" value={"Instragram"}> Instragram </option>
                                                       <option className=" py-3 text-xl" value={"Twitter"}> Twitter </option>
                                                       <option className=" py-3 text-xl" value={"Github"}> Github </option>
                                                       <option className=" py-3 text-xl" value={"Youtube"}> Youtube </option>
                                                  </select>

                                             </div>
                                             <input value={mediaLink} onChange={(e) => setMediaLink(e.target.value)} className=" rounded-lg  col-span-2 p-2 w-full border outline-none  border-[#0389C9]" name="" placeholder="Ex: https://banglabook.com"></input>
                                        </div>
                                        <div className=" pt-4 text-start">
                                             <button onClick={handleLink} type="button" disabled={!mediaLink} className=" disabled:bg-[#038ac95c]  text-xl py-1 px-4 rounded bgColor ">Add media</button>
                                        </div>

                                   </div>

                                   <div className=" mt-10 ">
                                        <h1 className=" my-2 text-base text-start md:text-2xl font-medium"> Bio</h1>
                                        <div>
                                             <textarea value={userinfo?.boi} className=" rounded-lg  p-2 w-full border outline-none  border-[#0389C9]" onChange={(e) => setBoi(e.target.value)} name="" id="" cols="30" rows="2" placeholder="add your boi"></textarea>
                                        </div>

                                   </div>

                                   <div className=" mt-10 ">
                                        <h1 className=" my-2 text-base text-start md:text-2xl font-medium"> Gender</h1>
                                        <div>
                                             <select onChange={(e) => setGender(e.target.value)} className="  py-3 rounded-md p-2  text-xl w-full border outline-none  border-[#0389C9]">
                                                  <option className=" py-3  text-xl" value={"Female"}> Female </option>
                                                  <option className=" py-3 text-xl" value={"male"}> Male </option>
                                                  <option className=" py-3 text-xl" value={"Custom"}> Custom </option>
                                             </select>

                                        </div>

                                   </div>

                                   <div onClick={handleSubmit} className=" pt-4 text-start">
                                        <button type="button" className=" disabled:bg-[#038ac95c]  text-xl py-1 px-4 rounded bgColor "> Submit </button>
                                   </div>

                              </div>


                         </div>


                    </Container>
               </div >

          </div >
     );
};

export default Setting;