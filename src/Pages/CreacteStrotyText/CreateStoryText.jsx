
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Link,useNavigate } from 'react-router-dom'
import { useState ,useContext} from 'react';
import SubmitButton from '../../Component/Button/SubmitButton';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Component/Authprovider/Authprovider';


const CreateStoryText = () => {
     const [StoryImage, setStoryImage] = useState(null);
     const [selectedImage, setSelectedImage] = useState(null);
      const {user}=useContext(AuthContext)
     const navigate = useNavigate();
     // const image1 = "https://img.freepik.com/free-photo/full-length-portrait-happy-playful-woman-summer-wear-straw-hat-pointing-with-finger-upward_171337-9947.jpg?w=740&t=st=1688648873~exp=1688649473~hmac=c477eac2482e9c048562e59f3b545e12011c611ffb6f4f21e10509df82d53a2a"
     const handleImageUpload = async () => {
          if (!selectedImage) {
               console.log('No image selected.');
               return;
          }
          console.log(selectedImage);

          const Imagebb_URL = `https://api.imgbb.com/1/upload?key=a51250151cc877a01d697ac0a493b3bd`
          const formData = new FormData();
          formData.append('image', selectedImage);
          fetch(Imagebb_URL, {
               method: "POST",
               body: formData
          }).then(res => res.json()).then(data => {
               if (data.success) {
                    console.log(data);
                    console.log(data.data.display_url);
                    const image = data?.data?.display_url
                    const date = new Date();
                    const newData = { storyImage: image, date, img:user?.photoURL, email:user?.email }
                  
                    fetch('https://banglabook-server.vercel.app/story', {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify(newData),
                    }).then((res) => res.json()).then(data => {
                         
                         if(data.insertedId){
                              toast('Your Post success.')
                             navigate('/')  
                         }
                    })

               }
          })

     };

     const handleFileChange = (event) => {
          setSelectedImage(event.target.files[0]);
          console.log(event.target.files[0]);
          setStoryImage(URL.createObjectURL(event.target.files[0]));
     };
    
     return (
          <div className=' flex justify-center items-center h-screen w-full'>

               <div>
                    <div className=' bg-[#2453de6a] h-96 w-full md:w-96 flex justify-center items-center ' >
                         <div>
                          {
                               StoryImage ? <> <img className=' h-96  w-full' src={StoryImage} alt="" /> </> :  <label htmlFor="file-upload" >
                               <div className=' p-4 rounded-full border-2 border-blue-500 cursor-pointer md:p-7'>
                                    <AiOutlineCloudUpload className='  text-blue-600' size={40}></AiOutlineCloudUpload>
                               </div>
                               <input accept="image/*" onChange={handleFileChange} type="file" name="" id="file-upload" className=' hidden' />
                          </label>
                          }
                             
                         </div>
                    </div>
                    <div className=' mt-10 flex-wrap flex gap-2 items-center    justify-center md:justify-between '>
                         <Link className=" text-xl  font-medium hover:bg-[#b4c7d9] bg-[#e0e4e7] px-14 py-1 rounded-lg  text-blue-500" to={'/'}>
                              Discard
                         </Link>
                         <div onClick={handleImageUpload}>
                              <SubmitButton text='Share to Story'></SubmitButton>
                         </div>
                    </div>


                    <Toaster />
               </div>
          </div>
     );
};

export default CreateStoryText;