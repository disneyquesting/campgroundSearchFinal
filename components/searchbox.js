import Link from "next/link";
import { Form, Formik, Field, useFormik } from "formik";
import Router, { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

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

  const { loading, error, data, refetch } = useQuery(MAP_CITY_DATA, {
    variables: {
      string: query.city === 'all' ? 'Twin Mountain' : query.city,
    },
    onCompleted: (info) => {
      console.log(info);
      const lat = info
        ? parseFloat(info.campgrounds.nodes[0].acfDetails.latitude.toFixed(4))
        : 44.43;

      const long = info
        ? Math.abs(
            parseFloat(
              info.campgrounds.nodes[0].acfDetails.longitude.toFixed(4)
            )
          ) * -1
        : -72.352;

      setViewport({
        ...viewport,
        latitude: info ? lat : 44.43,
        longitude: info ? long : -72.352,
        bearing: 0,
        pitch: 20,
        zoom: info ? 11 : 2,
      });
    },
  });

  const handleSubmit = async (values) => {
    Router.push(
      {
        pathname: "/camps",
        query: { ...values, page: 1 },
      },
      undefined,
      { shallow: true }
    ).then(async () => {
      refetch();
    });
  };

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
          <div className="field">
            <label id="search-region" className="label">
              Region
            </label>
            <Field
              name="region"
              as="select"
              labelId="search-region"
              label="Region"
              className="input"
            >
              <option value="all">All</option>
              {regions.nodes.map((region) => {
                return (
                  <option key={region.id} value={region.name}>
                    {region.name}
                  </option>
                );
              })}
            </Field>
          </div>

          <div className="field">
            <label id="search-type" className="label">
              Type
            </label>
            <Field
              name="camptype"
              as="select"
              labelId="search-type"
              label="Type"
              className="input"
            >
              <option value="all">All</option>
              {camptypes.nodes.map((camp) => {
                return (
                  <option key={camp.id} value={camp.name}>
                    {camp.name}
                  </option>
                );
              })}
            </Field>
          </div>

          <div className="field">
            <label id="search-feat" className="label">
              Features
            </label>
            <div className="select is-multiple">
              <Field
                name="campfeatures"
                as="select"
                labelId="search-feat"
                label="Features"
                className="input select"
                multiple
              >
                <option value="all">All</option>
                {features.nodes.map((cf) => {
                  return (
                    <option key={cf.name} value={cf.name}>
                      {cf.name}
                    </option>
                  );
                })}
              </Field>
            </div>
          </div>

          <div className="field">
            <label id="search-cities" className="label">
              City
            </label>
            <Field
              name="city"
              as="select"
              labelId="search-cities"
              label="Cities"
              className="input"
            >
              <option value="all">All</option>
              {cities.nodes.map((town) => {
                return (
                  <option
                    key={town.acfDetails.city}
                    value={town.acfDetails.city}
                  >
                    {town.acfDetails.city}
                  </option>
                );
              })}
            </Field>
          </div>

          <div className="field">
            <button
              color="primary"
              variant="outlined"
              type="button"
              fullWidth
              className="button is-link"
              onClick={submitForm}
            >
              Search Campgrounds
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
