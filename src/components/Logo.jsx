import { useEffect } from "react";
import { useTheme } from "next-themes";

const Logo = ({ size = "md" }) => {

  const { theme } = useTheme();
  
  const sizes = {
    sm: { img: "w-6 h-6 animate-spin", text: "text-lg" },
    md: { img: "w-8 h-8 md:w-10 md:h-10 animate-spin", text: "text-xl md:text-2xl lg:text-3xl" },
    lg: { img: "w-12 h-12 md:w-16 md:h-16 animate-spin", text: "text-2xl md:text-4xl lg:text-5xl" },
  };

  const { img: imgSize, text: textSize } = sizes[size] || sizes
  return (
    <div className="flex">
      <img
        src={theme === "dark" ? "/gear.png" : "/gearDark.png"}
        alt="gear logo"
        className={imgSize}
        style={{ animationDuration: "10000ms" }}
      />
      <h2 className={textSize + " ml-2 text-center font-bold"}>GearXchange</h2>
    </div>
  );
}

export default Logo;
