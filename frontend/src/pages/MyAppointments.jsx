import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className="font-medium border-b mt-12 pb-3 text-gray-700">
        My appointments
      </p>
      <div>
        {doctors.slice(0, 2).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] sm:flex sm:gap-6 py-2 border-b gap-4"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.image} alt="" />
            </div>
            <div className="flex-1 text-sm gap-2 text-gray-600">
              <p className="text-sm font-medium text-gray-600 ">{item.name}</p>
              <p className="text-xs text-gray-500 mb-2">{item.speciality}</p>
              <p className="text-gray-700 font-medium">Address:</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="text-sm text-gray-700 mt-3">
                <span className="font-medium ">Date & Time:</span> 25, July,
                2024 | 8:30 PM
              </p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end gap-2">
              <button
                className="text-sm text-stone-500 text-center py-2 sm:min-w-28 border px-2 hover:bg-primary hover:text-white transition-all duration-150
              "
              >
                Pay here
              </button>
              <button
                className="text-sm text-stone-500 text-center py-2 sm:min-w-28 border px-2 hover:bg-red-600 hover:text-white transition-all duration-150
              "
              >
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
