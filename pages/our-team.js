import { getOurteamPage , getTeam , getMenus , getFooter } from '../lib/api'
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
    const menus = await getMenus()
    const data = await getFooter()
    return {
        props: { 
        meta,
        team,
        menus,
        data
        },
        revalidate: 180, 
    }
}
