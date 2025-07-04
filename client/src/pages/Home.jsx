import React from "react";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import BestSeller from "../components/home/BestSeller";
import NewsLetter from "../components/home/NewsLetter";

const Home = () => {

  return (
    <div className="mt-10">
      <Hero />
      <Categories />
      <BestSeller />
      <NewsLetter />
    </div>
  );
};

export default Home;
