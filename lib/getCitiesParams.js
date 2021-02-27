import { useRouter } from "next/router";

const API = process.env.WP_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log("error details:", query, variables);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

const Index = () => {
  const router = useRouter();
  const code = router.query;

  const dbParams = {
    region: query.region,
  };

  console.log(code, dbParams);

  Index.getInitialProps = async () => {
    return {};
  };

  return dbParams;
};

export async function getCampByCity() {

    const router = useRouter();
    const town = router.query.city;
  
    console.log(code, dbParams);

    getCampByCity.getInitialProps = async() => {
        return {};
    }

  const data = await fetchAPI(
    `
      query MyQuery($string STRING!) {
        campgrounds(where: {city: $string}) {
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
            }
          }
        }
      }
      `,
    {
      variables: {
        string: town,
      },
    }
  );
  return data?.campgrounds.edges;
}
