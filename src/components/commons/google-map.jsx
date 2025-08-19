"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function GoogleMap({ lat, lng }) {
  const defaultCenter = { lat, lng };

  const handleMarkerClick = () => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="google-map-card">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultZoom={13}
          defaultCenter={defaultCenter}
          style={{ width: "100%", height: "100%" }}
        >
          <Marker position={defaultCenter} onClick={handleMarkerClick} />
        </Map>
      </APIProvider>
    </div>
  );
}
