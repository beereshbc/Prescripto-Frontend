import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="mb-20">
      <p className="text-center text-gray-700">
        CONTACT <span className="text-gray-900 font-medium">US</span>
      </p>
      <div className="flex flex-col sm:flex-row m-auto items-center justify-center gap-10 mt-10">
        <div>
          <img className="w-80" src={assets.contact_image} alt="" />
        </div>
        <div className="flex flex-col gap-y-5 ">
          <p className="text-gray-900 font-medium text-lg">OUR OFFICE</p>
          <p className="text-gray-500 text-sm">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <div className="text-gray-500 text-sm">
            <p>Tel: (415) 555‑0132</p>
            <p>Email: greatstackdev@gmail.com</p>
          </div>
          <div>
            <p className="text-gray-900 font-medium text-lg mb-2">
              CAREERS AT PRESCRIPTO
            </p>
            <p className="text-gray-500 text-xs">
              Learn more about our teams and job openings.
            </p>
            <button className="text-xs py-2 px-8 border border-gray-500 mt-4 hover:bg-black hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
