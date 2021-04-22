import "../styles/globals.sass";
import Layout from "../components/layout";
import { ViewportContextProvider } from "../lib/state";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo/apolloClient";
import client from "../lib/apollo/apollo-client";
import Router from "next/router";
import Link from "next/link";
import Head from "next/head";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps.initialApolloState);
  //<ApolloProvider client={apolloClient}
  return (
    <ViewportContextProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Head>
            <link
              href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
              rel="stylesheet"
            />
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ViewportContextProvider>
  );
}

export default MyApp;
