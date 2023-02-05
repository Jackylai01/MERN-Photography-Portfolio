import "./featured.css";
import { Swiper, SwiperSlide } from "../Swiper/Swiper";
import images from "../Images/index";

const Featured = () => {
  return (
    <div className="featured">
      <div className="containerSlider">
        <Swiper auto={true}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="imgContainer">
                <img src={image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
