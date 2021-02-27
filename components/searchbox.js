import Link from "next/link";
import { Form, Formik, Field, useFormik } from "formik";
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Input,
  Chip,
  Button,
} from "@material-ui/core";
import { useState, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Autorenew } from "@material-ui/icons";
import router, { useRouter, withRouter } from "next/router";
import queryString from "query-string";
import dynamic from "next/dynamic";

export const withPageRouter = (Component) => {
  return withRouter(({ router, ...props }) => {
    router.query = { ...queryString.parse(router.asPath.split(/\?/)[1]) };
    return <Component {...props} router={router} />;
  });
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

function SearchBox({
  graphCampgrounds,
  regions,
  features,
  camptypes,
  router,
  singleColumn,
  cities,
}) {
  const classes = useStyles();
  const smValue = singleColumn ? 12 : 6;

  const { query } = router;

  const initialValues = {
    region: query.region || "all",
    camptype: query.camptype || "all",
    city: query.city || "all",
    campfeatures: query.campfeatures || "all",
  };

  console.log(cities);

  const geosuggestEl = useRef(null);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: "/camps",
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
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
                        <MenuItem key={town.acfDetails.city} value={town.acfDetails.city}>
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
                  type="submit"
                  fullWidth
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

export default withPageRouter(SearchBox);
