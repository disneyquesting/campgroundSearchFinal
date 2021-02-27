import "../styles/globals.css";
import Layout from "../components/layout";
import {GeoContextWrapper} from '../lib/state';

function MyApp({ Component, pageProps }) {
  return (
    <GeoContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </GeoContextWrapper>
  );
}

export default MyApp;
