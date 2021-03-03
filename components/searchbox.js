import Link from "next/link";
import { Form, Formik, Field, useFormik } from "formik";
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const MAP_CITY_DATA = gql`
  query MyQuery($string: String) {
    campgrounds(where: { city: $string }) {
      nodes {
        acfDetails {
          address
          city
          closeDate
          latitude
          longitude
          numberOfSites
          openDate
          website
          picture {
            altText
            mediaItemUrl
          }
        }
        title
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

export default function SearchBox({
  graphCampgrounds,
  regions,
  features,
  camptypes,
  singleColumn,
  cities,
  viewport,
  setViewport,
}) {
  const router = useRouter();
  const { query } = router;

  const [getCamps, { loading, error, data }] = useLazyQuery(MAP_CITY_DATA, {
    variables: {
      string: query.city,
    },
  });

  const citycamps = data;

  const handleSubmit = async (values) => {
    getCamps();
    const lat = parseFloat(
      citycamps.campgrounds.nodes[0].acfDetails.latitude.toFixed(4)
    );
    const long =
      Math.abs(
        parseFloat(
          citycamps.campgrounds.nodes[0].acfDetails.longitude.toFixed(4)
        )
      ) * -1;

    console.log("viewportupdate: ", lat, long);
    setViewport({
      ...viewport,
      latitude: citycamps ? lat : 44.43,
      longitude: citycamps ? long : -72.352,
      bearing: 0,
      pitch: 20,
      zoom: 11,
    });
    
    router.push(
      {
        pathname: "/camps",
        query: { ...values, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const classes = useStyles();
  const smValue = singleColumn ? 12 : 6;

  const initialValues = {
    region: query.region || "all",
    camptype: query.camptype || "all",
    city: query.city || "all",
    campfeatures: query.campfeatures || "all",
  };

  if (error) return `Error! ${error}`;
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, submitForm }) => (
        <Form>
          <Paper className={classes.paper} elevation={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-region">Region</InputLabel>
                  <Field
                    name="region"
                    as={Select}
                    labelId="search-region"
                    label="Region"
                  >
                    <MenuItem value="all">
                      <em>All</em>
                    </MenuItem>
                    {regions.nodes.map((region) => {
                      return (
                        <MenuItem key={region.id} value={region.name}>
                          {region.name}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-type">Type</InputLabel>
                  <Field
                    name="camptype"
                    as={Select}
                    labelId="search-type"
                    label="Type"
                  >
                    <MenuItem value="all">
                      <em>All</em>
                    </MenuItem>
                    {camptypes.nodes.map((camp) => {
                      return (
                        <MenuItem key={camp.id} value={camp.name}>
                          {camp.name}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-feat">Features</InputLabel>
                  <Field
                    name="campfeatures"
                    as={Select}
                    labelId="search-feat"
                    label="Features"
                  >
                    <MenuItem value="all">
                      <em>All</em>
                    </MenuItem>
                    {features.nodes.map((cf) => {
                      return (
                        <MenuItem key={cf.name} value={cf.name}>
                          {cf.name}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-cities">City</InputLabel>
                  <Field
                    name="city"
                    as={Select}
                    labelId="search-cities"
                    label="Cities"
                  >
                    <MenuItem value="all">
                      <em>All</em>
                    </MenuItem>
                    {cities.nodes.map((town) => {
                      return (
                        <MenuItem
                          key={town.acfDetails.city}
                          value={town.acfDetails.city}
                        >
                          {town.acfDetails.city}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="outlined"
                  type="button"
                  fullWidth
                  onClick={submitForm}
                >
                  Search Campgrounds
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}
