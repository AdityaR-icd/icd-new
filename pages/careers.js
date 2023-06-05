import parse from 'html-react-parser';
import { getCareerPage, getFooter, getJobs, getFilters } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/career/careers"));


export default function careers({ meta: { pages }, jobs }) {
    const meta_data = pages.edges[0].node
    return (
        <Layout meta={meta_data} jobs={jobs} />
    )
}


export async function getStaticProps() {
    const meta = await getCareerPage()
    const jobs = await getJobs()
    // const menus = await getMenus()
    const data = await getFooter()
    const filters = await getFilters()
    return {
        props: {
            meta,
            jobs,
            // menus,
            data,
            filters
        },
        // revalidate: 86400,
    }
}
