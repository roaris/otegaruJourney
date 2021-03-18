import { Provider } from 'react-redux'
import withReduxStore from '../lib/redux-store'
import '../styles/globals.css'
import '../styles/Submit.css'
import '../styles/japanMap.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../styles/[post].css'

function MyApp(props) {
  const {Component, pageProps, reduxStore} = props
  return(
      <Provider store={reduxStore}>
        <Component {...pageProps}/>
      </Provider>
  )
  // return <Component {...pageProps} />
}

export default withReduxStore(MyApp)
