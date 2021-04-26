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
  paginationInfo,
  setpaginationInfo,
}) {
  const router = useRouter();
  const { query } = router;

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (fetchMoreResult.campgrounds.nodes.length > 1) {
      setpaginationInfo([
        {
          endCursor: fetchMoreResult.campgrounds.pageInfo.endCursor,
          hasNextPage: fetchMoreResult.campgrounds.pageInfo.hasNextPage,
          hasPreviousPage: fetchMoreResult.campgrounds.pageInfo.hasPreviousPage,
          startCursor: fetchMoreResult.campgrounds.pageInfo.startCursor,
        },
      ]);

      setcampResults(initialResultValues);
      fetchMoreResult.campgrounds.nodes[0]
        ? fetchMoreResult.campgrounds.nodes.map((campground) => {
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
                features: campground.features.nodes,
                id: campground.id,
              },
            ]);
          })
        : setcampResults(["No Campgrounds Found"]);
    } else {
      setpaginationInfo([
        {
          endCursor: previousResult.campgrounds.pageInfo.endCursor,
          hasNextPage: previousResult.campgrounds.pageInfo.hasNextPage,
          hasPreviousPage: previousResult.campgrounds.pageInfo.hasPreviousPage,
          startCursor: previousResult.campgrounds.pageInfo.startCursor,
        },
      ]);

      setcampResults(initialResultValues);
      previousResult.campgrounds.nodes[0]
        ? previousResult.campgrounds.nodes.map((campground) => {
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
                features: campground.features.nodes,
                id: campground.id,
              },
            ]);
          })
        : setcampResults(["No Campgrounds Found"]);
    }
    return {};
  };

  const GET_SEARCH_RESULTS = gql`
    query campfeatures(
      $features: [String!]
      $regions: [String!]!
      $ownerships: [String!]!
      $first: Int
      $last: Int
      $after: String
      $before: String
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
          orderby: { field: TITLE, order: ASC }
        }
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          cursor
        }
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
            state
            picture {
              altText
              mediaItemUrl
            }
          }
          title
          uri
          id
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
      campgrounds(
        where: { city: $string, orderby: { field: TITLE, order: ASC } }
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
            state
            picture {
              altText
              mediaItemUrl
            }
          }
          title
          uri
          id
          link
        }
      }
    }
  `;

  const REGION_INFO = gql`
    query MyQuery($string: [String!]!) {
      regions(where: { name: $string, orderby: NAME }) {
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
                id: campground.id,
              },
            ]);
          })
        : setcampResults(["No Campgrounds Found"]);
    },
  });

  // returns campgrounds that match features selected
  let features;
  const initialResultValues = [];
  const { loading, error, data, refetch, fetchMore } = useQuery(
    GET_SEARCH_RESULTS,
    {
      variables: {
        features:
          query.campfeatures != "all" ? query.campfeatures?.split(",") : [""],
        regions: query.region != "all" ? query.region : [""],
        ownerships: query.camptype != "all" ? query.camptype : [""],
        city: query.city != "all" ? query.city : ["all"],
        first: 10,
        last: null,
        before: null,
        after: null,
      },
      onCompleted: (info) => {
        setpaginationInfo([
          {
            endCursor: info.campgrounds.pageInfo.endCursor,
            hasNextPage: info.campgrounds.pageInfo.hasNextPage,
            hasPreviousPage: info.campgrounds.pageInfo.hasPreviousPage,
            startCursor: info.campgrounds.pageInfo.startCursor,
          },
        ]);
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
                  features: campground.features.nodes,
                  id: campground.id,
                },
              ]);
            })
          : setcampResults(["No Campgrounds Found"]);
      },
    }
  );

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

  const initialValues = {
    region: query.region || "all",
    camptype: query.camptype || "all",
    city: query.city || "all",
    // campfeatures: query.features || "all",
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
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

          {query.city == "all" ? (
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
              />
            </div>
          ) : (
            <div>
              <p>Feature Search Only Available for All Cities.</p>
            </div>
          )}

          {query.region !== "all" && query.campfeatures == "all" ? (
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

          <div className="pageButtons">
            {paginationInfo[0].hasPreviousPage ? (
              <button
                onClick={() => {
                  fetchMore({
                    variables: {
                      first: null,
                      after: null,
                      last: 10,
                      before: paginationInfo[0].startCursor || null,
                    },
                    updateQuery,
                  });
                }}
              >
                Previous
              </button>
            ) : null}

            {paginationInfo[0].hasNextPage ? (
              <button
                onClick={() => {
                  fetchMore({
                    variables: {
                      first: 10,
                      after: paginationInfo[0].endCursor || null,
                      last: null,
                      before: null,
                    },
                    updateQuery,
                  });
                }}
              >
                Next
              </button>
            ) : null}
          </div>
        </Form>
      )}
    </Formik>
  );
}
