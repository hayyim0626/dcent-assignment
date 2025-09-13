import React, { useRef, useState, ReactNode } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface CarouselProps {
  children: ReactNode;
  className?: string;
  settings?: Partial<Settings>;
  showCounter?: boolean;
  onSlideChange?: (currentSlide: number) => void;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className = "",
  settings: customSettings = {},
  showCounter = true,
  onSlideChange
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const slideCount = React.Children.count(children);

  const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
      onSlideChange?.(next);
    }
  };

  const settings = { ...defaultSettings, ...customSettings };

  if (slideCount === 0) {
    return (
      <div
        className={`w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center ${className}`}
      >
        <p className="text-gray-500">컨텐츠가 없습니다</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-hidden relative">
        {showCounter && slideCount > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-30 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-medium z-10">
            {currentSlide + 1} / {slideCount}
          </div>
        )}
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};
