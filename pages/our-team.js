import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { getOurteamPage , getTeam } from '../lib/api'
import { join } from 'lodash';


export default function careers({data : { pages } , team : {edges}}) {
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
    const data = await getOurteamPage()
    const team = await getTeam()
    return {
        props: { 
        data,
        team
        },
        revalidate: 1, 
    }
}
