import { getIndustries, getClientsPage, getFooter } from '../../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/clients/industry/industry"));


export default function industry({ industries: { nodes }, meta: { pages } }) {
  const meta_data = pages.edges[0].node
  return (
    <Layout meta={meta_data} edges={nodes} />
  )
}

export async function getStaticProps() {
  const meta = await getClientsPage();
  const industries = await getIndustries()
  // const menus = await getMenus()
  const data = await getFooter()
  // const filters = await getFilters()
  return {
    props: {
      industries,
      // menus,
      data,
      meta,
      // filters
    },
    // revalidate: 180,
  }
}