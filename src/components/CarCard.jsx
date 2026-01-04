import { Link } from "react-router-dom";
import { Fuel, Gauge } from "lucide-react";

function CarCard({ car }) {
  const images = typeof car.images === 'string' ? JSON.parse(car.images) : (car.images || []);
  const mainImage = images && images.length > 0 ? images[0] : "";

  return (
    <Link to={"/ad-details/" + car?.id} className="block group">
      <div className="bg-card text-card-foreground rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50 hover:border-primary/50 hover:-translate-y-1 w-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={mainImage}
            alt={car.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-1">
            PKR {Number(car.price).toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground mb-1 truncate group-hover:text-primary transition-colors">
            {car.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{car.city}</p>

          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground border-t border-border/50 pt-3 mt-2">
            <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
              <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{Number(car.mileage).toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
              <Fuel className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{car.fuelType || "Petrol"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
