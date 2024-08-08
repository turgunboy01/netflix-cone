import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MovieCard from "../../../components/movieCard/MovieCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  console.log(data?.results, "trending");
  const { url } = useSelector((state) => state.home);

  return (
    <div>
      <h2 className="mt-12 text-[25px] font-semibold">Trending Movies</h2>
      {/* <div className=""> */}
      <div className="overflow-x-scroll scrollHidden flex gap-[40px] mt-5 py-3">
        {data?.results?.map((item, index) => (
          <div className="min-w-[300px]" key={index}>
            <Link
              to={`/${item.media_type || endpoint}/${item.id}`}
              className=" w-[240px] h-[140px] relative "
            >
              <img
                src={
                  item.backdrop_path ? url.backdrop + item.backdrop_path : img
                }
                className="cursor-pointer  rounded-[4px]  w-full h-[180px] hover:scale-105 duration-300 transition-all"
                alt={item.title}
              />
              <p className="absolute bottom-[0px] w-[200px] left-3 ">
                {item.name || item.title}
              </p>
            </Link>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Trending;
