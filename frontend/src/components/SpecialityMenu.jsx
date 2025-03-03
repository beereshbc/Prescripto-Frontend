import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center py-16 text-gray-800 gap-4"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find by Speciality </h1>
      <p className="md:w-1/3  text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex flex-row overflow-scroll gap-4 pt-5 w-full justify-center">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            key={index}
            className="flex flex-col cursor-pointer hover:translate-y-[-10px] transition-all duration-500 text-xs items-center flex-shrink-0"
          >
            <img
              className="w-16 sm:w-24 mb-2 text-center"
              src={item.image}
              alt=""
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
