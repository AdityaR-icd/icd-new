import { getAllProjectsForHome , getProjectPage  } from '../../../../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../../../components/project/allProject"));

export default async function Projects({ preview = false }){

    const AllProjects = await getAllProjectsForHome(preview)
    const meta = await getProjectPage()
    return (
        <Layout AllProjects={AllProjects} meta_data={meta} />
    )
}