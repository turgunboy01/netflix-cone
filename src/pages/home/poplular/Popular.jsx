import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MovieCard from "../../../components/movieCard/MovieCard";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  return (
    <div>
      <h2 className="mt-12 text-[25px] font-semibold">Popular Movies</h2>
      <MovieCard data={data?.results} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
