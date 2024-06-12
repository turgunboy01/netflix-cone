import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/no-poster.png";
import { useSelector } from "react-redux";

const MovieCard = ({ data, endpoint }) => {
  const { url } = useSelector((state) => state.home);
  return (
    <div className="w-full ">
      <div className="overflow-x-scroll flex gap-[40px] mt-5 py-3">
        {data?.map((item, index) => (
          <div className="min-w-[300px]" key={index}>
            <Link
              to={`/${endpoint}/${item.id}`}
              className=" w-[240px] h-[140px] relative "
            >
              <img
                src={
                  item.backdrop_path ? url.backdrop + item.backdrop_path : img
                }
                className="cursor-pointer  rounded-[4px]  w-full h-[180px] hover:scale-105 duration-300 transition-all"
                alt={item.title}
              />
              <p className="absolute -bottom-[150px] w-[200px] left-3 ">
                {item.name || item.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
