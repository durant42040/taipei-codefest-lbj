import { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { PinIcon } from "lucide-react";

const envConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
};

type Poi = { key: number; location: { lat: number; lng: number } };
const pois: Poi[] = [
  { key: 0, location: { lat: 25.021639, lng: 121.535083 } },
  { key: 1, location: { lat: 25.021639, lng: 121.535093 } },
];

function PoiMarkers({
  pois,
  setPosition,
}: {
  pois: Poi[];
  setPosition: (lat: number, lng: number) => void;
}) {
  function handleMarkerClick(_e: google.maps.MapMouseEvent, poi: Poi) {
    console.log(poi);
    setPosition(poi.location.lat, poi.location.lng);
  }
  return (
    <>
      {pois.map((poi, index) => (
        <AdvancedMarker
          position={poi.location}
          key={index}
          onClick={(e: google.maps.MapMouseEvent) => {
            handleMarkerClick(e, poi);
          }}
        >
          <PinIcon className="text-red-100" />
        </AdvancedMarker>
      ))}
    </>
  );
}

function useLocation(setLocation: {
  (value: React.SetStateAction<{ latitude: number; longitude: number }>): void;
}) {
  useConnectionMessage("location", null);
  const cleanup = useHandleConnectionData((event) => {
    const data = JSON.parse(event.data as string);
    const { latitude, longitude } = data.data ?? {
      latitude: 25.021639,
      longitude: 121.535083,
    };
    setLocation({ latitude, longitude });
  });
  setTimeout(() => {
    if (cleanup) cleanup();
  }, 10000);
}

function MyLocation({ lng, lat }: { lng: number; lat: number }) {
  return (
    <AdvancedMarker position={{ lat, lng }}>
      <LocateFixed className="text-[#1f4fff]" />
    </AdvancedMarker>
  );
}

export default function ExerciseMap() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 25.021639, longitude: 121.535083 });
  const [viewState, setViewState] = useState({
    latitude: 25.021639,
    longitude: 121.535083,
    zoom: 15,
  });
  function setPosition(lat: number, lng: number) {
    setViewState({ latitude: lat, longitude: lng, zoom: 18 });
  }

  useLocation(setLocation);

  return (
    <div className="mb-8">
      <div className="rounded-lg border-2">
        <APIProvider {...envConfig}>
          <Map
            initialViewState={{
              latitude: 25.021639,
              longitude: 121.535083,
              zoom: 15,
            }}
            viewState={viewState}
            gestureHandling={"greedy"}
            // disableDefaultUI={true}
            style={{ width: "100%", height: "100vh" }}
            colorScheme="FOLLOW_SYSTEM"
            mapId={"ec82b278c6bb6c54"}
          >
            <PoiMarkers pois={pois} setPosition={setPosition} />
            <MyLocation lat={location.latitude} lng={location.longitude} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
