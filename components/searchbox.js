import Link from 'next/link';
import { Form, Formik, Field, FieldProps } from 'formik';
import Router, { useRouter } from 'next/router';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import MultiSelect from 'react-multi-select-component';
import { useState } from 'react';
import SelectField from './CustomSelect';

export default function SearchBox({
  regions,
  camptypes,
  cities,
  viewport,
  selectObjects,
  setViewport,
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

  const CITY_LIST = gql`
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
        }
      }
    }
  `;

  const initialCityList = [];
  const [citylist, setCityList] = useState([]);

  let uniqueData = {};

  const initialValues = {
    region: query.region || 'all',
    camptype: query.camptype || 'all',
    city: query.city || 'all',
    campfeatures: query.campfeatures || 'all',
  };

  const {
    loading: citylistLoading,
    error: citylistError,
    data: citylistData,
  } = useQuery(
    CITY_LIST,
    {
      variables: {
        string: query.region,
      },
      onCompleted: info => {
        setCityList(initialCityList);
        info.regions.nodes.length >= 1
          ? info.regions.nodes[0].campgrounds.edges.map(cities => {
              setCityList(prevState => [
                ...prevState,
                cities.node.acfDetails.city,
              ]);
              console.log('City in Region: ', cities.node.acfDetails.city);
            })
          : setCityList(initialCityList);
      },
    },
    (uniqueData = [...new Set(citylist.map(town => town))])
  );

  const {
    loading: cityDataLoading,
    error: cityDataError,
    data: cityData,
  } = useQuery(MAP_CITY_DATA, {
    variables: {
      string: query.city === 'all' ? 'Twin Mountain' : query.city,
    },
    onCompleted: info => {
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

      console.log('City updated.');
    },
  });

  let features;
  const { loading, error, data, refetch } = useQuery(GET_SEARCH_RESULTS, {
    variables: {
      features:
        query.campfeatures != 'all' ? query.campfeatures?.split(',') : [''],
      regions: query.region != 'all' ? query.region : [''],
      ownerships: query.camptype != 'all' ? query.camptype : [''],
    },
    onCompleted: info => {
      info.campgrounds.nodes.length >= 1
        ? info.campgrounds.nodes.map(campground => {
            console.log(campground.title);
          })
        : console.log('No campgrounds found');
    },
  });

  if (error) return `Error! ${error} Please try again.`;

  const handleSubmit = async values => {
    const campfeatures = Array.isArray(values.campfeatures)
      ? values.campfeatures.map(({ value }) => value).join(',')
      : (values.campfeatures = 'all');
    Router.push(
      {
        pathname: '/camps',
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
              {regions.nodes.map(region => {
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
              {camptypes.nodes.map(camp => {
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

          {query.region !== 'all' ? (
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

                {uniqueData.map(town => {
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
            <button
              color="primary"
              variant="outlined"
              type="button"
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
