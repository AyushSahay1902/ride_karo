import React, { useState } from "react";
import { MapPin } from "lucide-react";

const RideComparisonForm = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Comparing prices for:", { startLocation, endLocation });
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-5xl bg-gradient-to-r from-lime-100 to-blue-100 rounded-2xl shadow-xl overflow-hidden p-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-grow">
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="start-location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              required
              placeholder="Enter pickup location"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="end-location"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              required
              placeholder="Enter drop-off location"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-shrink-0 bg-gradient-to-r from-lime-400 to-blue-500 text-white py-2 px-6 rounded-lg hover:from-lime-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition duration-300 ease-in-out ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Comparing..." : "Compare Prices"}
        </button>
      </form>
    </div>
  );
};

export default RideComparisonForm;
