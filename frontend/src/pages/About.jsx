import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="mb-20">
      <p className="text-center text-gray-500 font-medium text-2xl">
        ABOUT <span className="text-gray-900">US</span>
      </p>
      <div className="flex sm:flex-row flex-col flex-wrap">
        <div className="m-2">
          <img className="w-80" src={assets.about_image} alt="" />
        </div>
        <div className=" flex flex-col m-10 mt-5 sm:max-w-[700px] text-sm gap-5 text-gray-700">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className="font-medium text-gray-900"> Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="flex flex-col text-gray-700 mt-6">
        <p className="text-gray-700 m-10">
          WHY <span className="text-gray-900 font-medium ">CHOOSE US</span>
        </p>
        <div className="flex flex-col sm:flex-row ">
          <div className="sm:max-w-1/3 p-10 flex-shrink w-30% border border-gray-500 flex flex-col gap-y-4 text-sm hover:bg-primary hover:text-white transition-all duration-500">
            <p className="text-gray-900 font-medium">Efficiency:</p>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="sm:max-w-1/3 p-10 flex-shrink w-30% border border-gray-500 flex flex-col gap-y-4 text-sm hover:bg-primary hover:text-white transition-all duration-500">
            <p className="text-gray-900 font-medium">Convenience:</p>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="sm:max-w-1/3 p-10 flex-shrink w-30% border border-gray-500 flex flex-col gap-y-4 text-sm hover:bg-primary hover:text-white transition-all duration-500">
            <p className="text-gray-900 font-medium">Personalization:</p>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
