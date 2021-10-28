
import { getAllProjectsForHome , getFooter , getProjectTypes , getMenus , getProjectPage } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/project/project"));



export default function Index({ AllProjects , projectsTypes , meta:{pages} }) {
  const meta_data = pages.edges[0].node
  return (
    <Layout AllProjects={AllProjects} projectsTypes={projectsTypes} meta={meta_data} />
  )
}

export async function getStaticProps({ preview = false }) {
  const meta = await getProjectPage()
  const AllProjects = await getAllProjectsForHome(preview)
  const projectsTypes = await getProjectTypes()
  const data = await getFooter()
  const menus = await getMenus()
  return {
    props: { 
        AllProjects,
        preview,
        projectsTypes,
        data,
        menus,
        meta
    },
    revalidate: 1, 
  }
}

