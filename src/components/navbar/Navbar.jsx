import { useEffect, useRef, useState } from "react";
import logo from "../../../public/assets/logo.png";
import searchIcon from "../../../public/assets/search_icon.svg";
import bellIcon from "../../../public/assets/bell_icon.svg";
import profile_icon from "../../../public/assets/profile_img.png";
import caret_icon from "../../../public/assets/caret_icon.svg";
import { lagout } from "../../util/firebase";
import { Link } from "react-router-dom";
import { SlMenu } from "react-icons/sl";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 20) {
          navRef.current.classList.add("nav-dark");
        } else {
          navRef.current.classList.remove("nav-dark");
        }
      }
    };

    // Debounce the scroll event handler
    const debounce = (fn, wait) => {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
      };
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);

    window.addEventListener("scroll", debouncedHandleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  const handleProfile = () => {
    setProfile(!profile);
    setMenu(false);
  };
  const handleMenu = () => {
    setMenu(!menu);
    setProfile(false);
  };

  return (
    <div ref={navRef} className="w-full fixed z-[99]">
      <div className="container mx-auto px-5 flex relative justify-between">
        <div className="flex gap-14 items-center">
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className="w-[90px] h-[90px] object-contain"
            />
          </Link>
          <ul className=" gap-[20px] hidden md:flex">
            <Link to={"/"} className="hover:text-red-600 cursor-pointer">
              Home
            </Link>
            <Link
              to={`/explore/${"tv"}`}
              className="hover:text-red-600 cursor-pointer"
            >
              TV Shows
            </Link>
            <Link
              to={`/explore/${"movie"}`}
              className="hover:text-red-600 cursor-pointer"
            >
              Movies
            </Link>
            {/* <li className="hover:text-red-600 cursor-pointer">New & Popular</li> */}
          </ul>
        </div>
        <div className="flex gap-[20px] items-center">
          <Link to={"/search"}>
            <img src={searchIcon} alt="search" className="cursor-pointer" />
          </Link>

          {/* <img src={bellIcon} alt="bell" /> */}
          <div className="flex items-center gap-3 relative">
            <img
              src={profile_icon}
              alt="profile"
              onClick={handleProfile}
              className="cursor-pointer"
            />
            {/* <img src={caret_icon} alt="caret" /> */}
            {profile && (
              <div className="absolute right-0 bottom-[-70px] rounded-lg underline-offset-1 px-[18px] py-[22px] w-max bg-[#191919]">
                <p
                  onClick={() => lagout()}
                  className="text-[13px] cursor-pointer underline underline-offset-1"
                >
                  Sign Out of Netflix
                </p>
              </div>
            )}
            <div
              className="block md:hidden z-40 cursor-pointer"
              onClick={handleMenu}
            >
              <SlMenu />
            </div>
          </div>
        </div>

        <div
          className={`bg-[#04152d] absolute left-0 duration-300 ${
            menu ? "translate-x-0" : "translate-x-[200%]"
          } py-[40px] px-[20px] top-[90px] w-full`}
        >
          <ul className=" gap-[20px]  flex flex-col  ">
            <Link
              to={"/"}
              className="hover:text-red-600 border-b border-b-[#ffffff3f]  py-2 cursor-pointer"
            >
              Home
            </Link>
            <Link
              to={`/explore/${"tv"}`}
              className="hover:text-red-600 cursor-pointer"
            >
              TV Shows
            </Link>
            <Link
              to={`/explore/${"movie"}`}
              className="hover:text-red-600 cursor-pointer"
            >
              Movies
            </Link>
            <li className="hover:text-red-600 cursor-pointer">New & Popular</li>
          </ul>{" "}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
