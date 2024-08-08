import React from "react";
import { LuPlayCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const VideoSelection = ({ data }) => {
  const navigate = useNavigate();

  console.log(data);
  return (
    <div className="lg:container w-full py-[30px]  mx-auto pt-50px px-5 overflow-x-scroll scrollHidden space-x-5">
      <h2 className="text-[40px] py-2 font-bold">More Videos</h2>
      <div className="flex items-center gap-[30px] ">
        {data?.results?.map((video) => (
          <div
            className="flex-none relative group "
            onClick={() => navigate(`/playe/${video?.key}`)}
          >
            <div className="">
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt=""
                className="w-[340px] rounded-xl object-cover group-hover:scale-105 duration-300 transition-all"
              />
              <div className=" absolute top-[40%] left-[43%]  group-hover:text-[red] duration-300">
                <LuPlayCircle size={50} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSelection;
