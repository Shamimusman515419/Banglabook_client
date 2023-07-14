

const StoryCard = ({Story}) => {
     const { storyImage,img}=Story
     return (
          <>
      
           <div className=" relative">
               <div className=' relative  rounded-xl  overflow-hidden'>

                    <img className=' h-60  w-full relative object-cover  ' src={storyImage} alt="" />
                      <div className=" absolute top-3 left-2 ">
                          <div>
                              <img className=" object-cover w-10 h-10 rounded-full border-2 border-blue-600" src={img} alt="" />
                              
                          </div>
                      </div>
                    </div>
          </div>
      
          </>
     );
};

export default StoryCard;