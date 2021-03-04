import { useState } from 'react';
import ReactMapGL, { StaticMap, Marker, Popup } from 'react-map-gl';
import { ViewportContext } from '../lib/state';

export default function Map({ campgrounds, viewport, setViewport }) {
  const [selectLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {campgrounds.map(({ node }) => {
        return (
          <div key={node.title}>
            <Marker
              longitude={
                Math.abs(parseFloat(node.acfDetails.longitude.toFixed(4))) * -1
              }
              latitude={parseFloat(node.acfDetails.latitude.toFixed(4))}
              onClick={() => {
                setSelectedLocation(node);
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
                onClose={() => setSelectedLocation({})}
                closeOnClick
                longitude={
                  Math.abs(parseFloat(node.acfDetails.longitude.toFixed(4))) *
                  -1
                }
                latitude={parseFloat(node.acfDetails.latitude.toFixed(4))}
              >
                {node.title}
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
