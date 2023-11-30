
import { PropagateLoader } from 'react-spinners'
const SubmitButton = ({ text, condition, commonLoader }) => {
     return (
          <div>

               <button disabled={!condition} className=" text-xl min-w-[150px]  w-full  font-medium bg-[#b4c7d9] hover:bg-[#0389C9] hover:text-white px-5 py-1 rounded-lg  text-blue-500"> {commonLoader ? <div className=' text-xl min-w-[150px]  w-full  font-medium bg-[#b4c7d9] hover:bg-[#e0e4e7] px-5 py-1 rounded-lg '>  <PropagateLoader color="#0389C9" /> </div> : text}</button>
          </div>
     );
};

export default SubmitButton;