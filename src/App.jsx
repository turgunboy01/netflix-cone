import { useEffect } from "react";
import Home from "./pages/home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Player from "./pages/player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./util/firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MoviePage from "./pages/moviePage/MoviePage";
import { fetchDataFromApi } from "./util/api";
import { getApiConfiguration, getGenres } from "./redux/homeSlice";
import { useDispatch } from "react-redux";
import Explore from "./pages/explore/Explore";
import Player2 from "./pages/player/Player2";
import Search from "./pages/search/Search";
import ScrollTop from "./components/ScrollTop";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    console.log(data);

    dispatch(getGenres(allGenres));
  };

  // console.log();
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  return (
    <div>
      <ToastContainer theme="dark" />
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:mediaType/:id" element={<MoviePage />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/playe/:id" element={<Player2 />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
      </Routes>
    </div>
  );
};

export default App;
