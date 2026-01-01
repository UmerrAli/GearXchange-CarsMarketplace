import React, { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getFeaturedAds } from "@/db/getFeaturedAds";

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await getFeaturedAds();
        if (error) {
          console.error("Error fetching featured ads:", error);
        } else {
          setCars(data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <div className="text-center py-10">Loading featured cars...</div>;
  if (!cars.length) return null; // Or return a message "No featured cars available"

  return (
    <div className="mx-4 md:mx-20 lg:mx-32">
      <h2 className="font-bold text-3xl text-center my-10">Featured Cars</h2>
      <Carousel>
        <CarouselContent>
          {cars.map((car, index) => {
            return (
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center m-2" key={car.id}>
                <CarCard car={car} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:-left-12" />
        <CarouselNext className="right-2 md:-right-12" />
      </Carousel>
    </div>
  );
}

export default FeaturedCars;
