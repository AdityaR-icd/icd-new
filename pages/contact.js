import { getFooter, getContactPage , getFilters} from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/contact/contact"));
export default function contact({ meta: { pages } }) {
  const meta_data = pages.edges[0].node
  return (
    <Layout meta={meta_data} />
  )
}

export async function getStaticProps() {
  // const menus = await getMenus()
  const data = await getFooter()
  const meta = await getContactPage()
  const filters = await getFilters()
  return {
    props: {
      // menus,
      data,
      meta,
      filters
    },
    revalidate: 86400,
  }
}