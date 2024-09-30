import React, { useState } from "react";
import { MapPin } from "lucide-react";

import Cars from "./Cars";

const RideComparisonForm = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState("");

  const sessionToken = "";
  const MAPBOX_RETRIVE_URL =
    "https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}";

  const [addressList, setAddressList] = useState<{
    suggestions: string[];
    length: number;
  }>({
    suggestions: [],
    length: 0,
  });

  const getAddressSuggestions = async (
    query: string,
    inputType: React.SetStateAction<string>
  ) => {
    if (!query) {
      setAddressList({ suggestions: [], length: 0 });
      return;
    }
    // Simulate API call with dummy data
    const dummySuggestions = [
      `${query} Street`,
      `${query} Avenue`,
      `${query} Boulevard`,
    ];
    setAddressList({
      suggestions: dummySuggestions,
      length: dummySuggestions.length,
    });
    setActiveInput(inputType);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Comparing prices for:", { startLocation, endLocation });
    setIsLoading(false);
  };

  const handleSelectAddress = (
    address: React.SetStateAction<string>,
    inputType: string
  ) => {
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
              onChange={(e) => {
                onSourceChange(e);
              }}
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
      <div className="flex justify-center mt-6">
        <div className=" rounded-lg shadow-lg p-4 w-full">
          <Cars />
        </div>
      </div>
    </div>
  );
};

export default RideComparisonForm;
