import { useState } from 'react';
import Head from 'next/head';
import SearchBox from '../components/searchbox';
import {
  getAllCampgrounds,
  getAllFeatures,
  getAllRegions,
  getAllTypes,
  getAllZipcodes,
  getAllCities,
  getCampgroundsByCity,
} from '../lib/api';
import Nav from '../components/nav';
import Map from '../components/map';

export default function CampList({
  regions,
  features,
  camptypes,
  zipcodes,
  graphCampgrounds,
  cities,
  campgroundsbycity,
}) {
  const [viewport, setViewport] = useState({
    height: '100vh',
    latitude: 44.0456,
    longitude: -71.6706,
    width: '100vw',
    zoom: 1,
  });

  return (
    <>
      <Head>
        <title>Find a Campground</title>
      </Head>
      <Nav />
      <div className="columns">
        <div className="column is-2">
          <SearchBox
            singleColumn
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
        </div>
        <div className="column is-10">
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

  return {
    props: {
      regions,
      features,
      camptypes,
      zipcodes,
      graphCampgrounds,
      cities,
      campgroundsbycity,
    },
  };
}
