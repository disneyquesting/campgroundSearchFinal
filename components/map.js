import { useState, useCallback, useEffect, useRef } from "react";
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
import { useClickAway } from "react-use";

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

  const ref = useRef(null);
  useClickAway(ref, () => {
    togglePopup(false);
    setViewport({
      ...viewport,
    });
  });

  const [showPopup, togglePopup] = useState(false);

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
                  togglePopup(true);
                  setSelectedLocation(node);
                  setNewView(node.latitude, node.longitude);
                }}
              >
                <a
                  onKeyDown={() => {
                    togglePopup(true);
                  }}
                  onMouseOver={() => {
                    setSelectedLocation(node);
                    isBreakpoint ? null : togglePopup(true);
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
              isBreakpoint
                ? selectLocation.title === node.name
                  ? showPopup && (
                      <Popup
                        anchor={"right"}
                        offsetLeft={100}
                        dynamicPosition={false}
                        className={"cardPop"}
                        onClose={() => {
                          setSelectedLocation({});
                          setViewport({
                            ...viewport,
                            zoom: 8.5,
                          });
                        }}
                        closeOnClick={false}
                        longitude={
                          Math.abs(parseFloat(node.longitude.toFixed(4))) * -1
                        }
                        latitude={parseFloat(node.latitude.toFixed(4))}
                      >
                        <div ref={ref}>
                          <MapCard campground={selectLocation} />
                        </div>
                      </Popup>
                    )
                  : false
                : // desktop map
                selectLocation.title === node.name
                ? showPopup && (
                    <Popup
                      anchor={"right"}
                      offsetLeft={-50}
                      className={"cardPop"}
                      closeOnClick={false}
                      onClose={() => {
                        setSelectedLocation({});
                        setViewport({
                          ...viewport,
                          zoom: 8.5,
                        });
                      }}
                      longitude={
                        Math.abs(parseFloat(node.longitude.toFixed(4))) * -1
                      }
                      latitude={parseFloat(node.latitude.toFixed(4))}
                    >
                      <div ref={ref}>
                        <MapCard campground={selectLocation} />
                      </div>
                    </Popup>
                  )
                : false}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </ReactMapGL>
  );
}
