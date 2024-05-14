import React, { useEffect } from "react";
import Home from "./pages/home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Player from "./pages/player/Player";
import { onChildChanged } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./util/firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate("/");
      } else {
        console.log("Logged Out ");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
