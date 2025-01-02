import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HiSearch } from "react-icons/hi";
import { carMakes, cities, prices } from "./../../Shared/formData";

function Search() {
  return (
    <div className="flex sm:gap-5 items-center gap-10 flex-col md:flex-row  p-4 rounded-md md:rounded-full bg-white  px-5 w-[70%]">
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none">
          <SelectValue placeholder="Car Make" />
        </SelectTrigger>
        <SelectContent>
          {carMakes.map((maker) => (
            <SelectItem key={maker} value={maker}>
              {maker}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Separator orientation="vertical" className="hidden md:block" />
      </div>
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Separator orientation="vertical" className="hidden md:block" />
      </div>
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          {prices.map((price) => (
            <SelectItem key={price} value={price}>
              {price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center">
        <HiSearch className="size-7 hover:scale-105 cursor-pointer transition-all" />
      </div>
    </div>
  );
}

export default Search;
