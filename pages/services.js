import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { getPages , getService , getMenus , getFooter } from '../lib/api'



export default function services({pages : {pages} , service : {edges}   }) {
    return (
            <>
            {(pages.edges).map(({ node }) => (     
                <div>
                    {parse(node.content)}
                    {parse(node.servicesSection2Text?.text)}
                </div>
            ))}
            </>
    )
}


export async function getStaticProps() {
    const pages = await getPages()
    const service = await getService()
    const data = await getFooter()
    const menus = await getMenus()
    return {
        props: { 
        pages,
        service,
        menus,
        data
        },
        revalidate: 1, 
    }
}