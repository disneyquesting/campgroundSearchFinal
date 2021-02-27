import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
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
import Map from '../components/map';
import { useGeoContext } from '../lib/state';

const totalPages = 0;

export default function CampList({
  regions,
  features,
  camptypes,
  zipcodes,
  graphCampgrounds,
  cities,
  campgroundsbycity,
}) {
  console.log(campgroundsbycity.nodes);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <SearchBox
          singleColumn
          regions={regions}
          features={features}
          camptypes={camptypes}
          zipcodes={zipcodes}
          graphCampgrounds={graphCampgrounds}
          cities={cities}
          campgroundsbycity={campgroundsbycity}
        />
      </Grid>
      <Grid item xs={12} sm={7} md={9} lg={10}>
        RIGHT
        <Map />
        <pre style={{ fontSize: '2.5rem' }}>{}</pre>
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(query) {
  const info = query.query;
  console.log('info is: ', info);
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
