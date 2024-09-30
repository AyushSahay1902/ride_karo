import { UserLoactionCont } from "@/context/UserLocationCont";
import React, { useContext, useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image"; // Use Next.js Image optimization
import MapPin from "@/public/Images/map-pin.png";

const MapBox = () => {
  const { userLocation } = useContext(UserLoactionCont);
  const [viewState, setViewState] = useState({
    longitude: userLocation?.longitude || -122.4,
    latitude: userLocation?.latitude || 37.8,
    zoom: 14,
  });

  // Update the viewState when userLocation changes
  useEffect(() => {
    if (userLocation) {
      setViewState({
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
        zoom: 14, // You can adjust this zoom level as necessary
      });
    }
  }, [userLocation]);

  return (
    <div className="p-5 text-[20px] font-semibold">
      {/* <h2>Map</h2> */}

      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)} // Allow the map to handle movement
        style={{ width: "100%", height: 500, borderRadius: 10 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom"
          >
            {/* Use Next.js Image for marker */}
            <Image
              className="w-10 h-10"
              src={MapPin} // Correct the path; you don't need the "@" prefix
              alt="location marker"
              width={40}
              height={40}
            />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
