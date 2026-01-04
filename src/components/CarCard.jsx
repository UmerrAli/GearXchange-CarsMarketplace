import { Link } from "react-router-dom";
import { Fuel, Gauge } from "lucide-react";

function CarCard({ car }) {
  const images =
    typeof car.images === "string" ? JSON.parse(car.images) : car.images || [];
  const mainImage = images && images.length > 0 ? images[0] : "";

  return (
    <Link to={"/ad-details/" + car?.id} className="group block">
      <div className="w-full overflow-hidden rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={mainImage}
            alt={car.title}
            className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-md">
            PKR {Number(car.price).toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-1 truncate text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {car.title}
          </h3>
          <p className="truncate text-sm text-muted-foreground">{car.city}</p>

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/50 pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1">
              <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{Number(car.mileage).toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1">
              <Fuel className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{car.fuelType || "Petrol"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
