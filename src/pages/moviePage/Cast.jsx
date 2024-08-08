import React from "react";
import { useSelector } from "react-redux";

const Cast = ({ data }) => {
  const { url } = useSelector((state) => state.home);

  return (
    <div className="lg:container mx-auto px-5 mt-[80px] lg:-mt-[40px] overflow-x-scroll scrollHidden">
      <h2 className="text-[40px] py-2 font-bold">Actors</h2>
      <div className="flex gap-[20px]">
        {data?.map((item) => (
          <div key={item.id} className="flex-none w-[250px] ">
            <img
              src={
                item.profile_path
                  ? url.profile + item.profile_path
                  : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
              }
              alt=""
              className="w-[100%] h-[250px] rounded-2xl  "
            />
            <p className="text-[18px]   pt-1 font-semibold">{item.name}</p>
            <p className="text-[#727272] font-semibold">{item.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
