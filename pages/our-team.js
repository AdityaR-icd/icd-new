import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { getOurteamPage , getTeam , getMenus , getFooter } from '../lib/api'
import { join } from 'lodash';


export default function careers({teamPage : { pages } , team : {edges}}) {
    return (
        <><>
        <div>
            {(pages.edges).map(({ node }) => (
                <>
                    <h4>{node.title}</h4>
                    {parse(node.content)}
                </>
            ))}
            {edges.map(({ node }) => (
                <>
                    <h4>{node.title}</h4>
                    <span className="Job_Desc">
                        {parse(node.content)}
                    </span>
                </>
            ))}
            </div>
        </></>
    )
}


export async function getStaticProps() {
    const teamPage = await getOurteamPage()
    const team = await getTeam()
    const menus = await getMenus()
    const data = await getFooter()
    return {
        props: { 
        teamPage,
        team,
        menus,
        data
        },
        revalidate: 1, 
    }
}
