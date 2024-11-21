"use client";
import React from "react";
import Image from "next/image";
import CarImage from "@/public/images/car.png";

interface RideComparisonResultsProps {
  success: boolean;
  distance: string;
  price: string;
  rider: string | null;
}
const RideComparisonResults: React.FC<RideComparisonResultsProps> = ({
  success,
  distance,
  price,
  rider,
}) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 text-center">
      {/* Handle undefined rider */}
      <h3 className="text-lg font-bold text-white">
        {rider ? rider.toUpperCase() : "Unknown Rider"}
      </h3>
      <Image
        src={CarImage}
        alt={`${rider || "Unknown"} Car`}
        className="w-12 h-12 mx-auto my-2"
      />
      <div>
        <h4 className="text-md font-semibold text-green-400">
          {success ? "Available" : "Unavailable"}
        </h4>
        <p className="text-sm text-gray-400">Distance: {distance || "N/A"}</p>
        <p className="text-lg font-bold text-gray-300">{price || "N/A"}</p>
      </div>
    </div>
  );
};

export default RideComparisonResults;
