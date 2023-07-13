
import  {  useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import StoryCard from './StoryCard';
import CreateStory from './CreateStory';
const Story = () => {
  const [Story, setStory] = useState([])
  useEffect(() => {
   fetch('https://banglabook-server.vercel.app/story').then(res => res.json()).then(data => {
    const sortedData = data.sort((a, b) => new Date(b.date) -  new Date(a.date));
    setStory(sortedData);
   } )

  }, []);


const breakpoints = {
    280: {
      slidesPerView: 3,
      spaceBetween: 7,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
  };



  return (
    <div>

      <Swiper
        breakpoints={breakpoints}
        freeMode={true}
        spaceBetween={15}
          //  pagination={{
          //    clickable: true,
          //  }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <CreateStory></CreateStory>
        </SwiperSlide>
        {
          Story && Story?.map((item, index) => <SwiperSlide key={index}>

            <StoryCard Story={item}></StoryCard>
          </SwiperSlide>)
        }


      


      </Swiper>

    </div>
  );
};

export default Story;