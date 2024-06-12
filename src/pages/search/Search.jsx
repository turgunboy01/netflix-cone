import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { fetchDataFromApi } from "../../util/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch";
import MovieCard from "../../components/movieCard/MovieCard";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Search = () => {
  const [pageCount, setPageCount] = useState(1);
  const [dataMovie, setData] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch(`/movie/popular`);

  const fetchinitialData = () => {
    fetchDataFromApi(`/search/multi?query=${search}&page=${pageCount}`).then(
      (res) => {
        setData(res);
        setPageCount((prev) => prev + 1);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${search}&page=${pageCount}`).then(
      (res) => {
        if (dataMovie?.results) {
          setData({
            ...dataMovie,
            results: [...dataMovie?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPageCount((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    fetchinitialData();
    setPageCount(1);
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="lg:container mx-auto px-5 pt-[80px] ">
        <div className="flex items-center my-[20px] space-x-2 p-2 bg-[#173d77] rounded-3xl">
          <input
            type="text"
            placeholder="Kinolarni qidirish uchun ..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="flex-1 text-white bg-transparent px-3 py-2 border-none outline-none placeholder-white"
          />
        </div>

        {/* <> */}
        {dataMovie?.results?.length > 0 ? (
          <InfiniteScroll
            className="content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            dataLength={dataMovie?.results?.length || 0}
            next={fetchNextPageData}
            hasMore={pageCount <= dataMovie?.total_pages}
          >
            {dataMovie?.results?.map((item) => {
              console.log(item, "item");
              if (item.media_type === "person") return null;
              return (
                <div
                  key={item.id}
                  className="movieCard"
                  onClick={() => navigate(`/${item?.media_type}/${item.id}`)}
                >
                  <div className="posterBlock">
                    <img
                      src={
                        item.poster_path
                          ? url.poster + item.poster_path
                          : url.backdrop + item.backdrop_path
                      }
                      className="cursor-pointer rounded-[4px] object-cover w-full h-full"
                      alt={item.title}
                    />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span>
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {data?.results?.map((item) => (
              <div>
                <Link
                  to={`/movie/${item.id}`}
                  className=" w-full sm:w-[240px] h-[140px] relative"
                >
                  <img
                    src={
                      item.backdrop_path
                        ? url.backdrop + item.backdrop_path
                        : img
                    }
                    className="cursor-pointer  rounded-[4px]  w-full h-[180px]"
                    alt={item.title}
                  />
                  <p className="absolute -bottom-[150px] text-[14px]  w-[140px] sm:w-[150px] left-3 ">
                    {item.name || item.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
        {/* </> */}
      </div>
      <Footer />
    </>
  );
};

export default Search;
