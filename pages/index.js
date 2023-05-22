import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/home/home"));
import { getFooter  , getHome , getFilters , getLatestProject  } from '../lib/api'

export default function Home({data , project , home , latestProject }) {
    return(
       <Layout data={data} themes={data} project={project} home={home} latest={latestProject} />
    )
}

export async function getStaticProps() {
    const data = await getFooter()
    const home = await getHome()
    const filters = await getFilters()
    const latestProject = await getLatestProject()
    return {
        props: { 
        data,
        home,
        latestProject,
        filters
        },
        revalidate: 60, 
    }
}
