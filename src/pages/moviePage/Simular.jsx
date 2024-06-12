import React from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import useFetch from "../../hooks/useFetch";

const Simular = ({ id, mediaType }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType == "tv" ? "Similar Tv Shows" : "Similar Movies";
  return (
    <div className="lg:container mx-auto px-5 py-[50px]">
      <h2 className="text-[40px] py-2 font-bold">{title}</h2>
      <MovieCard data={data?.results} endpoint={mediaType} />
    </div>
  );
};

export default Simular;
