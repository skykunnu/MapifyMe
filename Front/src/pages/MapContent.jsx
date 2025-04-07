import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";
import { useEffect } from "react";

function MapContent({ profile, onclose }) {
  const ApiKey = import.meta.env.VITE_API_KEY;

  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }
  }, [marker]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem]">
        <h2 className="text-xl font-bold mb-4">{profile?.name}'s Summary</h2>
        <img
          src={profile?.photo}
          alt={profile?.name}
          className="h-[8rem] w-[8rem] rounded-full mx-auto mb-4"
        />
        <p>
          <strong>Address:</strong> {profile?.address}
        </p>
        <p>
          <strong>Description:</strong> {profile?.description}
        </p>
        <p>
          <strong>Phone:</strong> {profile?.phone}
        </p>
        <p>
          <strong>Interests:</strong> {profile?.interests}
        </p>
        <APIProvider apiKey={ApiKey}>
          <Map
            style={{ width: "200px", height: "200px" }}
            center={{ lat: profile?.latitude, lng: profile?.longitude }}
            zoom={8}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
             {profile?.latitude && profile?.longitude && (
              <Marker
                ref={markerRef}
                position={{ lat: profile.latitude, lng: profile.longitude }}
              />
            )}
          </Map>
        </APIProvider>

        <button
          onClick={onclose}
          className="mt-4 bg-red-400 text-white rounded px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default MapContent;
