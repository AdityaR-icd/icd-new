import '../styles/globals.scss'
import '../styles/header.scss'
import '../styles/variables.scss'
import '../styles/carousel-home.scss'
import '../styles/project-lead.scss'
import '../styles/home.scss'
import '../styles/intro-text.scss'
import Nav from '../components/header/header';


function MyApp({ Component, pageProps }) {
  return (
    <><Nav></Nav><Component {...pageProps} /></>
  )
}

export default MyApp
