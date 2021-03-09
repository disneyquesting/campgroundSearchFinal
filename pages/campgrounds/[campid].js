import { useRouter } from 'next/router';
import Head from 'next/head';
import SecondNavigation from '../../components/secondNavigation';
import {
  getAllCampgrounds,
  getSingleCampground,
  getAllFeatures,
  getAllTypes,
  getAllRegions,
} from '../../lib/api';

const Campground = ({ campground }) => {
  // validates if theres a campground otherwise it removes it.
  if (campground) {
    return (
      <>
        <Head>
          <title>{campground.title}</title>
        </Head>
        <SecondNavigation />
        <div>
          <h1>{campground.title}</h1>
          <p>{campground.ownerships.nodes[0].name}</p>
          <img
            src={campground.acfDetails.picture.mediaItemUrl}
            alt={campground.acfDetails.picture.altText}
          />
          <p>{campground.acfDetails.description}</p>
        </div>
      </>
    );
  }
  return <h1>No Campground Yet.</h1>;
};

export default Campground;

export async function getStaticPaths() {
  const campgrounds = await getAllCampgrounds();

  const paths = campgrounds.map(({ node }) => ({
    params: { campid: node.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const campground = await getSingleCampground(params.campid);
    return {
      props: {
        campground,
      },
      // nextjs attempts to regenerate the page when a request comes in
      revalidate: 1,
    };
  } catch (error) {
    return {
      // this will attempt
      notFound: true,
    };
  }
}
