import React, { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image"; // Use Next.js Image optimization
import MapPin from "@/public/Images/map-pin.png";

// Define a type for the location prop
interface Location {
  latitude: number;
  longitude: number;
}

// Update the component to receive location as a prop
const MapBox: React.FC<{ location: Location }> = ({ location }) => {
  const [viewState, setViewState] = useState({
    longitude: location?.longitude || -122.4, // Default to -122.4 (San Francisco)
    latitude: location?.latitude || 37.8, // Default to 37.8 (San Francisco)
    zoom: 14, // Adjust the zoom level as necessary
  });

  // Update the viewState when the location prop changes
  useEffect(() => {
    if (location) {
      setViewState({
        longitude: location?.longitude,
        latitude: location?.latitude,
        zoom: 14, // You can adjust this zoom level as necessary
      });
    }
  }, [location]);

  return (
    <div className="p-5 text-[20px] font-semibold">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)} // Allow the map to handle movement
        style={{ width: "100%", height: 500, borderRadius: 10 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          className=""
          longitude={location?.longitude}
          latitude={location?.latitude}
          anchor="bottom"
        >
          {/* Use Next.js Image for the marker */}
          <Image
            className="w-10 h-10"
            src={MapPin} // Correct the path; no "@" prefix needed
            alt="Location marker"
            width={40}
            height={40}
          />
        </Marker>
      </Map>
    </div>
  );
};

export default MapBox;
