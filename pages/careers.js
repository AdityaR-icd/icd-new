import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { Contact, getServicePage } from '../lib/api'
import { getJobs } from '../lib/api'
import  Enquiry  from '../components/enquiry/enquiry'
import { join } from 'lodash';


export default function careers({data : { pages } , jobs : { edges } }) {


    return (
        <><>
            {(pages.edges).map(({ node }) => (
                <>
                    {/* <h4>{node.name}</h4> */}
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
        </><Enquiry /></>
    )
}


export async function getStaticProps() {
    const data = await getServicePage()
    const jobs = await getJobs()
    return {
        props: { 
        data,
        jobs
        },
        revalidate: 1, 
    }
}
