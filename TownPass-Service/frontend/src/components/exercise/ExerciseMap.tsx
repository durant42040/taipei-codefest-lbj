import { useEffect, useRef } from "react";
import { useExercise } from "@/contexts/useExercise";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { LocateFixed } from "lucide-react";
import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";

const envConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
};

type Poi = { lat: number; lng: number };

function PoiMarkers({
  pois,
  setPosition,
}: {
  pois: Poi[];
  setPosition: (lat: number, lng: number) => void;
}) {
  const map = useMap();
  const { focusSingle, setFocusSingle } = useExercise();
  function handleMarkerClick(_e: google.maps.MapMouseEvent, poi: Poi) {
    setPosition(poi.lat - 0.002, poi.lng);
    setFocusSingle(true);
  }
  if (pois.length > 0 && !focusSingle) {
    const bound = new google.maps.LatLngBounds();
    pois.forEach((poi) => {
      bound.extend(new google.maps.LatLng(poi.lat, poi.lng));
    });
    console.log("focusSingle", focusSingle);

    map?.fitBounds(bound);
    setFocusSingle(true);
  }
  return (
    <>
      {pois.map((poi, index) => (
        <AdvancedMarker
          position={{
            lat: poi.lat,
            lng: poi.lng,
          }}
          key={index}
          onClick={(e: google.maps.MapMouseEvent) => {
            handleMarkerClick(e, poi);
          }}
        >
          <Pin />
        </AdvancedMarker>
      ))}
    </>
  );
}

function useLocation() {
  const { setUserLocation } = useExercise();
  useConnectionMessage("location", null);
  const cleanup = useHandleConnectionData((event) => {
    const data = JSON.parse(event.data as string);
    const {
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    } = data.data ?? {
      latitude: 25.021639,
      longitude: 121.535083,
    };
    setUserLocation({ latitude, longitude });
  });
  setTimeout(() => {
    if (cleanup) cleanup();
  }, 10000);
}

function MyLocation({ lng, lat }: { lng: number; lat: number }) {
  lng = lng || 121.535083;
  lat = lat || 25.021639;
  return (
    <AdvancedMarker
      position={{
        lat: typeof lat === "number" ? lat : 0,
        lng: typeof lng === "number" ? lng : 0,
      }}
    >
      <LocateFixed className="text-[#1f4fff]" />
    </AdvancedMarker>
  );
}

function BicycleKML({ showBicycleKML }: { showBicycleKML: boolean }) {
  const map = useMap();
  const mapRef = useRef<google.maps.Map | null>(null);
  const kmlLayerRef = useRef<google.maps.KmlLayer | null>(null);

  useEffect(() => {
    if (showBicycleKML) {
      mapRef.current = map;
      const kmlLayer = new google.maps.KmlLayer({
        url: "https://data.taipei/api/dataset/4fefd1b3-58b9-4dab-af00-724c715b0c58/resource/0912d803-688f-493a-b682-27da729ed593/download",
        map: mapRef.current,
      });
      kmlLayerRef.current = kmlLayer;
    } else {
      if (kmlLayerRef.current) {
        kmlLayerRef.current.setMap(null);
        kmlLayerRef.current = null;
      }
    }
  }, [showBicycleKML, map]);

  return <div></div>;
}

export default function ExerciseMap() {
  const { userLocation } = useExercise();

  function setPosition(lat: number, lng: number) {
    setViewState({ latitude: lat, longitude: lng, zoom: 16 });
  }

  const { filteredCourts, viewState, setViewState, showBicycleKML } =
    useExercise();
  useLocation();

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
            disableDefaultUI={true}
            style={{ width: "100%", height: "80vh" }}
            colorScheme="LIGHT"
            mapId={"ec82b278c6bb6c54"}
          >
            <PoiMarkers pois={filteredCourts} setPosition={setPosition} />
            <MyLocation
              lat={userLocation.latitude}
              lng={userLocation.longitude}
            />
            <BicycleKML showBicycleKML={showBicycleKML} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
