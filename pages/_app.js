import MainLayout from "layouts/Main";
import { Provider } from 'mobx-react'

import 'styles/index.scss'
import { useStore } from "stores/Store";

export default function App({ Component, pageProps }) {

  const store = useStore(pageProps.initialState)

  const Layout = Component.getLayout || MainLayout

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}