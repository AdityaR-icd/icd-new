
import { getAllProjectsForHome , getFooter , getProjectTypes } from '../lib/api'

import Layout from '../components/Project/project'



export default function Index({ AllProjects , projectsTypes  , data }) {
  return (
    <Layout data={data} AllProjects={AllProjects} projectsTypes={projectsTypes} />
  )
}

export async function getStaticProps({ preview = false }) {
  const AllProjects = await getAllProjectsForHome(preview)
  const projectsTypes = await getProjectTypes()
  const data = await getFooter()
  return {
    props: { 
        AllProjects,
        preview,
        projectsTypes,
        data
    },
    revalidate: 1, 
  }
}

