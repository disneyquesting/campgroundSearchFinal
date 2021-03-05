import Link from 'next/link';
import Head from 'next/head';
import Nav from './nav';

export default function Layout({ children, pageTitle }) {
  return (
    <div>
      <Head>
        <title>{pageTitle || 'Home'}</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div>{children}</div>
    </div>
  );
}
