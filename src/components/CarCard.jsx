import { Link } from "react-router-dom";
import { Fuel, Gauge } from "lucide-react";

function CarCard({ car }) {
  const images = typeof car.images === 'string' ? JSON.parse(car.images) : (car.images || []);
  const mainImage = images && images.length > 0 ? images[0] : "";

  return (
    <Link to={"/ad-details/" + car?.id} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1  w-64">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={mainImage}
            alt={car.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-1">
            PKR {Number(car.price).toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-primary transition-colors">
            {car.title}
          </h3>
          <p className="text-sm text-gray-500 truncate">{car.city}</p>

          <div className="flex items-center justify-between gap-2 text-xs text-gray-600 border-t border-gray-50 pt-3">
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
              <Gauge className="w-3.5 h-3.5 text-gray-400" />
              <span>{Number(car.mileage).toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
              <Fuel className="w-3.5 h-3.5 text-gray-400" />
              <span>{car.fuelType || "Petrol"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
