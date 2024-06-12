import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MovieBanner from "./MovieBanner";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import VideoSelection from "./VideoSelection";
import Cast from "./Cast";
import Simular from "./Simular";
import Footer from "../../components/footer/Footer";

const MoviePage = () => {
  const { id, mediaType } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);
  console.log(data);

  return (
    <div>
      <Navbar />
      <MovieBanner video={data?.results?.[2]} crew={credits?.crew} />
      <Cast data={credits?.cast} />
      <VideoSelection data={data} />
      <Simular mediaType={mediaType} id={id} />
      <Footer />
      
    </div>
  );
};

export default MoviePage;
