import { Provider } from 'react-redux'
import withReduxStore from '../lib/redux-store'
import '../styles/globals.css'
import '../styles/Submit.css'
import '../styles/japanMap.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../styles/[post].css'

// persist化のためのインポート
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp(props) {
  const {Component, pageProps, reduxStore} = props
  const persistedStore = persistStore(reduxStore) //persist化で追加

  return(
      <Provider store={reduxStore}>
        <PersistGate loading={<p>now loading</p>} persistor={persistedStore}>
          <Component {...pageProps}/>
        </PersistGate>
      </Provider>
  )
  // return <Component {...pageProps} />
}

export default withReduxStore(MyApp)
