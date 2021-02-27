import { useContext, useState } from "react";
import ReactMapGL from "react-map-gl";
import { Container } from "@material-ui/core";
import { useGeoContext} from '../lib/state';

export default function Map() {

  let viewport = useGeoContext();
  return (
    <ReactMapGL
      mapboxApiAccessToken={
        process.env.NEXT_PUBLIC_MAPBOX_KEY
      }
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      {...viewport.geoviewport}
      onViewportChange={(nextViewport) => viewport.saveViewport(nextViewport)}
    ></ReactMapGL>
  );
}
