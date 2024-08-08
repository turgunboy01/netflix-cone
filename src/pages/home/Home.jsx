// import React from "react";
import Navbar from "../../components/navbar/Navbar";
import play_icon from "../../../public/assets/play_icon.png";
import info_icon from "../../../public/assets/info_icon.png";
import TitileCards from "../../components/titleCards/TitileCards";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Trending from "./trending/Trending";
import Popular from "./poplular/Popular";
import Top_Rated from "./top_rated/Top_Rated";
import Upcoming from "./upcoming/Upcoming";
import Footer from "../../components/footer/Footer";
const Home = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  let mediaType = "movie";
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      let product =
        data.results[Math.floor(Math.random() * data.results.length)];
      setApiData(product);
    }
  }, [data]);

  console.log(apiData);
  return (
    <div className="overflow-hidden w-full">
      <Navbar />
      <div className="relative ">
        <div className=" h-[100vh]">
          <img
            src={`https://image.tmdb.org/t/p/original/${apiData.backdrop_path}`}
            alt="banner"
            className="w-[100%] mask1 h-[100vh]  2xl:h-[100%]  opacity-80 "
          />
        </div>
        <div className=" absolute bottom-[20%] pl-[6%]  ">
          <img
            src={`https://image.tmdb.org/t/p/original/${apiData.poster_path}`}
            alt="title"
            className=" w-[250px] sm:w-[300px] sm:h-full  mb-8 "
          />
          <h3 className="text-[32px] font-semibold">{apiData.title}</h3>
          {apiData.overview && (
            <p className=" max-w-[700px] w-full mb-5 text-[17px]">
              {apiData.overview.slice(0, 40)}...
            </p>
          )}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/player/${apiData.id}`)}
              className="py-2 px-5 flex items-center gap-[10px] text-[15px] bg-white hover:bg-[#ffffffbf] rounded-[4px] text-[#333] font-semibold "
            >
              <img src={play_icon} className="w-[25px]" alt="" /> Play
            </button>
            <button
              onClick={() => navigate(`/${mediaType}/${apiData.id}`)}
              className="py-2 px-5 flex items-center gap-[10px] text-[15px] bg-[#6d6d6eb3] hover:bg-[#6d6d6e66] rounded-[4px] text-[#fff] font-semibold "
            >
              <img src={info_icon} className="w-[25px]" alt="" />
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className=" px-[6%] -mt-[10%]">
        <Upcoming />
        <Popular />
        <Top_Rated />
        <Trending />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
