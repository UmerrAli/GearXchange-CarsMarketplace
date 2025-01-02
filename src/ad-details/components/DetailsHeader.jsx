import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function DetailsHeader({ adDetails }) {
  return (
    <div>
      <h1 className="text-2xl font-bold px-56">{adDetails.title}</h1>
      <Carousel className="mt-5 max-w-4xl mx-auto flex items-center justify-center">
        <CarouselContent>
          {adDetails.images.map((image, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default DetailsHeader;
