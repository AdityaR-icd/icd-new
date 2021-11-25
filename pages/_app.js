import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'
import '../styles/index.scss'
import '../styles/header.scss'
import '../styles/search.scss'
import '../styles/footer.scss'
import '../styles/subscribe.scss'
import '../styles/fetch-jobs.scss'
import '../styles/jobs-form.scss'

import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/layout/layout"));



export default function MyApp({ Component, pageProps}){
  return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
  )
}
