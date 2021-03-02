import '../styles/globals.css';
import Layout from '../components/layout';
import { ViewportContextProvider } from '../lib/state';

function MyApp({ Component, pageProps }) {
  return (
    <ViewportContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ViewportContextProvider>
  );
}

export default MyApp;
