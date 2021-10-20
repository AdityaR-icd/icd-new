import '../styles/index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'
import '../styles/header.scss'
import '../styles/variables.scss'
import '../styles/subscribe.scss'
import '../styles/footer.scss'
import Layout from '../components/layout/layout'



export default function MyApp({ Component, pageProps}){
  return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
  )
}
