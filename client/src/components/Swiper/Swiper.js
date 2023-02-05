import React, { useState, useEffect } from "react";
import "./swiper.css";
import Arrowr from "../../public/img/arrowr.png";
import Arrowl from "../../public/img/arrowl.png";

export const Swiper = ({
  children,
  spaceBetween = 10,
  slidesPerView = 2, //輪播圖可以切割
  auto = true,
  duration = 5000, //5秒
}) => {
  children = React.Children.toArray(children);
  let numOfDots = children.length - (slidesPerView - 1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragStart, setIsDragStart] = useState(false);
  const [start, setStart] = useState(0);
  const [change, setChange] = useState(0);
  const [stopAuto, setStopAuto] = useState(false);

  //輪播圖切換圖片設定
  function plusSlide(n) {
    setCurrentSlide((value) => {
      if (n > 0) return value < children.length - 1 ? value + n : 0;
      //n<0
      return value <= 0 ? children.length - 1 : value + n;
    });
  }

  function dragStart(e) {
    setIsDragStart(true);
    let prevPageX = e.pageX || e.touches[0].pageX;
    setStart(prevPageX);
    setChange(0);
  }

  function dragging(e) {
    if (!isDragStart) return;
    let positionDiff = (e.pageX || e.touches[0].pageX) - start;
    setChange(positionDiff);
  }

  function dragStop() {
    setIsDragStart(false);
    setStart(0);
    if (change < 0) {
      plusSlide(1);
    } else if (change > 0) {
      plusSlide(-1);
    }
  }

  //自動輪播圖
  useEffect(() => {
    let interval = setInterval(() => {
      if (auto) {
        setCurrentSlide((value) => (value < numOfDots - 1 ? value + 1 : 0));
      }
    }, duration);

    if (stopAuto) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [auto, duration, numOfDots, stopAuto]);

  return (
    <>
      <div
        className={`swiper ${isDragStart ? "dragging" : ""}`}
        onMouseDown={dragStart}
        onMouseMove={dragging}
        onMouseUp={dragStop}
        onTouchStart={dragStart}
        onTouchMove={dragging}
        onTouchEnd={dragStop}
        onMouseOver={() => setStopAuto(true)}
        onMouseLeave={() => setStopAuto(false)}
      >
        <div className="swiperWrapper" style={{ gap: `$${spaceBetween}px` }}>
          {children[currentSlide]}
        </div>

        <img
          src={Arrowl}
          alt=""
          className="prev"
          onClick={() => plusSlide(-1)}
          style={{ pointerEvents: "auto" }}
        />
        <img
          src={Arrowr}
          alt=""
          className="next"
          onClick={() => plusSlide(1)}
          style={{ pointerEvents: "auto" }}
        />

        <div className="swiperPagination">
          {children.map((child, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const SwiperSlide = ({ children }) => {
  return <div className="swiperSlide">{children}</div>;
};
