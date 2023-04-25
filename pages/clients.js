import { getClientsPage, getClients, getFooter, getFilters } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/clients/clients"));




export default function clients({ clients: { edges }, meta: { pages } }) {
  const meta_data = pages?.edges[0]?.node
  return (
    <Layout meta={meta_data} edges={edges} />
  )
}

export async function getServerSideProps() {
  const meta = await getClientsPage();
  const clients = await getClients()
  // const menus = await getMenus()
  const data = await getFooter()
  const filters = await getFilters()
  return {
    props: {
      clients,
      // menus,
      data,
      meta,
      filters
    },
    // revalidate: 86400,
  }
}

