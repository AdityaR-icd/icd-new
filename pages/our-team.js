import { getOurteamPage , getTeam ,  getFooter , getFilters } from '../lib/api'
import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../components/team/team'));


export default function careers({ meta : {pages} , team }) {
    const meta_data = pages.edges[0].node
    return (
        <>
            <Layout meta={meta_data} team={team} />
        </>
    )
}


export async function getStaticProps() {
    const meta = await getOurteamPage()
    const team = await getTeam()
    // const menus = await getMenus()
    const data = await getFooter()
    const filters = await getFilters()
    return {
        props: { 
        meta,
        team,
        // menus,
        data,
        filters
        },
        revalidate: 86400, 
    }
}
