import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  return (
    <div
      // onClick={() => setActive((prev) => !prev)}
      className="flex flex-wrap bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10"
    >
      {/* ----------------left side---------------- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 text-center ">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold ">
          <p className="mb-4">Book Appointment </p>
          <p>With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("login");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base py-3 px-12 rounded-full mt-10 hover:scale-105 transition-all duration-200 text-black"
        >
          Create account
        </button>
      </div>
      {/* ----------------right side---------------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className={`absolute bottom-0 w-full right-0 max-w-md ${
            active ? "hidden" : "block"
          }`}
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
