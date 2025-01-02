import React from "react";

function Logo() {
  return (
    <div className="flex">
      <img
        src="/gear.png"
        alt="gear logo"
        className="w-10 h-10 animate-spin"
        style={{ animationDuration: "8000ms" }}
      />
      <h2 className="text-3xl font-bold text-gray-900 ml-2">GearXchange</h2>
    </div>
  );
}

export default Logo;
