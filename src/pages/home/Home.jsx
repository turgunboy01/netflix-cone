import React from "react";
import Navbar from "../../components/navbar/Navbar";
import hero_banner from "../../../public/assets/hero_banner.jpg";
import hero_title from "../../../public/assets/hero_title.png";
import play_icon from "../../../public/assets/play_icon.png";
import info_icon from "../../../public/assets/info_icon.png";
import TitileCards from "../../components/titleCards/TitileCards";
const Home = () => {
  return (
    <div className="  overflow-hidden w-full">
      <Navbar />
      <div className="relative">
        <img src={hero_banner} alt="banner" className="w-[100%] mask1  " />
        <div className=" absolute bottom-[0px] pl-[6%] ">
          <img src={hero_title} alt="title" className=" max-w-[420px] mb-8 " />
          <p className=" max-w-[700px] w-full mb-5 text-[17px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            accusamus quo atque explicabo illo sit eum quos voluptatum nisi
            fugit.
          </p>
          <div className="flex gap-4">
            <button className="py-2 px-5 flex items-center gap-[10px] text-[15px] bg-white hover:bg-[#ffffffbf] rounded-[4px] text-[#333] font-semibold ">
              <img src={play_icon} className="w-[25px]" alt="" /> Play
            </button>
            <button className="py-2 px-5 flex items-center gap-[10px] text-[15px] bg-[#6d6d6eb3] hover:bg-[#6d6d6e66] rounded-[4px] text-[#fff] font-semibold ">
              <img src={info_icon} className="w-[25px]" alt="" />
              More Info
            </button>
          </div>
          <div className=" w-full">
            <TitileCards title={"Popular on Netflix"} category={"popular"} />
          </div>
        </div>
      </div>
      <div className="ml-[6%] w-full">
        <TitileCards title={"Blockbuster Movies"} category={"now_playing"} />
        {/* <TitileCards title={"Only on Netflix"} category={""} /> */}
        <TitileCards title={"Upcoming"} category={"upcoming"} />
        <TitileCards title={"Top Pics for You"} category={"top_rated"} />
      </div>
    </div>
  );
};

export default Home;
