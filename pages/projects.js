
import { getFooter, getProjectTypes, getProjectPage, getFilters , getLatestProject } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/project/projectCategory"));



export default function Index({ projectsTypes, meta: { pages } , latestProject }) {
  const meta_data = pages?.edges[0]?.node

  return (
    <Layout projectsTypes={projectsTypes} meta={meta_data} latest={latestProject} />
  )
}


export async function getStaticProps({ preview = false }) {
  const meta = await getProjectPage()
  const projectsTypes = await getProjectTypes()
  const data = await getFooter()
  // const menus = await getMenus()
  const filters = await getFilters()
  const latestProject = await getLatestProject()
  return {
    props: {
      preview,
      projectsTypes,
      data,
      filters,
      // menus,
      meta,
      latestProject

    },
    revalidate: 180,
  }

}

