import React from "react";

function Logo() {
  return (
    <div className="flex">
      <img
        src="/gear.png"
        alt="gear logo"
        className="w-8 h-8 md:w-10 md:h-10 animate-spin"
        style={{ animationDuration: "10000ms" }}
      />
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 ml-2">GearXchange</h2>
    </div>
  );
}

export default Logo;
