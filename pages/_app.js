import MainLayout from "layouts/Main";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "api/apolloClient";

import 'styles/index.scss'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  const Layout = Component.getLayout || MainLayout

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}