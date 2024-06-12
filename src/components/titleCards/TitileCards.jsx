import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import cards_data from "../../../public/assets/cards/Cards_data";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const TitileCards = ({ title, endpoint, category }) => {
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`/${endpoint}/${category}`);
  console.log(data);
  return (
    <div className="w-full mt-12">
      <h2 className="text-[22px] font-semibold">{title}</h2>
      <div className="overflow-x-scroll flex gap-[40px] mt-5">
        {data?.results?.map((item, index) => (
          <div className="min-w-[300px]" key={index}>
            <Link
              to={`/${endpoint}/${item.id}`}
              className=" w-[240px] h-[140px] relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path}
                className="cursor-pointer rounded-[4px] object-cover w-full h-full"
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

export default TitileCards;
