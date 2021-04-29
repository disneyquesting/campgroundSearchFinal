import { useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import Head from 'next/head';
import client from '../lib/apollo/apollo-client';
import SearchBox from '../components/searchbox';
import Nav from '../components/nav';
import Map from '../components/map';

export default function CampList({
  regions,
  features,
  camptypes,
  zipcodes,
  object,
  graphCampgrounds,
  cities,
  campgroundsbycity,
  allCampgrounds,
  allCampInfo,
}) {
  const [campResults, setcampResults] = useState(['No Results Found']);

  const [viewport, setViewport] = useState({
    latitude: 43.1939,
    longitude: 71.5724,
    zoom: 6,
  });

  const [paginationInfo, setpaginationInfo] = useState([
    {
      endCursor: '',
      hasNextPage: '',
      hasPreviousPage: '',
      startCursor: '',
    },
  ]);

  return (
    <>
      <Head>
        <title>Find a Campground</title>
      </Head>
      <Nav />
      <div className="columns">
        <div className="column is-centered m-5">
          <SearchBox
            selectObjects={object}
            regions={regions}
            features={features}
            camptypes={camptypes}
            zipcodes={zipcodes}
            cities={cities}
            campgroundsbycity={campgroundsbycity}
            viewport={viewport}
            setViewport={setViewport}
            campResults={campResults}
            setcampResults={setcampResults}
            setpaginationInfo={setpaginationInfo}
            paginationInfo={paginationInfo}
          />
        </div>

        <div className="column is-centered mr-5 mapColumn">
          <a name="map" />
          <Map
            campgrounds={graphCampgrounds}
            viewport={viewport}
            setViewport={setViewport}
          />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query allCamps {
        features(first: 100) {
          nodes {
            label: name
            value: name
          }
        }
        regions(first: 100) {
          nodes {
            id
            name
            regioncoord {
              latitude
              longitude
            }
          }
        }
        ownerships(first: 100) {
          nodes {
            id
            name
          }
        }
        campgrounds(first: 100) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
            node {
              acfDetails {
                additionalNotes
                address
                city
                closeDate
                description
                eMailAddress
                fieldGroupName
                latitude
                longitude
                maxAmps
                maximumRvLength
                numberOfSites
                openDate
                phoneNumber
                picture {
                  altText
                  mediaItemUrl
                }
                state
                website
                zipCode
              }
              id
              title
              features {
                nodes {
                  name
                }
              }
              regions {
                nodes {
                  name
                }
              }
              ownerships {
                nodes {
                  name
                }
              }
              title
              uri
              id
              link
            }
          }
        }
      }
    `,
  });

  const { data: dataset2 } = await client.query({
    query: gql`
      query allCamps($endcursor: String) {
        campgrounds(first: 100, after: $endcursor) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
            node {
              acfDetails {
                additionalNotes
                address
                city
                closeDate
                description
                eMailAddress
                fieldGroupName
                latitude
                longitude
                maxAmps
                maximumRvLength
                numberOfSites
                openDate
                phoneNumber
                picture {
                  altText
                  mediaItemUrl
                }
                state
                website
                zipCode
              }
              id
              title
              features {
                nodes {
                  name
                }
              }
              regions {
                nodes {
                  name
                }
              }
              ownerships {
                nodes {
                  name
                }
              }
              title
              uri
              id
              link
            }
          }
        }
      }
    `,
    variables: { endcursor: data.campgrounds.pageInfo.endCursor },
  });

  const { features } = data;
  const cities = [];

  data.campgrounds.edges.map(city => {
    return cities.push({
      city: city.node.acfDetails.city,
    });
  });

  dataset2.campgrounds.edges.map(city => {
    return cities.push({
      city: city.node.acfDetails.city,
    });
  });

  const object = [];

  features.nodes.map(feature => {
    return object.push({
      label: feature.label,
      value: feature.label,
    });
  });

  const dataset3 = data.campgrounds.edges.concat(dataset2.campgrounds.edges);

  return {
    props: {
      allCampInfo: data,
      regions: data.regions,
      camptypes: data.ownerships,
      object,
      graphCampgrounds: dataset3,
      cities,
    },
  };
}
