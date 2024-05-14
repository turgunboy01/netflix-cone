import React, { useEffect, useState } from "react";
import cards_data from "../../../public/assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitileCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTU5ZjhkNjg1NmJlNTgwMTQ2NTRjOGIyYmM3YTI2OCIsInN1YiI6IjYxM2RjNzdlZjk2YTM5MDA2MDA2Y2MzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8EOT0rs5mOMFEzMMXc-AkQXiicG0BE_qnO6ELoEyeI",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, []);
  console.log(apiData);
  return (
    <div className=" w-[100%] mt-[50px] ">
      <h2>{title}</h2>
      <div className="flex overflow-x-scroll gap-5">
        {apiData.map((item, index) => (
          <Link
            to={`/player/${item.id}`}
            className="w-[240px] h-[140px]"
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path}
              className=" cursor-pointer rounded-[4px] object-cover "
              alt=""
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitileCards;
