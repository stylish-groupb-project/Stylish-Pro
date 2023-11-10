import React, { useState, useEffect, useRef } from 'react';
import './slider.css';

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef();

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startSlideTimer = () => {
    slideInterval.current = setInterval(goToNextSlide, 5000);
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  //重新render時會觸發return比如state狀態改變
  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, []);

  return (
    <div className="slider">
      <div className="slider-slides">
        {slides.map((slide, index) => (
          <div
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            key={slide.id}
          >
            <img src={slide.imgUrl} alt={`Slide ${slide.id}`} />
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={_.id}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            onMouseEnter={stopSlideTimer}
            onMouseLeave={startSlideTimer}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
