import React from "react";
import ReactPlayer from "react-player";
import black_arrow_icon from "../../../public/assets/back_arrow_icon.png";

import { Link, useParams } from "react-router-dom";

const Player2 = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center relative">
      <Link to={"/"} className="">
        <img
          src={black_arrow_icon}
          alt="banner"
          className=" absolute top-[20px] left-[20px] w-[50px] cursor-pointer"
        />
      </Link>
      <ReactPlayer
        controls
        url={`https://www.youtube.com/watch?v=${id}`}
        width="90%"
        className="rounded-2xl"
        height="90%"
      />
    </div>
  );
};

export default Player2;
