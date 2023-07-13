import { AiOutlineSetting } from "react-icons/ai";

const Games = () => {
     return (
          <div className=" shadow-lg rounded-md ">
                <div className=" my-2 flex justify-between items-center">
                    <div>
                    <h1 className=" font-bold text-2xl f my-2"> Games </h1>
                   
                    </div>
                    <div className=" cursor-pointer ">
                         <AiOutlineSetting size={24} className=" text-blue-400"></AiOutlineSetting>
                    </div>
               </div>
          </div>
     );
};

export default Games;