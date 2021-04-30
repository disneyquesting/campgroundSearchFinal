import { useState, useCallback, useEffect } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  StaticMap,
  Marker,
  Popup,
  Layer,
  GeolocateControl,
  LinearInterpolator,
} from "react-map-gl";
import MapCard from "../components/mapcard";
import useOnclickOutside from "react-cool-onclickoutside";

const geolocateControlStyle = {
  left: 50,
  top: 10,
};

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", (e) => updateTarget(e));

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);

  return targetReached;
};

export default function Map({
  campgrounds,
  campResults,
  viewport,
  setViewport,
}) {
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

  const isBreakpoint = useMediaQuery(768);

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapStyle="mapbox://styles/nhcampground/cklxrdn2662ov17l5jhc72cj7"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      transitionInterpolator={new FlyToInterpolator()}
      eventRecognizerOptions={eventRecognizerOptions}
      className="mapBoxProper"
      center={(43.1939, 71.5724)}
      width="100vw"
      height="100%"
      minZoom={7}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      {campResults[0] != "No Campgrounds Found" ? (
        campResults.map((node) => {
          return (
            <div key={node.name}>
              <Marker
                longitude={Math.abs(parseFloat(node.longitude.toFixed(4))) * -1}
                latitude={parseFloat(node.latitude.toFixed(4))}
                offsetLeft={-17.5}
                offsetTop={-35}
                onClick={() => {
                  setSelectedLocation(node);
                  setNewView(node.latitude, node.longitude);
                }}
              >
                <a
                  onKeyDown={() => {
                    setSelectedLocation(node);
                  }}
                  onMouseEnter={() => {
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
              {// mobile map
              isBreakpoint ? (
                selectLocation.title === node.name ? (
                  <Popup
                    anchor={"right"}
                    offsetLeft={100}
                    className={"cardPop"}
                    onClose={() => {
                      setSelectedLocation({});
                      setViewport({
                        ...viewport,
                        zoom: 9,
                      });
                    }}
                    closeOnClick={false}
                    longitude={
                      Math.abs(parseFloat(node.longitude.toFixed(4))) * -1
                    }
                    latitude={parseFloat(node.latitude.toFixed(4))}
                  >
                    <MapCard campground={selectLocation} />
                  </Popup>
                ) : (
                  false
                )
              ) : // desktop map
              selectLocation.title === node.name ? (
                <Popup
                  anchor={"right"}
                  offsetLeft={-50}
                  className={"cardPop"}
                  onClose={() => {
                    setSelectedLocation({});
                    setViewport({
                      ...viewport,
                      zoom: 9,
                    });
                  }}
                  closeOnClick={false}
                  longitude={
                    Math.abs(parseFloat(node.longitude.toFixed(4))) * -1
                  }
                  latitude={parseFloat(node.latitude.toFixed(4))}
                >
                  <MapCard campground={selectLocation} />
                </Popup>
              ) : (
                false
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </ReactMapGL>
  );
}
