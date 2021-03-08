import Head from 'next/head';
import { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import styles from '../styles/Home.module.sass';
import CampgroundCards from '../components/campgroundcards';
import SearchBox from '../components/searchbox';
import {
  getAllCampgrounds,
  getAllFeatures,
  getAllRegions,
  getAllTypes,
  getAllZipcodes,
  getAllCities,
} from '../lib/api';
import SimpleSearch from '../components/simpleSearch';

export default function Home({
  regions,
  features,
  camptypes,
  zipcodes,
  graphCampgrounds,
  cities,
}) {
  const [value, setValue] = useState('All');
  const [viewport, setViewport] = useState({});

  return (
    <>
      <Head>
        <title>NH Campground Association</title>
      </Head>
      <SimpleSearch cities={cities} />

      <div className="columns pt-6">
        <div className="column is-centered is-3 ml-2 mr-2">
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
        </div>
        <div className="column is-centered mt-5">
          <div className="columns is-multiline ml-5 mr-5">
            <CampgroundCards campgrounds={graphCampgrounds} />
          </div>
        </div>
      </div>
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
