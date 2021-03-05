import Head from 'next/head';
import { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import styles from '../styles/Home.module.css';
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
import Nav from '../components/nav';

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
      <section
        className="hero is-info is-fullheight"
        style={{
          backgroundImage: "url('/cover2.jpg')",
          backgroundSize: 'cover',
        }}
      >
        <div className="hero-head">
          <Nav />
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title is-size-1 has-text-weight-light">
              Where is your next adventure?
            </p>
            <div className="columns is-centered">
              <div className="column is-3">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select className="input is-rounded" name="city">
                        <option value="all">All</option>
                        {cities.nodes.map(town => {
                          return (
                            <option
                              key={town.acfDetails.city}
                              value={town.acfDetails.city}
                            >
                              {town.acfDetails.city}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-primary">
                      Bon Voyage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="columns pt-6">
        <div className="column ml-6 is-3">
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
        <div className="column ml-6 is-7">
          <CampgroundCards campgrounds={graphCampgrounds} />
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
