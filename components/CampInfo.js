import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import SearchBox from "../components/searchbox";
import SecondNavigation from "../components/secondNavigation";
import Map from "../components/map";
import CampgroundResults from "../components/campresults";
import styles from "../styles/Home.module.sass";

const QUERY = gql`
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
`;

export default function CampInfo() {
  const [viewport, setViewport] = useState({
    latitude: 43.1939,
    longitude: 71.5724,
    zoom: 6,
  });

  const [campResults, setcampResults] = useState("Hey There");

  const { data, loading, error } = useQuery(QUERY);
  if (loading) {
    return <h2>Loading Initial Data...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>An error has occured. Please try again.</h2>;
  }

  const features = data.features;

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

  const allCampInfo = data;
  const regions = data.regions;
  const camptypes = data.ownerships;
  const graphCampgrounds = data.campgrounds.edges;

  return (
    <div className="columns">
      <div className="column is-centered m-5">
        <SearchBox
          selectObjects={object}
          regions={regions}
          features={features}
          camptypes={camptypes}
          graphCampgrounds={graphCampgrounds}
          cities={cities}
          viewport={viewport}
          setViewport={setViewport}
          campResults={campResults}
          setcampResults={setcampResults}
        />

        <div className="column mt-5 is-full">
          <CampgroundResults campResults={campResults} />
        </div>
      </div>
      <div className="column is-centered mr-5">
        <Map
          campgrounds={graphCampgrounds}
          viewport={viewport}
          setViewport={setViewport}
        />
      </div>
    </div>
  );
}
