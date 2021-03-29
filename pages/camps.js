import { useState } from "react";
import Head from "next/head";
import SearchBox from "../components/searchbox";
import {
  getAllCampgrounds,
  getAllFeatures,
  getAllRegions,
  getAllTypes,
  getAllZipcodes,
  getAllCities,
  getCampgroundsByCity,
  getCampgroundsByFeature,
} from "../lib/api";
import SecondNavigation from "../components/secondNavigation";
import Map from "../components/map";

export default function CampList({
  regions,
  features,
  camptypes,
  zipcodes,
  object,
  graphCampgrounds,
  cities,
  campgroundsbycity,
  campgroundsbyfeature,
}) {
  const [viewport, setViewport] = useState({
    height: "91.5vh",
    width: "100vw",
    latitude: 43.4849,
    longitude: -71.6553,
    zoom: 1,
  });

  const test = ["Fishing", "Laundry"];

  console.log("features: ", features);
  return (
    <>
      <Head>
        <title>Find a Campground</title>
      </Head>
      <SecondNavigation />
      <div className="columns">
        <div className="column is-centered m-5">
          <SearchBox
            selectObjects={object}
            regions={regions}
            features={features}
            camptypes={camptypes}
            zipcodes={zipcodes}
            graphCampgrounds={graphCampgrounds}
            cities={cities}
            campgroundsbycity={campgroundsbycity}
            viewport={viewport}
            setViewport={setViewport}
          />
          <div className="column mt-5 is-full">
            Campground Search Results Will Go Here
          </div>
        </div>

        <div className="column is-centered mr-5">
          <Map
            campgrounds={graphCampgrounds}
            viewport={viewport}
            setViewport={setViewport}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(query) {
  const info = query.query;
  // retreive the regions form prisma
  const regions = await getAllRegions();
  // retrieve all features in existance
  const features = await getAllFeatures();
  // retrieve all types of campgrounds
  const camptypes = await getAllTypes();
  // retrieve all zip codes of campgrounds
  const zipcodes = await getAllZipcodes();
  // get all cities of campgrounds
  const cities = await getAllCities();
  // retrieve all campgrounds
  const graphCampgrounds = await getAllCampgrounds();

  // retrieve all campgrounds by a city
  const campgroundsbycity = await getCampgroundsByCity(info.city);

  // retrieve all campgrounds by feature(s)
  const campgroundsbyfeature = await getCampgroundsByFeature();

  // create object for features
  const object = [];

  features.nodes.map((feature) => {
    return object.push({
      label: feature.label,
      value: feature.label,
    });
  });

  return {
    props: {
      regions,
      features,
      camptypes,
      zipcodes,
      object,
      graphCampgrounds,
      cities,
      campgroundsbycity,
      campgroundsbyfeature,
    },
  };
}
