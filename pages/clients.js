import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { getClients } from '../lib/api'
import { getIndustries } from '../lib/api'
import Link from 'next/link'
import { NextSeo } from 'next-seo';




export default function clients({ industries: { nodes } , data : { edges } }  ) {
    return (
        <>
           {edges.map(({ node }) => (               
                <>
                <h4>{node.name}</h4>
                 <div>
                 {(
                    function (project) {
                        const data = node.projects.edges;
                        for (let i = 0; i < (node.projects.edges).length; i++) {
                            project.push(<p>{data[i]?.node.title}</p>)
                        }
                        return project;
                })([], 0, 10)}
                 </div>
                </>
           ))} 
           <br />
           <br />
          <h1>Projects according Industries</h1>
          <br />
          <br />
          {nodes.map( industry  => (  
            <>
              <h4>{industry.name}</h4>
              <div>
                 {(
                    function (indus) {
                        const data = industry.projects.edges;
                        for (let i = 0; i < (industry.projects.edges).length; i++) {
                          indus.push(<p>{data[i]?.node.title}</p>)
                        }
                        return indus;
                  })([], 0, 10)}
                </div>
            </>
          ))}
         </>
    )
}

export async function getStaticProps() {
    const data = await getClients()
    const industries = await getIndustries()
    return {
      props: { 
        data,
        industries
      },
      revalidate: 1, 
    }
  }

