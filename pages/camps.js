import { Grid} from "@material-ui/core";
import SearchBox from "../components/searchbox";
import {
  getAllCampgrounds,
  getAllFeatures,
  getAllRegions,
  getAllTypes,
  getAllZipcodes,
  getAllCities,
} from "../lib/api";
import {getCampByCity} from '../lib/getCitiesParams'
import Map from '../components/map';
import { useRouter } from 'next/router';

let totalPages = 0;

const withPageRouter = (router) => {
  router.query = { ...queryString.parse(router.asPath.split(/\?/)[1]) };
  return router;
};

const getRouterParams = (towns) => {
  const router = useRouter();
  router = withPageRouter(router);
  return router;
}



export default function CampList({
  regions,
  features,
  camptypes,
  zipcodes,
  graphCampgrounds,
  cities,
  campbycity
}) {


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
        />
      </Grid>
      <Grid item xs={12} sm={7} md={9} lg={10}>
        RIGHT
        
        <Map />
        <pre style={{fontSize: '2.5rem'}}>{
      
        }</pre>
      </Grid>
    </Grid>
  );
}

export async function getStaticProps() {

  // retreive the regions form prisma
  const regions = await getAllRegions();
  // retrieve all features in existance
  const features = await getAllFeatures();
  // retrieve all types of campgrounds
  const camptypes = await getAllTypes();
  // retrieve all zip codes of campgrounds
  const zipcodes = await getAllZipcodes();
  const cities = await getAllCities();
  const campbycity = await getCampByCity();
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
      campbycity
    },
    revalidate: 1,
  };
}
