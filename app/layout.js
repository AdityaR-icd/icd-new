import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'
import '../styles/index.scss'
import '../styles/header.scss'
import '../styles/search.scss'
import '../styles/footer.scss'
import '../styles/subscribe.scss'
import '../styles/fetch-jobs.scss'
import '../styles/jobs-form.scss'
import '../styles/slick/slick.css';
import '../styles/search-results.scss';

import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

const Nav = dynamic(() => import("../components/header/header"));
const Footer = dynamic(() => import("../components/footer/footer"));
import { getFilters , getFooter } from '../lib/api'

export default async function Layout({ children }) {
    const filters = await getFilters()
    const data = await getFooter()
    return (
      <html lang="en">       
        <body>
          <Nav data={filters} />
          {children}
          <Footer data={data}  />
        </body>
      </html>
    )
}

