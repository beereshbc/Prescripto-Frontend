import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:block">
      <div className="flex p-16 gap-10   ">
        {/* --------- left section ----------- */}
        <div className="w-1/2 flex flex-col">
          <p
            onClick={() => navigate("/")}
            className=" text-primary font-medium mb-8 cursor-pointer"
          >
            VaidhyaBandhu
          </p>
          <p className="text-sm text-start text-gray-500 font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/* --------- center section ----------- */}
        <div className="w-1/4 flex flex-col gap-y-6">
          <h2 className="text-xl font-medium text-gray-600">COMPANY</h2>
          <ul>
            <li
              className="text-gray-500 font-medium py-1 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="text-gray-500 font-medium py-1 cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About us
            </li>
            <li
              className="text-gray-500 font-medium py-1 cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact us
            </li>
            <li
              className="text-gray-500 font-medium py-1 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Privacy policy
            </li>
          </ul>
        </div>
        {/* --------- right section ----------- */}
        <div className="w-1/4 flex flex-col">
          <h2 className="text-xl font-medium text-gray-600 mb-6">
            GET IN TOUCH
          </h2>
          <p className="text-gray-500 font-medium py-1 cursor-pointer">
            +91-6360995219
          </p>
          <p className="text-gray-500 font-medium py-1 cursor-pointer">
            bcbeeresh@gmail.com
          </p>
        </div>
      </div>
      <hr className=" bg-gray-900" />
      <p className=" py-4 text-center font-medium text-sm">
        Copyright © 2025 Beeresh - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
