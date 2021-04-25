import Head from "next/head";
import { useState } from "react";
import {
  getAllCampgrounds,
  getAllFeatures,
  getAllRegions,
  getAllTypes,
  getAllZipcodes,
  getAllCities,
} from "../lib/api";
import SimpleSearch from "../components/simpleSearch";

export default function Home({
  regions,
  features,
  camptypes,
  zipcodes,
  graphCampgrounds,
  cities,
}) {
  const [value, setValue] = useState("All");
  const [viewport, setViewport] = useState({});

  let uniqueCities = [];

  uniqueCities = [...new Set(cities.nodes.map((town) => town.acfDetails.city))];

  uniqueCities.sort();

  console.log(uniqueCities);
  return (
    <>
      <Head>
        <title>NH Campground Association</title>
      </Head>
      <SimpleSearch cities={uniqueCities} />
    </>
  );
}

// gets us front page of campgrounds
export async function getStaticProps(query) {
  // retreive the regions form prisma
  const regions = await getAllRegions();
  // retrieve all features in existance
  const features = await getAllFeatures();
  // retrieve all types of campgrounds
  const camptypes = await getAllTypes();
  // retrieve all zip codes of campgrounds
  const zipcodes = await getAllZipcodes();
  // retrieve all cities
  const cities = await getAllCities();

  // retrieve all campgrounds
  const graphCampgrounds = await getAllCampgrounds();

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
    },
    revalidate: 1,
  };
}
