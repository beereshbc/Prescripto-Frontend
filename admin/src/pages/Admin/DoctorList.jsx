import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { aToken, getAllDoctors, doctors, changeAvailibility } =
    useContext(AdminContext);
  console.log(doctors);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="mt-5 overflow-y-scroll max-h-[90vh] ">
      <h1 className="font-medium mx-5 text-lg ">All Doctors</h1>
      <div className="flex gap-4 w-full gap-y-6 flex-wrap pt-5">
        {doctors.map((item, index) => (
          <div
            className="border-indigo-200 cursor-pointer max-w-56 p-4 border rounded-lg mx-1 "
            key={index}
          >
            <img
              className=" hover:bg-primary rounded-t-lg transition-all duration-300"
              src={item.image}
              alt=""
            />
            <div className="flex flex-col mt-1 items-center">
              <p className="text-xl font-medium">{item.name}</p>
              <p className="text-gray-900 text-sm py-1">{item.speciality}</p>
              <div className="flex gap-4">
                <input
                  className="cursor-pointer"
                  onChange={() => changeAvailibility(item._id)}
                  type="checkbox"
                  checked={!!item.available}
                />
                <p>Available </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
