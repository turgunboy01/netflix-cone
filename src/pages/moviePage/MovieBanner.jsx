import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from "../../components/sircleRating/CircleRating";
import play_icon from "../../../public/assets/play_icon.png";

const MovieBanner = ({ crew, video }) => {
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);

  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  //   console.log(data);
  const { genres } = useSelector((state) => state.home);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Writer"
  );

  const _genre = data?.genres?.map((g) => g.id);

  const toHoursAndMinuts = (totalMinus) => {
    const hour = Math.floor(totalMinus / 60);
    const minus = totalMinus % 60;
    return `${hour}h ${minus > 0 ? `${minus}m` : ""}`;
  };

  return (
    <div
      className="lg:h-[100vh] mask2  "
      style={{
        backgroundSize: "100% 100%",
        backgroundImage: `url('${url.backdrop + data?.backdrop_path} ')`,
      }}
    >
      <div className="bg-[#0d265a8e] h-full pb-[150px] ">
        <div className=" flex flex-col lg:flex-row pt-[100px]  items-center gap-10 lg:gap-[100px] lg:container mx-auto px-5  lg:h-screen">
          <div className="w-full lg:w-[50%]">
            <img
              src={url?.backdrop + data?.poster_path}
              className="w-[100%]  lg:h-[100%] lg:w-[500px] object-contain rounded-xl lg:object-cover"
              alt=""
            />
          </div>
          <div className="">
            <p className="text-[35px] sm:text-[50px] font-semibold ">
              {`${data?.name || data?.title} (${dayjs(
                data?.release_date
              ).format("YYYY")})`}
            </p>
            <p className=" text-[17px] sm:text-[25px] italic text-[#bcc2cf]">
              {data?.tagline}
            </p>
            <div className="flex gap-4 flex-col sm:flex-row items-center py-2 text-[13px] ">
              <div className="w-[80px]">
                <CircleRating
                  percentage={data?.vote_average?.toFixed(1) * 10}
                />
              </div>
              <div className="flex gap-4 sm:flex-nowrap flex-wrap">
                {_genre?.map((g) => {
                  if (!genres[g]?.name) return;
                  return (
                    <div key={g} className="bg-[red] py-1 rounded-lg px-2">
                      {genres[g]?.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col text-[15px] sm:text-[18px] py-2">
              <p className="text-[25px] font-semibold mb-1">Overview:</p>{" "}
              {data?.overview}
            </div>
            <div className="flex gap-6 py-2 border-b border-b-[#6667688e]">
              <div>
                Status: <strong>{data?.status}</strong>
              </div>

              <p>
                Relaze Date:{" "}
                <strong>
                  {dayjs(data?.release_date).format("MMM D,YYYY")}
                </strong>
              </p>
              <p>
                Run time: <strong>{toHoursAndMinuts(data?.runtime)}</strong>
              </p>
            </div>
            {director?.length > 0 && (
              <div className=" py-2 flex items-center gap-2 border-b border-b-[#6667688e]">
                <div className="text bold"> Director: </div>
                <div className="text">
                  {director?.map((d, i) => (
                    <span key={i}>
                      {d.name}
                      {director.length - 1 !== i && ", "}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {writer?.length > 0 && (
              <div className="py-2 py-2 flex items-center gap-2 border-b border-b-[#6667688e]">
                <div className="text bold"> Writer: </div>
                <div className="text">
                  {writer?.map((d, i) => (
                    <span key={i}>
                      {d.name}
                      {writer.length - 1 !== i && ", "}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data?.created_by?.length > 0 && (
              <div className="info">
                <span className="text bold">Creator: </span>
                <span className="text">
                  {data?.created_by?.map((d, i) => (
                    <span key={i}>
                      {d.name}
                      {data?.created_by.length - 1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
            )}
            <button
              onClick={() => navigate(`/player/${data?.id}`)}
              className="py-2 px-5 flex items-center mt-[30px] gap-[10px] text-[15px] bg-white hover:bg-[#ffffffbf] rounded-[4px] text-[#333] font-semibold "
            >
              <img src={play_icon} className="w-[25px]" alt="" /> Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
