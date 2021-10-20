
import { getAllProjectsForHome , getFooter , getProjectTypes , getMenus } from '../lib/api'

import Layout from '../components/project/project'



export default function Index({ AllProjects , projectsTypes  }) {
  return (
    <Layout AllProjects={AllProjects} projectsTypes={projectsTypes} />
  )
}

export async function getStaticProps({ preview = false }) {
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
        menus
    },
    revalidate: 1, 
  }
}

