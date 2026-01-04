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
                  <div className="relative w-full aspect-video bg-muted rounded-2xl overflow-hidden cursor-zoom-in flex items-center justify-center">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="object-contain w-full h-full hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full border-none bg-background/95 backdrop-blur-xl shadow-none p-0 flex items-center justify-center rounded-3xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Full view ${index + 1}`}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                  />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 bg-background/80 hover:bg-background text-foreground border-border shadow-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all" />
        <CarouselNext className="right-6 bg-background/80 hover:bg-background text-foreground border-border shadow-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all" />
      </Carousel>
      <div className="absolute bottom-6 right-6 bg-background/90 text-foreground text-xs font-bold px-4 py-2 rounded-full border border-border shadow-lg backdrop-blur-md pointer-events-none tracking-widest uppercase">
        {images.length} Photos
      </div>
    </div>
  );
}

export default DetailsHeader;
