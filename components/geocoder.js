import { Field } from "formik";
import { useContext } from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import { useGeoContext } from "../lib/state";


export default function CitySearch({field}) {
  field.name="city"
  
  let viewport = useGeoContext();

  const queryParams = {
    country: "us",
  };

  function onSelected (nextViewport, item){
    
    field.value = item.context[0].text
    console.log({field})
    viewport.saveViewport(nextViewport)
  }

  return (
    <Geocoder
      onSelected={onSelected}
      mapboxApiAccessToken={
        process.env.NEXT_PUBLIC_MAPBOX_KEY
      }
      initialInputValue="Where is your next adventure?"
      viewport={viewport.geoviewport}
      hideOnSelect={false}
      updateInputOnSelect={true}
      queryParams={queryParams}
    />
  );
}
