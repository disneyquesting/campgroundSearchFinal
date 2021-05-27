import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Head from "next/head";
import client from "../lib/apollo/apollo-client";
import SearchBox from "../components/searchbox";
import Nav from "../components/nav";
import Map from "../components/map";
import CampgroundResults from "../components/campresults";
export default function CampList({
  regions,
  features,
  camptypes,
  zipcodes,
  object,
  cities,
}) {
  const [campResults, setcampResults] = useState(["No Campgrounds Found"]);

  console.log("campresults: ", campResults);
  const [viewport, setViewport] = useState({
    latitude: 43.1939,
    longitude: 71.5724,
    zoom: 5,
  });

  return (
    <>
      <Head>
        <title>Find a Campground</title>
      </Head>
      <Nav />
      <div className="columns">
        <div className="column is-half is-narrow is-centered mr-5 mapColumn mt-5 ml-5">
          <a name="map" />
          <Map
            viewport={viewport}
            setViewport={setViewport}
            campResults={campResults}
          />
        </div>
        <div className="column is-5 is-centered mt-5">
          <SearchBox
            selectObjects={object}
            regions={regions}
            features={features}
            camptypes={camptypes}
            zipcodes={zipcodes}
            cities={cities}
            viewport={viewport}
            setViewport={setViewport}
            campResults={campResults}
            setcampResults={setcampResults}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-centered m-5">
          {campResults[0] != "No Campgrounds Found" ? (
            <div className="campgroundresultsHeader"></div>
          ) : (
            <div className="campgroundresultsHeader">
              <p>No Campground's Found, Please Search Again.</p>
            </div>
          )}
          <CampgroundResults
            campResults={campResults}
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
        campgrounds(first: 200) {
          edges {
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

  const { features } = data;
  const cities = [];

  data.campgrounds.edges.map((city) => {
    return cities.push({
      city: city.node.acfDetails.city,
    });
  });

  const object = [];

  features.nodes.map((feature) => {
    return object.push({
      label: feature.label,
      value: feature.label,
    });
  });

  return {
    props: {
      regions: data.regions,
      camptypes: data.ownerships,
      object,
      cities,
    },
  };
}
