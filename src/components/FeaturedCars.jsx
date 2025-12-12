import React from "react";
import { featuredCars } from "../Shared/featuredCarData";
import CarCard from "./CarCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function FeaturedCars() {
  return (
    <div className="mx-60">
      <h2 className="font-bold text-3xl text-center my-10">Featured Cars</h2>
      <Carousel>
        <CarouselContent>
          {featuredCars.map((car, index) => {
            return (
              <CarouselItem className="basis-1/4" key={index}>
                <CarCard car={car} key={index} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default FeaturedCars;
