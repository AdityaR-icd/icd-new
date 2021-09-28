import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { getPages } from '../lib/api'



export default function services({data : {pages} }) {
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
    return {
        props: { 
        data
        },
        revalidate: 1, 
    }
}