import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { Contact, getServicePage , getMenus , getFooter , getJobs } from '../lib/api'
import  Enquiry  from '../components/enquiry/enquiry'
import { join } from 'lodash';


export default function careers({service : { pages } , jobs : { edges } }) {


    return (
        <><>
        <div>
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
            </div>
        </><Enquiry /></>
    )
}


export async function getStaticProps() {
    const service = await getServicePage()
    const jobs = await getJobs()
    const menus = await getMenus()
    const data = await getFooter()
    return {
        props: { 
        service,
        jobs,
        menus,
        data
        },
        revalidate: 1, 
    }
}
