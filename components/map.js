import { useState } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  StaticMap,
  Marker,
  Popup,
  Layer,
  GeolocateControl,
  LinearInterpolator,
} from "react-map-gl";
import { ViewportContext } from "../lib/state";
import styles from "./map.module.sass";
import MapCard from "../components/mapcard";

const geolocateControlStyle = {
  left: 50,
  top: 10,
};

export default function Map({ campgrounds, viewport, setViewport }) {
  const [selectLocation, setSelectedLocation] = useState({});

  const eventRecognizerOptions = {
    pan: { threshold: 10 },
    tap: { threshold: 5 },
  };

  function setNewView(lat, long) {
    setViewport({
      latitude: lat,
      longitude: long,
      zoom: 13,
      center: [long, lat],
      transitionDuration: 1000,
    });
  }

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapStyle="mapbox://styles/nhcampground/cklxrdn2662ov17l5jhc72cj7"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      transitionInterpolator={new FlyToInterpolator()}
      eventRecognizerOptions={eventRecognizerOptions}
      width="90vw"
      height="90vh"
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      {campgrounds.map(({ node }) => {
        return (
          <div key={node.title}>
            <Marker
              longitude={
                Math.abs(parseFloat(node.acfDetails.longitude.toFixed(4))) * -1
              }
              latitude={parseFloat(node.acfDetails.latitude.toFixed(4))}
              offsetLeft={-17.5}
              offsetTop={-35}
              onClick={() => {
                setSelectedLocation(node);
                setNewView(node.acfDetails.latitude, node.acfDetails.longitude);
              }}
            >
              <a
                onKeyDown={() => {
                  setSelectedLocation(node);
                }}
                role="button"
                tabIndex={0}
              >
                <span role="img" aria-label="push-pin">
                  🏕️
                </span>
              </a>
            </Marker>
            {selectLocation.title === node.title ? (
              <Popup
                anchor={"right"}
                offsetLeft={-50}
                className={"cardPop"}
                onClose={() => setSelectedLocation({})}
                closeOnClick={false}
                longitude={
                  Math.abs(parseFloat(node.acfDetails.longitude.toFixed(4))) *
                  -1
                }
                latitude={parseFloat(node.acfDetails.latitude.toFixed(4))}
              >
                <MapCard campground={selectLocation} />
              </Popup>
            ) : (
              false
            )}
          </div>
        );
      })}
    </ReactMapGL>
  );
}
