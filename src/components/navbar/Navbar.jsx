import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/assets/logo.png";
import searchIcon from "../../../public/assets/search_icon.svg";
import bellIcon from "../../../public/assets/bell_icon.svg";
import profile_icon from "../../../public/assets/profile_img.png";
import caret_icon from "../../../public/assets/caret_icon.svg";
import { lagout } from "../../util/firebase";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  // const {} =
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  return (
    <div
      ref={navRef}
      className=" container mx-auto px-5 flex fixed z-[99]   justify-between"
    >
      <div className="flex gap-14 items-center">
        <img
          src={logo}
          alt=" logo"
          className="w-[90px] h-[90px] object-contain"
        />
        <ul className="flex gap-[20px]">
          <li className="hover:text-red-600 cursor-pointer">Home</li>
          <li className="hover:text-red-600 cursor-pointer">Tv Shows</li>
          <li className="hover:text-red-600 cursor-pointer">Movies</li>
          <li className="hover:text-red-600 cursor-pointer">New & Popular</li>
          <li className="hover:text-red-600 cursor-pointer">My List</li>
          <li className="hover:text-red-600 cursor-pointer">
            Browse by Languages
          </li>
        </ul>
      </div>
      <div className="flex gap-[20px] items-center">
        <img src={searchIcon} alt="search" />
        <p>children</p>
        <img src={bellIcon} alt="bell" />
        <div className="flex items-center gap-3 relative">
          <img src={profile_icon} alt="" onClick={() => setProfile(!profile)} />
          <img src={caret_icon} alt="" />
          {profile && (
            <div className=" absolute right-0 bottom-[-70px] rounded-lg underline-offset-1 px-[18px] py-[22px] w-max bg-[#191919]">
              <p
                onClick={() => lagout()}
                className="text-[13px]  cursor-pointer underline underline-offset-1"
              >
                Sign Out of Netlix
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
