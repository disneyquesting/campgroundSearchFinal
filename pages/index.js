import Head from "next/head";
import styles from "../styles/Home.module.css";
import CampgroundCards from "../components/campgroundcards";
import { useState } from "react";
import SearchBox from "../components/searchbox";
import {
  getAllCampgrounds,
  getAllFeatures,
  getAllRegions,
  getAllTypes,
  getAllZipcodes,
  getAllCities,
} from "../lib/api";




export default function Home({
  regions,
  features,
  camptypes,
  zipcodes,
  graphCampgrounds,
  cities,
}) {
  const [viewport, setViewport] = useState({
    height: "100vh",
    latitude: 44.0456,
    longitude: -71.6706,
    width: "100vw",
    zoom: 8,
  });

  return (
    <>
      <Head>
        <title>NH Campground Association</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css"
          rel="stylesheet"
        />
      </Head>

      <CampgroundCards campgrounds={graphCampgrounds} />
      <br />
      <SearchBox
        cities={cities}
        regions={regions}
        features={features}
        camptypes={camptypes}
        zipcodes={zipcodes}
        graphCampgrounds={graphCampgrounds}
        viewport={viewport}
        setViewport={setViewport}
      />
      <br />
    </>
  );
}

// gets us front page of campgrounds
export async function getStaticProps() {
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

  return {
    props: {
      regions,
      features,
      camptypes,
      zipcodes,
      graphCampgrounds,
      cities,
    },
    revalidate: 1,
  };
}
