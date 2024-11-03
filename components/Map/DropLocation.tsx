import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { AddressAutofill } from "@mapbox/search-js-react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Location {
  address: string;
  coordinates: Coordinates;
}

interface Feature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    full_address?: string;
    address_line1?: string;
    name?: string;
  };
}

interface AddressAutofillResponse {
  features: Feature[];
}

const DropoffLocationInput = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRetrieve = (res: AddressAutofillResponse) => {
    try {
      const feature = res.features[0];
      if (feature) {
        const [longitude, latitude] = feature.geometry.coordinates;

        // Get the most complete address available
        const address =
          feature.properties.full_address ||
          feature.properties.address_line1 ||
          feature.properties.name ||
          inputValue;

        setLocation({
          address,
          coordinates: { latitude, longitude },
        });

        // Update the input value with the selected address
        setInputValue(address);
        setError(null);
      }
    } catch (err) {
      console.error("Error processing location:", err);
      setError("Error processing location data");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear location data if input is empty
    if (!value) {
      setLocation(null);
      setError(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110">
          <MapPin className="w-5 h-5 text-red-500" />
        </div>

        {process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ? (
          <AddressAutofill
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            options={{
              language: "en",
              country: "IN",
            }}
            onRetrieve={handleRetrieve}
          >
            <input
              type="text"
              placeholder="Enter location"
              value={inputValue}
              onChange={handleInputChange}
              className={`
                w-full py-3 pl-12 pr-4 rounded-lg border 
                ${error ? "border-red-300" : "border-gray-300"}
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                transition-all duration-300
              `}
              autoComplete="address-line1"
            />
          </AddressAutofill>
        ) : (
          <div className="text-red-500 text-sm">
            Mapbox access token not configured
          </div>
        )}
      </div>

      {/* Display location details if available */}
      {location && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <p className="text-sm text-gray-600">Selected Location:</p>
          <p className="text-gray-800">{location.address}</p>
          <p className="text-sm text-gray-600">
            Latitude: {location.coordinates.latitude.toFixed(6)}
            <br />
            Longitude: {location.coordinates.longitude.toFixed(6)}
          </p>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default DropoffLocationInput;
