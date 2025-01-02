import React from "react";
import Search from "./Search";

function Hero() {
  return (
    <div className="flex flex-col items-center p-20 gap-7 w-full bg-slate-200 mt-5">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Connecting Buyers and Sellers
      </h1>
      <h2 className="text-xl text-gray-600">
        Explore a wide range of cars, from used to new, and make the purchase
        that's right for you.
      </h2>
      <Search />
    </div>
  );
}

export default Hero;
