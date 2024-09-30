import React, { useState, useContext } from "react";
import { MapPin } from "lucide-react";
import cities from "@/data/cities";
import Cars from "./Cars";
import { UserLoactionCont } from "@/context/UserLocationCont";
import MapBox from "../Map/MapBox";

const RideComparisonForm = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState("");
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);

  const { userLocation } = useContext(UserLoactionCont);

  const MAPBOX_DIRECTIONS_URL =
    "https://api.mapbox.com/directions/v5/mapbox/driving/";

  const [addressList, setAddressList] = useState<{
    suggestions: string[];
    length: number;
  }>({
    suggestions: [],
    length: 0,
  });

  const getAddressSuggestions = async (query: string, inputType: string) => {
    if (!query) {
      setAddressList({ suggestions: [], length: 0 });
      return;
    }

    setAddressList({
      suggestions: cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      ),
      length: cities.length,
    });
    setActiveInput(inputType);
  };

  const fetchRoute = async (
    startCoords: [number, number],
    endCoords: [number, number]
  ) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const directionsUrl = `${MAPBOX_DIRECTIONS_URL}${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=${accessToken}`;

    const response = await fetch(directionsUrl);
    const data = await response.json();

    if (data.routes.length) {
      setRouteGeoJSON(data.routes[0].geometry);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated start and end coordinates (replace with actual location data)
    const startCoords: [number, number] = [
      userLocation.longitude,
      userLocation.latitude,
    ];
    const endCoords: [number, number] = [72.8777, 19.076]; // Replace this with dynamic coordinates for the end location

    await fetchRoute(startCoords, endCoords);

    setIsLoading(false);
  };

  const handleSelectAddress = (address: string, inputType: string) => {
    if (inputType === "start") {
      setStartLocation(address);
    } else {
      setEndLocation(address);
    }
    setAddressList({ suggestions: [], length: 0 });
  };

  const onSourceChange = (e: any) => {
    setStartLocation(e.target.value);
    getAddressSuggestions(e.target.value, "start");
  };

  return (
    <div className="w-full max-w-5xl bg-gradient-to-r from-lime-100 to-blue-100 rounded-2xl shadow-xl p-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-grow relative">
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="start-location"
              value={startLocation}
              onChange={(e) => onSourceChange(e)}
              required
              placeholder="Enter pickup location"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
            />
          </div>
          {addressList.length > 0 && activeInput === "start" && (
            <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
              {addressList.suggestions.map((address, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectAddress(address, "start")}
                >
                  {address}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-grow relative">
          <div className="relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="end-location"
              value={endLocation}
              onChange={(e) => {
                setEndLocation(e.target.value);
                getAddressSuggestions(e.target.value, "end");
              }}
              required
              placeholder="Enter drop-off location"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
            />
          </div>
          {addressList.length > 0 && activeInput === "end" && (
            <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
              {addressList.suggestions.map((address, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectAddress(address, "end")}
                >
                  {address}
                </li>
              ))}
            </ul>
          )}
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

      {/* <div className="mt-6">
        <MapBox
          routeGeoJSON={routeGeoJSON}
          endLocationCoords={[72.8777, 19.076]}
        />
      </div> */}

      <div className="flex justify-center mt-6">
        <div className="rounded-lg shadow-lg p-4 w-full">
          <Cars />
        </div>
      </div>
    </div>
  );
};

export default RideComparisonForm;
