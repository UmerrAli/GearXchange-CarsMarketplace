import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <Link to={"/ad-details/" + car?.id}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:border-gray-500 transition duration-300 cursor-pointer w-64">
        <div className="relative w-full h-40">
          <img
            src={car.images.at(0)}
            alt={car.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{car.title}</h3>

          <p className="text-gray-600">
            <span className="font-semibold">Model:</span> {car.model}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold">City:</span> {car.city}
          </p>
          <Separator />
          <p className="text-green-600 font-bold mt-1">PKR: {car.price}</p>
          <p className="text-green-600 font-bold mt-1"></p>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
