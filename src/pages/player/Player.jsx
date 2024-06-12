import  { useEffect, useState } from "react";
import black_arrow_icon from "../../../public/assets/back_arrow_icon.png";
import { Link, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
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
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  console.log(apiData);
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center relative">
      <Link to={"/"} className="">
        <img
          src={black_arrow_icon}
          alt="banner"
          className=" absolute top-[20px] left-[20px] w-[50px] cursor-pointer"
        />
      </Link>
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        allowFullScreen
        title="trailer"
        width="90%"
        height="90%"
        className=" rounded-[10px]"
        frameborder="0"
      ></iframe>
      <div className="flex justify-between items-center w-[90%]">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
