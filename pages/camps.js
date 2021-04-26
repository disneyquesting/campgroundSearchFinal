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
  graphCampgrounds,
  cities,
  campgroundsbycity,
}) {
  const [campResults, setcampResults] = useState(["No Campgrounds Found"]);

  const [viewport, setViewport] = useState({
    latitude: 43.1939,
    longitude: 71.5724,
    zoom: 6,
  });

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
            graphCampgrounds={graphCampgrounds}
            cities={cities}
            campgroundsbycity={campgroundsbycity}
            viewport={viewport}
            setViewport={setViewport}
            campResults={campResults}
            setcampResults={setcampResults}
          />
          <div className="column mt-5 is-full campgroundResults">
            {campResults[0] != "No Campgrounds Found" ? (
              <div className="campgroundresultsHeader">
                <p>Results:</p>
              </div>
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

        <div className="column is-centered mr-5 mapColumn">
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
      query MyQuery {
        features(first: 300) {
          nodes {
            label: name
            value: name
          }
        }
        regions(first: 300) {
          nodes {
            id
            name
            regioncoord {
              latitude
              longitude
            }
          }
        }
        ownerships(first: 300) {
          nodes {
            id
            name
          }
        }
        campgrounds(first: 300) {
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
              uri
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
      allCampInfo: data,
      regions: data.regions,
      camptypes: data.ownerships,
      object,
      graphCampgrounds: data.campgrounds.edges,
      cities,
    },
  };
}

// export async function getServerSideProps(query) {
//   console.log("Query is: ", query.query);
//   const info = query.query;
//   // retreive the regions form prisma
//   const regions = await getAllRegions();
//   // retrieve all features in existance
//   const features = await getAllFeatures();
//   // retrieve all types of campgrounds
//   const camptypes = await getAllTypes();
//   // retrieve all zip codes of campgrounds
//   const zipcodes = await getAllZipcodes();
//   // get all cities of campgrounds
//   const cities = await getAllCities();
//   // retrieve all campgrounds
//   const graphCampgrounds = await getAllCampgrounds();

//   // retrieve all campgrounds by a city
//   const campgroundsbycity = await getCampgroundsByCity(info.city);

//   // create object for features
//   const object = [];

//   features.nodes.map((feature) => {
//     return object.push({
//       label: feature.label,
//       value: feature.label,
//     });
//   });

//   return {
//     props: {
//       regions,
//       features,
//       camptypes,
//       zipcodes,
//       object,
//       graphCampgrounds,
//       cities,
//       campgroundsbycity,
//     },
//   };
// }
