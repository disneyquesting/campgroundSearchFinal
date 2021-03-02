import { useContext, useMemo } from 'react';
import ReactMapGL, { Marker, MapContext } from 'react-map-gl';
import { ViewportContext } from '../lib/state';

export default function Map({ campgrounds, viewport, setViewport }) {
  const markers = campgrounds.map(({ node }) => {
    return (
      <Marker
        key={node.title}
        longitude={
          Math.abs(parseFloat(node.acfDetails.longitude.toFixed(4))) * -1
        }
        latitude={parseFloat(node.acfDetails.latitude.toFixed(4))}
      >
        <img src="pin.png" alt={node.title} />
      </Marker>
    );
  });
  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {markers}
    </ReactMapGL>
  );
}
