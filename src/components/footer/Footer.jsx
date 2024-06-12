import React from "react";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" lg:container mx-auto px-5 pt-[60px] pb-[30px]">
      <div className=" flex gap-5 text-[25px]">
        <FaFacebookF className="hover:text-red-600 cursor-pointer" />
        <FaInstagram className="hover:text-red-600 cursor-pointer" />
        <BsTwitter className="hover:text-red-600 cursor-pointer" />
        <BsYoutube className="hover:text-red-600 cursor-pointer" />
      </div>
      <div className="flex flex-wrap gap-[50px] sm:gap-[100px] py-[30px]">
        <div className="">
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            Audio Description
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer py-1">
            Investor Relations
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            Legal Notices
          </li>
        </div>
        <div className="">
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            Help Center
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer py-1">
            Jobs
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            Cookie Preferences
          </li>
        </div>
        <div className="">
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            Gift Cards
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer py-1">
            {" "}
            Terms of Use
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            {" "}
            Corporate Information
          </li>
        </div>
        <div className="">
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            Media Center
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer py-1">
            Privacy
          </li>
          <li className="text-[16px] font-medium hover:text-red-600 cursor-pointer">
            Contact Us
          </li>
        </div>
      </div>
      <h1 className=" py-2 border-t border-t-[#eeeeee41]  ">
        &copy; 1997-2024Netflix, Inc
      </h1>
    </div>
  );
};

export default Footer;
