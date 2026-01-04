import { useEffect, useState } from "react";
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

  if (loading)
    return <div className="py-10 text-center">Loading featured cars...</div>;
  if (!cars.length) return null;

  return (
    <div className="mx-4 md:mx-20 lg:mx-32">
      <h2 className="my-10 text-center text-3xl font-bold">Featured Cars</h2>
      <Carousel>
        <CarouselContent>
          {cars.map((car, index) => {
            return (
              <CarouselItem
                className="m-2 flex basis-full justify-center md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                key={car.id}
              >
                <CarCard car={car} key={index} />
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
