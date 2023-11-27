import { useContext } from "react";
import { AuthContext } from "../../Component/Authprovider/Authprovider";
import { useState } from "react";
import useAxiosSecure from "../../Component/AsioxSecures/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { FaLink } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import MediaCard from "./MediaCard";
import { CgProfile } from "react-icons/cg";
const Setting = () => {
     const [axiosSecure] = useAxiosSecure();
     const { user, userinfo, updateProfilePhoto } = useContext(AuthContext);
     const [boi, setBoi] = useState();
     const [collage, setCollage] = useState("");
     const [open, setOpen] = useState(false);
     const [image, setImage] = useState("");
     const [imageLoading, setImageLoading] = useState(false);
     const [Gender, setGender] = useState();
     const [address, setAddress] = useState();
     const [mediaName, setMediaName] = useState("Facebook");
     const [showModal, setShowModal] = useState(false);
     const [mediaLink, setMediaLink] = useState(null);

     const media = userinfo?.media;
     const handleLink = () => {
          const data = { mediaName, mediaLink };


          const mediaData = [...media, data]
          const fromData = { media: mediaData }
          axiosSecure.patch(`/users/${user?.email}`, fromData).then(result => {
               if (result) {
                    setShowModal(false);
                    toast.success(" update Account");
                    window.location.reload()

               }
          })

     };

     const handleSubmit = async () => {
          const fromData = { boi, media, collage, address, Gender };
          console.log(fromData);

          axiosSecure.patch(`/users/${user?.email}`, fromData).then(result => {

               if (result) {
                    toast.success(" update Account");
                    window.location.reload()

               }
          })

     }


     const handleimage = (event) => {
          const selectedImage = event.target.files[0];
          setImageLoading(true)
          const Imagebb_URL = `https://api.imgbb.com/1/upload?key=c7cb5be9cc288736ed86ddfa73d22e32`
          const formData = new FormData();
          formData.append('image', selectedImage);
          fetch(Imagebb_URL, {
               method: "POST",
               body: formData
          }).then(res => res.json()).then(data => {
               if (data?.data?.display_url) {
                    setImage(data?.data?.display_url)
                    setImageLoading(false)
               }
          })
     }

     const updateProfile = () => {
          const name = user?.displayName;
          axiosSecure.patch(`/users/${user?.email}`, { image }).then(result => {
               if (result) {
                    updateProfilePhoto(name, image).then(result => {
                         setOpen(false)
                         toast.success(" Update Profile")

                    }).catch(error => {

                         toast.error(error.massage)
                    })
               }

          }).catch(error => {
               toast.error(error.massage)
          })

     }


     const handleDelete = (id) => {


          const mediaData = media?.filter(item => item?.mediaName !== id)
          const fromData = { media: mediaData };
          console.log(fromData);
          axiosSecure.patch(`/users/${user?.email}`, fromData).then(result => {
               if (result) {
                    setShowModal(false);
                    toast.success(" update Account");
                    window.location.reload()

               }
          })
          
     }


     return (
          <div className=" mt-14 px-2">
               <div>
                    <div className=" text-center w-full md:w-[900px] mx-auto">

                         <div className="  w-full  py-2 px-4 rounded-lg bg-[#CCCFD2] flex justify-between  items-center gap-2  ">
                              <div className=" flex items-center gap-2">
                                   <img className=" object-cover w-16 h-16 rounded-full  border-2 border-[#0389C9]" src={user?.photoURL} alt="" />
                                   <h1 className=" text-sm  md:text-xl "> {user?.displayName} </h1>
                              </div>

                              <div>
                                   <button onClick={setOpen} className="  text-sm md:text-xl  rounded-lg px-4 py-2 bgColor">Change profile</button>
                              </div>
                         </div>

                         <div>
                              <div className=" mt-10 ">
                                   <h1 className=" my-2 text-[#0389C9]  text-base  text-start md:text-2xl font-medium"> website</h1>

                                   <div className=" text-start">

                                        {userinfo?.media?.length > 0 ? <div>

                                             {
                                                  userinfo?.media?.map(item => <MediaCard handleDelete={handleDelete} card={item} key={item?.mediaName}></MediaCard>)
                                             }

                                        </div> : null
                                        }

                                   </div>

                                   <div onClick={() => setShowModal(true)} className=" mt-6 cursor-pointer flex items-center gap-2">
                                        <FaLink className=" text-[#0389C9]" size={24} />
                                        <h1 className="  text-[#0389C9] text-base   md:text-xl "> Add New Link </h1>
                                   </div>

                                   {showModal ? (
                                        <>
                                             <div
                                                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                             >
                                                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                       {/*content*/}
                                                       <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                            {/*header*/}
                                                            <div className="flex items-center  p-5 text-center   rounded-t">
                                                                 <h1 className="  mx-auto font-bold text-[#0389C9] text-center  text-xl">Add new Link</h1>

                                                            </div>
                                                            {/*body*/}
                                                            <div className="relative p-6 w-full md:min-w-[600px] flex-auto">

                                                                 <div className="  w-full rounded-lg  ">
                                                                      <div className=" w-full my-2 ">
                                                                           <h1 className=" textColor text-start text-base  md:text-xl  font-medium my-3"> Please Select Media Name</h1>
                                                                           <select onChange={(e) => setMediaName(e.target.value)} className="   py-3 rounded-md p-2  text-xl w-full border outline-none  border-[#0389C9]">
                                                                                <option className=" py-3  text-xl" value={"Facebook"}> Facebook </option>
                                                                                <option className=" py-3 text-xl" value={"Linkedin"}> Linkedin </option>
                                                                                <option className=" py-3 text-xl" value={"Instragram"}> Instragram </option>
                                                                                <option className=" py-3 text-xl" value={"Twitter"}> Twitter </option>
                                                                                <option className=" py-3 text-xl" value={"Github"}> Github </option>
                                                                                <option className=" py-3 text-xl" value={"Youtube"}> Youtube </option>
                                                                           </select>

                                                                      </div>
                                                                      <div>
                                                                           <h1 className=" textColor text-start text-base  md:text-xl  font-medium my-3"> Link</h1>
                                                                           <input value={mediaLink} onChange={(e) => setMediaLink(e.target.value)} className=" rounded-lg  col-span-2 p-2 w-full border outline-none  border-[#0389C9]" name="" placeholder="Ex: https://banglabook.com"></input>
                                                                      </div>
                                                                 </div>


                                                            </div>
                                                            {/*footer*/}
                                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                 <button
                                                                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                      type="button"
                                                                      onClick={() => setShowModal(false)}
                                                                 >
                                                                      Close
                                                                 </button>
                                                                 <button disabled={!mediaLink}
                                                                      className="bg-[#0389C9] disabled:bg-[#038ac952] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                      type="button"
                                                                      onClick={handleLink}
                                                                 >
                                                                      Submit
                                                                 </button>
                                                                 <Toaster
                                                                      position="top-center"
                                                                      reverseOrder={true}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                   ) : null}






                              </div>

                              <div className=" mt-10 ">
                                   <h1 className=" text-[#0389C9] my-2 text-base text-start md:text-2xl font-medium"> Bio</h1>
                                   <div>
                                        <textarea defaultValue={userinfo?.boi} className=" rounded-lg  p-2 w-full border outline-none  border-[#0389C9]" onChange={(e) => setBoi(e.target.value)} name="" id="" cols="30" rows="2" placeholder="Enter Your Boi"></textarea>
                                   </div>

                              </div>
                              <div className=" mt-10 ">
                                   <h1 className=" text-[#0389C9] my-2 text-base text-start md:text-2xl font-medium"> Collage</h1>
                                   <div>
                                        <textarea defaultValue={userinfo?.collage} className=" rounded-lg  p-2 w-full border outline-none  border-[#0389C9]" onChange={(e) => setCollage(e.target.value)} name="" id="" cols="30" rows="2" placeholder="Ex: Bogura Polytechnic Institute"></textarea>
                                   </div>

                              </div>
                              <div className=" mt-10 ">
                                   <h1 className=" text-[#0389C9]  my-2 text-base text-start md:text-2xl font-medium"> Address</h1>
                                   <div>
                                        <textarea defaultValue={userinfo?.address} className=" rounded-lg  p-2 w-full border outline-none  border-[#0389C9]" onChange={(e) => setAddress(e.target.value)} name="" id="" cols="30" rows="2" placeholder="Ex: Dhaka Bangladesh"></textarea>
                                   </div>

                              </div>

                              <div className=" mt-10 ">
                                   <h1 className=" my-2 text-[#0389C9] text-base text-start md:text-2xl font-medium"> Gender</h1>
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



               </div >

               {
                    open ? <div className=" bg-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                         <div className=" shadow-md  md:min-w-[450px]   p-3 rounded-md min-w-[300px] relative w-auto my-6 mx-auto max-w-[1000px]">

                              <div>
                                   <h1 className=" text-xl font-medium text-center text-blue-400 my-7"> Change Your Profile</h1>

                                   <div className=" flex justify-center items-center  h-[300px]">

                                        {
                                             image ? <img className="  object-cover h-[250px] w-[250px]  border  border-blue-600 rounded-full" src={image} alt="" /> :

                                                  <div>
                                                       {
                                                            <div>
                                                                 {
                                                                      imageLoading ? <FadeLoader color="#36d7b7" /> : <label htmlFor="profile">   <CgProfile className=" text-blue-500" size={50}></CgProfile>

                                                                           <input onChange={handleimage} type="file" className=" hidden" name="" id="profile" />

                                                                      </label>
                                                                 }
                                                            </div>
                                                       }
                                                  </div>}

                                   </div>
                              </div>


                              <div className="flex items-center  justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                   <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                   >
                                        Close
                                   </button>
                                   <button onClick={updateProfile}
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"

                                   >
                                        Post
                                   </button>
                                   <Toaster
                                        position="top-center"
                                        reverseOrder={true}
                                   />
                              </div>
                         </div>


                    </div> : ""
               }

          </div >
     );
};

export default Setting;