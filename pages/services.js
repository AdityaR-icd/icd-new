import Head from 'next/head'
import dynamic from "next/dynamic";
import { getPages , getService , getOtherService ,  getFooter , getFilters} from '../lib/api'
const Layout = dynamic(() => import("../components/services/services"));



export default function services({meta : {pages} , service : {edges} , otherService , filters   }) {
    const meta_data = pages.edges[0].node
    const other_service = otherService.edges
    return (
        <Layout meta={meta_data} edges={edges} other_service={other_service} />
    )   
}


export async function getStaticProps() {
    const meta = await getPages()
    const service = await getService()
    const otherService = await getOtherService()
    const data = await getFooter()
    // const menus = await getMenus()
    const filters = await getFilters()
    return {
        props: { 
            meta,
            service,
            // menus,
            data,
            otherService,
            filters
        },
        // revalidate: 86400, 
    }
}