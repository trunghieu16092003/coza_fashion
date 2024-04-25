import React, { useState, useEffect } from "react";
import banner1 from "../../assets/banner1.jfif";
import banner2 from "../../assets/banner2.jpg";
import "./style.css";

const Slider = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const banners = [banner1, banner2];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentBanner, banners.length]);

  useEffect(() => {
    setShowAnimation(false);

    const timeout = setTimeout(() => {
      setShowAnimation(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentBanner]);

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center relative"
      style={{
        backgroundImage: `url(${banners[currentBanner]})`,
        minHeight: "100%",
      }}
    >
      <div className="mx-[200px]">
        <h2
          className={`text-lg capitalize leading-2 ${
            showAnimation ? "animate-sub-title" : "opacity-0"
          }`}
        >
          men collection 2023
        </h2>
        <h1
          className={`text-6xl uppercase title leading-[1.1] pt-[19px] pb-[43px] ${
            showAnimation ? "animate-title" : "opacity-0"
          } `}
        >
          new arrivals
        </h1>
        <div
          className={`w-[161px] ${
            showAnimation ? "animate-btn" : "opacity-0"
          } `}
        >
          <a
            href=""
            className="inline-block w-full px-[15px] font-medium py-2 uppercase rounded-[23px] text-center text-[#ffffff] text-lg bg-[#717fe0]"
          >
            Shop now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
