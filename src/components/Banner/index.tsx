import React from "react";
import logo from "../../assets/banner3.png";

const Banner = () => {
  return (
    <div className="pt-20 container mx-auto px-12 pb-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className=" px-4 w-full relative h-60">
        <img src={logo} alt="" className="h-full" />
        <div className="absolute top-4 left-10 flex flex-col">
          <span className="text-[28px] font-bold">Nữ</span>
          <span className="text-[14px]">Xuân 2018</span>
        </div>
      </div>

      <div className=" px-4 w-full relative h-60">
        <img src={logo} alt="" className="h-full" />
        <div className="absolute top-4 left-10 flex flex-col">
          <span className="text-[28px] font-bold">Nữ</span>
          <span className="text-[14px]">Xuân 2018</span>
        </div>
      </div>
      <div className=" px-4 w-full relative h-60">
        <img src={logo} alt="" className="h-full" />
        <div className="absolute top-4 left-10 flex flex-col">
          <span className="text-[28px] font-bold">Nữ</span>
          <span className="text-[14px]">Xuân 2018</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
