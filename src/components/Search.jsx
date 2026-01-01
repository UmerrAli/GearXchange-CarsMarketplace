import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HiSearch } from "react-icons/hi";
import { carMakes, cities, prices } from "@/Shared/formData";

import { useNavigate } from "react-router-dom";

function Search({ onSearch }) {
  const [make, setMake] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Build filters object
    const filters = {};

    if (make) filters.make = make;
    if (city) filters.city = city;

    // Parse price range (e.g., "5 Lacs" -> maxPrice)
    if (priceRange) {
      const priceValue = parseInt(priceRange.replace(/\D/g, "")) * 100000; // Convert lacs to actual number
      filters.maxPrice = priceValue;
    }

    // Call the onSearch callback if provided (for Used Cars page)
    if (onSearch) {
      onSearch(filters);
    } else {
      // Otherwise, this is on home page, navigate to used cars page with query params
      const queryParams = new URLSearchParams();
      if (filters.make) queryParams.append("make", filters.make);
      if (filters.city) queryParams.append("city", filters.city);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);

      navigate(`/used?${queryParams.toString()}`);
    }
  };

  return (
    <div className="flex outline outline-[0.1vw] sm:gap-5 items-center gap-4 flex-col md:flex-row p-4 rounded-md md:rounded-full bg-white px-5 w-[70%]">
      <Select onValueChange={(value) => setMake(value)}>
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
      <Select onValueChange={(value) => setCity(value)}>
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
      <Select onValueChange={(value) => setPriceRange(value)}>
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
        <HiSearch
          className="size-7 hover:scale-105 cursor-pointer transition-all"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default Search;
