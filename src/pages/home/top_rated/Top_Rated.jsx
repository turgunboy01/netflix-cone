import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MovieCard from "../../../components/movieCard/MovieCard";

const Top_Rated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  return (
    <div>
      <h2 className="mt-12 text-[25px] font-semibold">Top Movies</h2>
      <MovieCard data={data?.results} endpoint={endpoint} />
    </div>
  );
};

export default Top_Rated;
