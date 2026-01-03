import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function DetailsHeader({ adDetails }) {
  const images = typeof adDetails.images === 'string' ? JSON.parse(adDetails.images) : (adDetails.images || []);

  return (
    <div className="relative group">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in flex items-center justify-center">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="object-contain hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[90vh] w-full h-full border-none bg-transparent shadow-none p-0 flex items-center justify-center">
                  <img
                    src={image}
                    alt={`Full view ${index + 1}`}
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-gray-800 border-none shadow-md" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white text-gray-800 border-none shadow-md" />
      </Carousel>
      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md pointer-events-none">
        {images.length} Photos
      </div>
    </div>
  );
}

export default DetailsHeader;
