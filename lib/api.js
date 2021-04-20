import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { useState } from "react";
import MultiSelect from "react-multi-select-component";

const API = process.env.NEXT_PUBLIC_WP_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API, {
    body: JSON.stringify({ query, variables }),
    headers,
    method: "POST",
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log("error details:", query, variables);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getMapCoords(town) {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${town}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`,
    {
      body: JSON.stringify(),
      method: "GET",
    }
  );

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
  }
  return json;
}

export async function getAllCities() {
  const data = await fetchAPI(
    `
    query MyQuery {
      campgrounds(first: 150) {
        nodes {
          acfDetails {
            city
          }
        }
      }
    }
    
    `
  );
  return data?.campgrounds;
}

export async function getAllFeatures() {
  const data = await fetchAPI(
    `
    query MyQuery {
      features(first: 150) {
        nodes {
          label: name
          value: name
        }
      }
    }
    `
  );
  return data?.features;
}

export async function getAllRegions() {
  const data = await fetchAPI(
    `
    query MyQuery {
      regions {
        nodes {
          id
          name
          regioncoord {
            latitude
            longitude
          }
        }
      }
    }
    
    
    `
  );
  return data?.regions;
}

export async function getAllCampgrounds() {
  const data = await fetchAPI(
    `query MyQuery {
      campgrounds(first: 250) {
        edges {
          cursor
          node {
            acfDetails {
              additionalNotes
              city
              address
              closeDate
              description
              eMailAddress
              fieldGroupName
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
              latitude
              longitude
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
    
            
          `
  );
  return data?.campgrounds.edges;
}

export async function getAllTypes() {
  const data = await fetchAPI(
    `
    query MyQuery {
      ownerships {
        nodes {
          id
          name
        }
      }
    }
    
    
    `
  );
  return data?.ownerships;
}

// get zip codes for all campgrounds
export async function getAllZipcodes() {
  const data = await fetchAPI(
    `
    query MyQuery {
      campgrounds(first: 150) {
        nodes {
          acfDetails {
            zipCode
          }
        }
      }
    }
    
    `
  );
  return data?.campgrounds;
}

// get a single campground
export async function getSingleCampground(slug) {
  const data = await fetchAPI(
    `
    query MyQuery($id: ID!) {
      campground(id: $id) {
        acfDetails {
          additionalNotes
          address
          closeDate
          description
          eMailAddress
          fieldGroupName
          maxAmps
          maximumRvLength
          openDate
          numberOfSites
          phoneNumber
          website
          latitude
          longitude
          picture {
            altText
            mediaItemUrl
          }
        }
        features {
          nodes {
            name
            id
          }
        }
        regions {
          nodes {
            id
            name
          }
        }
        ownerships {
          nodes {
            name
          }
        }
        title
      }
    }
    
    `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.campground;
}

export async function getCampgroundsByCity(query) {
  const data = await fetchAPI(
    `
      query MyQuery($string: String) {
        campgrounds(where: {city: $string}) {
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
      `,
    {
      variables: {
        string: query,
      },
    }
  );

  return data?.campgrounds;
}

export async function getCampgroundsBySearchQueries(
  features,
  regions,
  ownerships
) {
  features == "all" ? (features = undefined) : features;
  regions == "all" ? (regions = undefined) : regions;
  ownerships == "all" ? (ownerships = undefined) : ownerships;

  const data = await fetchAPI(
    `query campfeatures($features: [String!], $regions: [String!]!, $ownerships: [String!]!) {
      campgrounds(where: {taxQuery: {taxArray: [{terms: $features, taxonomy: FEATURE, operator: AND, field: SLUG}, {terms: $regions, taxonomy: REGION, operator: AND, field: SLUG}, {terms: $ownerships, taxonomy: OWNERSHIP, operator: AND, field: SLUG}], relation: AND}}) {
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
    
    `,
    {
      variables: {
        features: features || [""],
        regions: regions || [""],
        ownerships: ownerships || [""],
      },
    }
  );
  return data?.campgrounds;
}

function getValueStr(value) {
  const str = getAsString(value);
  return !str || str.toLowerCase() === "all" ? null : str;
}
