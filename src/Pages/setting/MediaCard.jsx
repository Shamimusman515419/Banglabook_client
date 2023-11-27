
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MediaCard = ({ card,handleDelete }) => {
     const [active, setActive] = useState(false);

   


     return (
          <div className=' relative my-2'>
               <div >  <div
                    className=" flex justify-between  items-center gap-2 p-2 border border-[#0000001f] rounded">

                    <div>
                         <h1 className=" textColor text-start text-base  md:text-xl  font-medium -3"> {card?.mediaName} </h1>
                         <Link className=" text-sm  pt-1  text-[#0000009e]   md:text-base font-medium" target="_blank" to={card?.mediaLink}> {card?.mediaLink} </Link>
                    </div>
                    <div onMouseLeave={() => setActive(false)} onMouseEnter={() => setActive(true)} className=" cursor-pointer text-[#0389C9] ">
                         <BsThreeDotsVertical size={25} />
                    </div>
               </div>
                    <div>
                         {
                              active ? <div onMouseLeave={() => setActive(false)} onMouseEnter={() => setActive(true)} className="  text-center border bg-white  w-[120px] ml-2 top-1  rounded-md absolute right-1  border-[#0389C9] p-2">
                                   <button onClick={()=>handleDelete(card?.mediaName)}  className=' block p-2   text-base hover:bg-[#038ac951]   text-center rounded-md'>Delete</button>
                                  
                              </div> : <></>
                         }
                    </div>


               </div>
          </div>
     );
};

export default MediaCard;