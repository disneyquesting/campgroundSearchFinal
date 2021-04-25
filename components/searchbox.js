import Link from "next/link";
import { Form, Formik, Field, FieldProps } from "formik";
import Router, { useRouter } from "next/router";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import MultiSelect from "react-multi-select-component";
import { useState } from "react";
import SelectField from "./CustomSelect";

export default function SearchBox({
  regions,
  camptypes,
  cities,
  viewport,
  selectObjects,
  setViewport,
  campResults,
  setcampResults,
}) {
  const router = useRouter();
  const { query } = router;

  const GET_SEARCH_RESULTS = gql`
    query campfeatures(
      $features: [String!]
      $regions: [String!]!
      $ownerships: [String!]!
    ) {
      campgrounds(
        where: {
          taxQuery: {
            taxArray: [
              {
                terms: $features
                taxonomy: FEATURE
                operator: AND
                field: SLUG
              }
              { terms: $regions, taxonomy: REGION, operator: AND, field: SLUG }
              {
                terms: $ownerships
                taxonomy: OWNERSHIP
                operator: AND
                field: SLUG
              }
            ]
            relation: AND
          }
        }
      ) {
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
          uri
          link
          features {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

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

  const REGION_INFO = gql`
    query MyQuery($string: [String!]!) {
      regions(where: { name: $string }) {
        nodes {
          campgrounds {
            edges {
              node {
                acfDetails {
                  city
                }
              }
            }
          }
          regioncoord {
            latitude
            longitude
          }
        }
      }
    }
  `;

  const initialCityList = [];

  const [citylist, setCityList] = useState([]);

  let vartest = 1;

  let uniqueData = {};

  const initialValues = {
    region: query.region || "all",
    camptype: query.camptype || "all",
    city: query.city || "all",
    campfeatures: query.campfeatures || "all",
  };

  // returns cities in region selected and coords for that
  const {
    loading: citylistLoading,
    error: citylistError,
    data: citylistData,
  } = useQuery(
    REGION_INFO,
    {
      variables: {
        string: query.region,
      },
      onCompleted: (info) => {
        const lat = info.regions.nodes[0]
          ? parseFloat(info.regions.nodes[0].regioncoord.latitude.toFixed(4))
          : 43.986886;

        const long = info.regions.nodes[0]
          ? parseFloat(info.regions.nodes[0].regioncoord.longitude.toFixed(4)) *
            -1
          : -71.407367;

        setViewport({
          ...viewport,
          latitude: info.regions.nodes[0] ? lat : 43.986886,
          longitude: info.regions.nodes[0] ? long : -71.407367,
          bearing: 0,
          pitch: 20,
          zoom: 8.5,
        });

        setCityList(initialCityList);
        info.regions.nodes[0]
          ? info.regions.nodes[0].campgrounds.edges.map((cities) => {
              setCityList((prevState) => [
                ...prevState,
                cities.node.acfDetails.city,
              ]);
            })
          : setCityList(initialCityList);
      },
    },
    (uniqueData = [...new Set(citylist.map((town) => town))])
  );

  //returns coords of the city selected
  const {
    loading: cityDataLoading,
    error: cityDataError,
    data: cityData,
  } = useQuery(MAP_CITY_DATA, {
    variables: {
      string: query.city,
    },
    onCompleted: (info) => {
      const lat = info.campgrounds.nodes[0]
        ? parseFloat(info.campgrounds.nodes[0].acfDetails.latitude.toFixed(4))
        : 43.986886;

      const long = info.campgrounds.nodes[0]
        ? Math.abs(
            parseFloat(
              info.campgrounds.nodes[0].acfDetails.longitude.toFixed(4)
            )
          ) * -1
        : -71.407367;

      setViewport({
        ...viewport,
        latitude: info.campgrounds.nodes[0] ? lat : 43.986886,
        longitude: info.campgrounds.nodes[0] ? long : -71.407367,
        bearing: 0,
        pitch: 20,
        zoom: info.campgrounds.nodes[0] ? 11 : 7.5,
      });
    },
  });

  // returns campgrounds that match features selected
  let features;
  const initialResultValues = [];
  const { loading, error, data, refetch } = useQuery(GET_SEARCH_RESULTS, {
    variables: {
      features:
        query.campfeatures != "all" ? query.campfeatures?.split(",") : [""],
      regions: query.region != "all" ? query.region : [""],
      ownerships: query.camptype != "all" ? query.camptype : [""],
    },
    onCompleted: (info) => {
      setcampResults(initialResultValues);
      info.campgrounds.nodes[0]
        ? info.campgrounds.nodes.map((campground) => {
            setcampResults((prevState) => [
              ...prevState,
              {
                name: campground.title,
                address: campground.acfDetails.address,
                city: campground.acfDetails.city,
                state: campground.acfDetails.state,
                latitude: campground.acfDetails.latitude,
                longitude: campground.acfDetails.longitude,
                link: campground.link,
                features: campground.features.nodes.name,
              },
            ]);
          })
        : setcampResults(["No Campgrounds Found"]);
    },
  });

  if (error) return `Error! ${error} Please try again.`;

  const handleSubmit = async (values) => {
    const campfeatures = Array.isArray(values.campfeatures)
      ? values.campfeatures.map(({ value }) => value).join(",")
      : (values.campfeatures = "all");
    Router.push(
      {
        pathname: "/camps",
        query: { ...values, campfeatures },
      },
      undefined,
      { shallow: true }
    ).then(async () => {
      refetch();
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, submitForm }) => (
        <Form>
          <div className="field">
            <label id="search-region" className="label" htmlFor="region">
              Region
            </label>
            <Field
              name="region"
              as="select"
              labelid="search-region"
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
            <label id="search-type" className="label" htmlFor="camptype">
              Type
            </label>
            <Field
              name="camptype"
              as="select"
              labelid="search-type"
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
            <label id="search-feat" className="label" htmlFor="search-feat">
              Features:
            </label>
            <Field
              component={SelectField}
              name="campfeatures"
              labelid="search-feat"
              label="Features"
              options={selectObjects}
              initialValues={initialValues.campfeatures}
            />
          </div>

          {query.region !== "all" ? (
            <div className="field">
              <label id="search-cities" className="label" htmlFor="city">
                City in Region
              </label>
              <Field
                name="city"
                as="select"
                labelid="search-cities"
                label="Cities"
                className="input"
              >
                <option value="all">All</option>
                {uniqueData.sort()}
                {uniqueData.map((town) => {
                  return (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  );
                })}
              </Field>
            </div>
          ) : (
            <></>
          )}

          <div className="field">
            <button type="button" className="button" onClick={submitForm}>
              Search Campgrounds
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
