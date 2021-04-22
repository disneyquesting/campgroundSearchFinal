import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import client from "../lib/apollo/apollo-client";
import Head from "next/head";
import SearchBox from "../components/searchbox";
import {
  getAllCampgrounds,
  getAllFeatures,
  getAllRegions,
  getAllTypes,
  getAllZipcodes,
  getAllCities,
  getCampgroundsByCity,
  getCampgroundsBySearchQueries,
} from "../lib/api";

import SecondNavigation from "../components/secondNavigation";
import Map from "../components/map";
import CampgroundResults from "../components/campresults";
import ClientOnly from "../components/ClientOnly";
import CampInfo from "../components/CampInfo";

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
  const [campResults, setcampResults] = useState("Hey There");

  // const [viewport, setViewport] = useState({
  //   latitude: 43.1939,
  //   longitude: 71.5724,
  //   zoom: 6,
  // });

  return (
    <>
      <Head>
        <title>Find a Campground</title>
      </Head>
      <SecondNavigation />
      {/* <div className="columns">
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
          </div>
        <div className="column mt-5 is-full">
          <CampgroundResults campResults={campResults} />
        </div>

        <div className="column is-centered mr-5">
          <Map
            campgrounds={graphCampgrounds}
            viewport={viewport}
            setViewport={setViewport}
          />
        </div>
      </div> */}
      <ClientOnly>
        <CampInfo />
      </ClientOnly>
    </>
  );
}

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: gql`
//       query MyQuery {
//         features(first: 300) {
//           nodes {
//             label: name
//             value: name
//           }
//         }
//         regions(first: 300) {
//           nodes {
//             id
//             name
//             regioncoord {
//               latitude
//               longitude
//             }
//           }
//         }
//         ownerships(first: 300) {
//           nodes {
//             id
//             name
//           }
//         }
//         campgrounds(first: 300) {
//           edges {
//             node {
//               acfDetails {
//                 additionalNotes
//                 address
//                 city
//                 closeDate
//                 description
//                 eMailAddress
//                 fieldGroupName
//                 latitude
//                 longitude
//                 maxAmps
//                 maximumRvLength
//                 numberOfSites
//                 openDate
//                 phoneNumber
//                 picture {
//                   altText
//                   mediaItemUrl
//                 }
//                 state
//                 website
//                 zipCode
//               }
//               id
//               title
//               features {
//                 nodes {
//                   name
//                 }
//               }
//               regions {
//                 nodes {
//                   name
//                 }
//               }
//               ownerships {
//                 nodes {
//                   name
//                 }
//               }
//               uri
//             }
//           }
//         }
//       }
//     `,
//   });

//   const features = data.features;

//   const cities = [];

//   data.campgrounds.edges.map((city) => {
//     return cities.push({
//       city: city.node.acfDetails.city,
//     });
//   });

//   const object = [];

//   features.nodes.map((feature) => {
//     return object.push({
//       label: feature.label,
//       value: feature.label,
//     });
//   });

//   return {
//     props: {
//       allCampInfo: data,
//       regions: data.regions,
//       camptypes: data.ownerships,
//       object,
//       graphCampgrounds: data.campgrounds.edges,
//       cities,
//     },
//   };
// }

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
