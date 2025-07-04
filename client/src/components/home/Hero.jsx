import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full">
      <img
        className="w-full m-auto h-[25rem] object-cover"
        src={assets.mealImage}
        alt="A Table full of meals"
      />

      <div className="absolute top-1/4 left-1/10 flex flex-col inste-0 items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24 ">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left max-w-72 md:max-w-80 leading-tight lg:leading-15">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        <div className="flex items-center gap-6 font-medium mt-6">
          <Link
            to="/products"
            className="flex group items-center px-8 py-2 rounded-full bg-primary hover:bg-hover text-white"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
