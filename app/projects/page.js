import {  getProjectTypes , getProjectPage } from '../../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/project/projectCategory"));

export default async function Projects({ }){
    const meta = await getProjectPage()
    // const meta_data = pages.edges[0].node
    const projectsTypes = await getProjectTypes()

    return (
        <>
            <Layout projectsTypes={projectsTypes} meta_data={meta} />
        </>
    )
}