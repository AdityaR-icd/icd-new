import { getAllProjectsForHome, getFooter, getProjectPage, getFilters , getLatestProject} from '../../../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../../components/project/allProject"));

export default function All({ AllProjects, meta: { pages } , latestProject }) {
  const meta_data = pages.edges[0].node
  return (
    <Layout AllProjects={AllProjects} meta={meta_data} latest={latestProject} />
  );
}

export async function getStaticProps({ preview = false }) {
  const AllProjects = await getAllProjectsForHome(preview)
  const data = await getFooter()
  const meta = await getProjectPage()
  const filters = await getFilters()
  const latestProject = await getLatestProject()
  return {
    props: {
      AllProjects,
      data,
      latestProject,
      meta,
      filters
    },
    revalidate: 180,
  }
}
