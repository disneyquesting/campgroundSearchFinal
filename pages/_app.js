import "../styles/globals.css";
import Layout from "../components/layout";
import { ViewportContextProvider } from "../lib/state";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo/apolloClient";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ViewportContextProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ViewportContextProvider>
  );
}

export default MyApp;
