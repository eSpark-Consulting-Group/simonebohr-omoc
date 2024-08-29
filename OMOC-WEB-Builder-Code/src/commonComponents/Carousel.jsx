import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex items-center justify-center mb-5">
      <button
        onClick={handlePrevClick}
        className="xl:size-[72px] bg-white rounded-full ctr xl:me-12"
      >
        <Icon
          icon="iconamoon:arrow-left-2-light"
          width="48"
          height="48"
          style={{ color: "#404040" }}
        />
      </button>

      <div className="relative  overflow-hidden">
        {React.Children.map(children, (child, index) =>
          index === currentIndex ? <div key={index}>{child}</div> : null
        )}
      </div>

      <button
        onClick={handleNextClick}
        className="xl:size-[72px] bg-white rounded-full ctr xl:ms-12"
      >
        <Icon
          icon="iconamoon:arrow-right-2-light"
          width="48"
          height="48"
          style={{ color: "#404040" }}
        />
      </button>
    </div>
  );
};

export default Carousel;
