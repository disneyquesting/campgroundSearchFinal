import Head from 'next/head';
import SimpleSearch from '../components/simpleSearch';

export default function Home({}) {
  return (
    <>
      <Head>
        <title>NH Campground Association</title>
      </Head>
      <SimpleSearch />
    </>
  );
}

// gets us front page of campgrounds
