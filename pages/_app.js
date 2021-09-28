import '../styles/globals.scss'
import '../styles/header.css'
import '../styles/variables.scss'
import Nav from '../components/header/header';


function MyApp({ Component, pageProps }) {
  return (
    <><Nav></Nav><Component {...pageProps} /></>
  )
}

export default MyApp
