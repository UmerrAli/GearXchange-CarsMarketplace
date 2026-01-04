import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function DetailsHeader({ adDetails }) {
  const images =
    typeof adDetails.images === "string"
      ? JSON.parse(adDetails.images)
      : adDetails.images || [];

  return (
    <div className="group relative">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative flex aspect-video w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                  </div>
                </DialogTrigger>
                <DialogContent className="flex h-full max-h-[95vh] w-full max-w-[95vw] items-center justify-center overflow-hidden rounded-3xl border-none bg-background/95 p-0 shadow-none backdrop-blur-xl">
                  <img
                    src={image}
                    alt={`Full view ${index + 1}`}
                    className="max-h-full max-w-full object-contain shadow-2xl"
                  />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 border-border bg-background/80 text-foreground opacity-0 shadow-xl backdrop-blur-sm transition-all hover:bg-background group-hover:opacity-100" />
        <CarouselNext className="right-6 border-border bg-background/80 text-foreground opacity-0 shadow-xl backdrop-blur-sm transition-all hover:bg-background group-hover:opacity-100" />
      </Carousel>
      <div className="pointer-events-none absolute bottom-6 right-6 rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground shadow-lg backdrop-blur-md">
        {images.length} Photos
      </div>
    </div>
  );
}

export default DetailsHeader;
