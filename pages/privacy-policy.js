import Head from 'next/head'

import dynamic from "next/dynamic";
import { getFooter , getFilters , getPolicyPage} from '../lib/api'
const Layout = dynamic(() => import("../components/privacy/privacy"));


export default function privacy({ meta: { pages }}) {
    const meta_data = pages.edges[0].node
   return(
    <>
        <Layout meta={meta_data}/>
    </>
   ) 
}


export async function getStaticProps() {
   
    const data = await getFooter()
    const meta = await getPolicyPage()
    const filters = await getFilters()
    return {
        props: { 
            data,
            filters,
            meta
        },
        // revalidate: 86400, 
    }
}