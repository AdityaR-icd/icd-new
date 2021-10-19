import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { getPages , getService } from '../lib/api'



export default function services({data : {pages} , service : {edges} }) {
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
    const data = await getPages()
    const service = await getService()
    return {
        props: { 
        data,
        service
        },
        revalidate: 1, 
    }
}