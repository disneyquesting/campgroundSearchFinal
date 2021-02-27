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
import Map from '../components/map';

let totalPages = 0;


export default function CampList({
  regions,
  features,
  camptypes,
  zipcodes,
  graphCampgrounds,
  cities,
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
