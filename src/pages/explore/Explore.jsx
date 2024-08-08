import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../util/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import MovieCard from "../../components/movieCard/MovieCard.jsx";
import Navbar from "../../components/navbar/Navbar";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer.jsx";
let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const { mediaType } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setLoading(false);
      setPageCount(2);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageCount}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPageCount((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageCount(1);
    setSortBy(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageCount(1);
    fetchInitialData();
  };
  const { url } = useSelector((state) => state.home);
  // console.log(data);
  return (
    <>
      <Navbar />
      <div className="lg:container mx-auto px-5 pt-[80px] ">
        <div className="grid grid-cols-2 items-center mb-[0px]">
          <div>
            <h1 className="capitalize text-[35px]  font-semibold">
              Explore{" "}
              <span className="italic">
                {mediaType === "tv" ? "Tv Shows" : mediaType}
              </span>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:max-w-[500px] md:min-h-[250px]">
              <Select
                isMulti
                name="genres"
                closeMenuOnSelect={false}
                options={genresData?.genres}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={onChange}
                placeholder="Select genres"
                className="react-select-container genresDD"
                classNamePrefix="react-select"
                value={genre}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    border: 0,
                    outline: 0,
                    boxShadow: "none",
                    borderRadius: "20px",
                    backgroundColor: "#173d77",
                    color: "white",
                    "&:hover": {
                      borderColor: state.isFocused ? "#1c4b91" : "#173d77",
                    },
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    color: "white",
                    margin: "0 10px",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#6f85a5",
                    borderRadius: "10px",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  multiValueRemove: (base, state) => ({
                    ...base,
                    backgroundColor: "transparent",
                    color: state.isFocused ? "#1c4b91" : "#222",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#1c4b91",
                    },
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  indicatorSeparator: (base) => ({
                    ...base,
                    backgroundColor: "white",
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: "white",
                    "&:hover": {
                      color: "#fff",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "0 0 10px 10px",
                    marginTop: "0",
                  }),
                  menuList: (base) => ({
                    ...base,
                    padding: 0,
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#1c4b91"
                      : state.isFocused
                      ? "#d1e3fc"
                      : "#fff",
                    color: state.isSelected ? "#fff" : "#000",
                    "&:active": {
                      backgroundColor: "#1c4b91",
                      color: "#fff",
                    },
                  }),
                }}
              />
            </div>
            <div className="w-full md:w-[250px]">
              <Select
                name="sortby"
                options={sortbyData}
                onChange={onChange}
                value={sortBy}
                isClearable={true}
                placeholder="Sort By"
                className="react-select-container sortbyDD"
                classNamePrefix="react-select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    border: 0,
                    outline: 0,
                    boxShadow: "none",
                    borderRadius: "20px",
                    backgroundColor: "#173d77",
                    color: "white",
                    "&:hover": {
                      borderColor: state.isFocused ? "#1c4b91" : "#173d77",
                    },
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    color: "white",
                    margin: "0 10px",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  indicatorSeparator: (base) => ({
                    ...base,
                    backgroundColor: "white",
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: "white",
                    "&:hover": {
                      color: "#fff",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "0 0 10px 10px",
                    marginTop: "0",
                  }),
                  menuList: (base) => ({
                    ...base,
                    padding: 0,
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#1c4b91"
                      : state.isFocused
                      ? "#d1e3fc"
                      : "#fff",
                    color: state.isSelected ? "#fff" : "#000",
                    "&:active": {
                      backgroundColor: "#1c4b91",
                      color: "#fff",
                    },
                  }),
                }}
              />
            </div>
          </div>
        </div>
        <>
          {data?.results?.length > 0 ? (
            <InfiniteScroll
              className="content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              dataLength={data?.results?.length || 0}
              next={fetchNextPageData}
              hasMore={pageCount <= data?.total_pages}
            >
              {data?.results?.map((item) => {
                if (item.media_type === "person") return null;
                return (
                  <div
                    key={item.id}
                    className="movieCard"
                    onClick={() =>
                      navigate(`/${mediaType || item.media_type}/${item.id}`)
                    }
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
                    <div className="textBlock flex justify-between pb-4 pt-2">
                      <span className="title font-semibold">
                        {(item.title || item.name || "").slice(0, 20)}...
                      </span>
                      <span className="font-medium text-sm">
                        {dayjs(item.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          ) : (
            <div>
              <h3>Sorry, no results found</h3>
            </div>
          )}
        </>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
