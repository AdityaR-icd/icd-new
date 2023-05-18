
import { getFooter, getProjectTypes, getProjectPage, getFilters } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/project/projectCategory"));



export default function Index({ projectsTypes, meta: { pages } }) {
  const meta_data = pages?.edges[0]?.node

  return (
    <Layout projectsTypes={projectsTypes} meta={meta_data} />
  )
}


export async function getStaticProps({ preview = false }) {
  const meta = await getProjectPage()
  const projectsTypes = await getProjectTypes()
  const data = await getFooter()
  // const menus = await getMenus()
  const filters = await getFilters()
  return {
    props: {
      preview,
      projectsTypes,
      data,
      filters,
      // menus,
      meta

    },
    revalidate: 180,
  }

}

