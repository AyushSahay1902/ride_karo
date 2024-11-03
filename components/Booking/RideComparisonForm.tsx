import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { SearchBox } from "@mapbox/search-js-react";
import { useLocation } from "@/app/context/LocationContext";

interface LocationState {
  address: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
}

const RideComparisonForm = () => {
  const {
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
  } = useLocation();

  const [currentVehicle, setCurrentVehicle] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicles = [
    { name: "Bike", price: "From ₹50" },
    { name: "Auto", price: "From ₹80" },
    { name: "Car Mini", price: "From ₹120" },
    { name: "Sedan", price: "From ₹150" },
    { name: "Prime", price: "From ₹200" },
  ];

  const handleLocationSelect = (
    result: any,
    locationType: "pickup" | "dropoff"
  ) => {
    const [longitude, latitude] = result.features[0].geometry.coordinates;
    const address = result.features[0].place_name;

    const updatedLocation = {
      address,
      coordinates: { latitude, longitude },
    };

    if (locationType === "pickup") {
      setPickupLocation(updatedLocation);
    } else {
      setDropoffLocation(updatedLocation);
    }
  };

  const handleComparePrices = async () => {
    if (
      !pickupLocation.coordinates.latitude ||
      !dropoffLocation.coordinates.latitude
    ) {
      setError("Please select both pickup and dropoff locations");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/compare-prices", {
        method: "GET",
        headers: {
          "pickup-lat": pickupLocation.coordinates.latitude.toString(),
          "pickup-lng": pickupLocation.coordinates.longitude?.toString() || "",
          "dropoff-lat": dropoffLocation.coordinates.latitude.toString(),
          "dropoff-lng":
            dropoffLocation.coordinates.longitude?.toString() || "",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch prices");
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("Error comparing prices:", err);
      setError("Failed to compare prices. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVehicle((prev) => (prev + 1) % vehicles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl h-auto min-h-[350px] p-6 rounded-lg backdrop-blur-sm shadow-lg flex justify-around bg-white/90">
      <div className="space-y-6 w-1/2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
          Compare Rides in Your City
        </h2>

        <div className="space-y-4">
          {/* Pickup Location */}
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110">
              <MapPin className="w-5 h-5 text-green-500" />
            </div>
            <SearchBox
              accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
              options={{ country: ["IN"] }}
              onRetrieve={(result) => handleLocationSelect(result, "pickup")}
              placeholder="Enter pickup location"
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Dropoff Location */}
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110">
              <MapPin className="w-5 h-5 text-red-500" />
            </div>
            <SearchBox
              accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
              options={{ country: ["IN"] }}
              onRetrieve={(result: any) =>
                handleLocationSelect(result, "dropoff")
              }
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={handleComparePrices}
              className="ml-4 text-blue-600 underline"
            >
              Retry
            </button>
          </div>
        )}

        <button
          onClick={handleComparePrices}
          disabled={
            isLoading ||
            !pickupLocation.coordinates.latitude ||
            !dropoffLocation.coordinates.latitude
          }
          className={`w-full py-3 px-6 rounded-full font-medium shadow-md transition-all duration-300 ${
            isLoading ||
            !pickupLocation.coordinates.latitude ||
            !dropoffLocation.coordinates.latitude
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isLoading ? "Comparing Prices..." : "Compare Prices"}
        </button>
      </div>

      {/* Vehicle Carousel */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="relative h-40 w-full">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className={`absolute top-0 left-0 w-full text-center transition-all duration-500 transform ${
                index === currentVehicle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                {vehicle.name}
              </div>
              <div className="text-xl text-gray-600">{vehicle.price}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          {vehicles.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentVehicle
                  ? "bg-gradient-to-r from-green-400 to-blue-500 w-4"
                  : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RideComparisonForm;
