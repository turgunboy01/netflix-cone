import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MovieCard from "../../../components/movieCard/MovieCard";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  return (
    <div>
      <h2 className="mt-12 text-[25px] font-semibold">Trending Movies</h2>
      <MovieCard data={data?.results} endpoint={endpoint} />
    </div>
  );
};

export default Trending;
