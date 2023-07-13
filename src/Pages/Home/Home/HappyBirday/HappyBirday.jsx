import { AiOutlineSetting } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";


const HappyBirthday = () => {
     return (
          <div className=" relative shadow-lg  my-3 overflow-hidden rounded-md">
               <div className="  relative ">
                    <img className=" w-full h-[350px] relative" src="https://img.freepik.com/free-vector/flat-golden-circle-balloons-birthday-background_52683-34659.jpg?size=626&ext=jpg&ga=GA1.2.824354190.1681013433&semt=ais" alt="" />
                    <div className="p-3 md:p-5  text-white bg-[#cd09c39a] absolute top-0 w-full h-full">
                         <div className=" flex  justify-between items-start">
                              <div>
                                   <h1 className="   leading-4 text-xl font-semibold"> Birthday !!!! </h1>
                                   <p className=" leading-5 text-lg mt-2"> Today Your Collage Friend's Birthday</p>
                              </div>
                              <div className=" cursor-pointer ">
                                   <AiOutlineSetting size={24}></AiOutlineSetting>
                              </div>
                         </div>

                         <div className=" mt-5 flex justify-center items-center gap-6">
                              <div className=" p-3 rounded-full  bg-[#d598bda7]">
                                   <FaBirthdayCake></FaBirthdayCake>
                              </div>
                              <img className=" h-16 w-16 rounded-full border border-blue-400   object-cover" src="https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?w=1380&t=st=1688836721~exp=1688837321~hmac=da54f8701592a6446a6d0b2d3d9ce0fb33767500b0b84c2957c1f37255ab6612" alt="" />
                              <div className=" p-1 rounded-full  bg-[#d598bda7]">
                                   <p className="  text-center  text-xl font-bold">15+</p>
                              </div>


                         </div>
                         <div className=" text-center my-2">
                              <h1 className=" text-2xl font-semibold"> Minnie Lowe</h1>
                              <p> Dhaka Bangladesh</p>
                              <p> Minnie Lowe turned 20 years old today</p>

                              <div className="flex mt-2">
                                   <input type="text" placeholder="Type your gift.." className="flex-grow  text-black  px-4 py-2 border border-gray-300 rounded-l-lg    outline-none border-none focus:border-transparent" />
                                        <button className="bg-[#8e21a9] text-white px-4 py-2 rounded-r-lg">Send</button>
                              </div>
                         </div>
                    </div>
               </div>

          </div>
     );
};

export default HappyBirthday;