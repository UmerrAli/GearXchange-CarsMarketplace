import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HiSearch } from "react-icons/hi";
import { carMakes, cities, prices, carModels } from "@/Shared/formData";

import { useNavigate } from "react-router-dom";

function Search({ onSearch }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const filters = {};

    if (make) filters.make = make;
    if (model) filters.model = model;
    if (city) filters.city = city;

    if (priceRange) {
      if (priceRange === "< 5 Lacs") {
        filters.maxPrice = 500000;
      } else if (priceRange === "> 100 Lacs") {
        filters.minPrice = 1000000;
      } else {
        const match = priceRange.match(/(\d+)\s*-\s*(\d+)/);
        const maxPrice = parseInt(match[2]) * 100000;
        const minPrice = parseInt(match[1]) * 100000;
        filters.maxPrice = maxPrice;
        filters.minPrice = minPrice;
      }
    }

    if (onSearch) {
      onSearch(filters);
    } else {
      const queryParams = new URLSearchParams();
      if (filters.make) queryParams.append("make", filters.make);
      if (filters.model) queryParams.append("model", filters.model);
      if (filters.city) queryParams.append("city", filters.city);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);

      navigate(`/used?${queryParams.toString()}`);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-md bg-background/80 p-4 px-5 shadow-lg outline outline-border/50 backdrop-blur-md dark:bg-slate-900/80 sm:gap-5 md:flex-row md:rounded-full">
      <Select
        onValueChange={(value) => {
          setMake(value);
          setModel("");
        }}
      >
        <SelectTrigger className="w-full bg-transparent shadow-none outline-none md:border-none">
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
      <Select
        disabled={!make}
        onValueChange={(value) => setModel(value)}
        value={model}
      >
        <SelectTrigger className="w-full bg-transparent shadow-none outline-none md:border-none">
          <SelectValue placeholder="Car Model" />
        </SelectTrigger>
        <SelectContent>
          {carModels[make]?.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Separator orientation="vertical" className="hidden md:block" />
      </div>
      <Select onValueChange={(value) => setCity(value)}>
        <SelectTrigger className="w-full bg-transparent shadow-none outline-none md:border-none">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((provinceGroup) => (
            <div key={provinceGroup.province}>
              <SelectGroup>
                <SelectLabel>{provinceGroup.province}</SelectLabel>
                {provinceGroup.cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Separator orientation="vertical" className="hidden md:block" />
      </div>
      <Select onValueChange={(value) => setPriceRange(value)}>
        <SelectTrigger className="w-full bg-transparent shadow-none outline-none md:border-none">
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
          className="size-7 cursor-pointer transition-all hover:scale-105"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default Search;
