import { getAllProjectsForHome , getFooter, getProjectPage , getFilters } from '../../../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../../components/project/allProject"));

export default function All({ AllProjects , meta:{pages}}) {
    const meta_data = pages.edges[0].node
    return (
        <Layout AllProjects={AllProjects} meta={meta_data} />
    );
}

export async function getStaticProps({ preview = false }) {
    const AllProjects = await getAllProjectsForHome(preview)
    const data = await getFooter()
    // const menus = await getMenus()
    const meta = await getProjectPage()
    const filters = await getFilters()
    return {
      props: { 
          AllProjects,
          data,
        //   menus,
          meta,
          filters
      },
      revalidate: 180, 
    }
  }
  