import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { getAllProjectsForHome } from '../lib/api'
import { getProjectTypes } from '../lib/api'
import Link from 'next/link'
import { NextSeo } from 'next-seo';



export default function Index({ AllProjects: { edges }, preview , projectsTypes : { nodes } }) {
  return (
    <>
      {edges.map(({ node }) => (
       
         <>
         <Link href={`/projects/${node.slug}`}>
          <a
            className="hover:underline"
          >
            <h4>{node.title}</h4>
          </a>
        </Link>
         {/* <Image src={node.featuredImage?.node.sourceUrl} alt="Picture of the author" /> */}
        {/* {parse(node.excerpt)} */}
         </>
      ))}

      <br />
      <br />
      <h1>projects By categories</h1>
      {nodes.map( types  => (  
          <>
            <h4>{types.name}</h4>
            <div>
                {(
                  function (projectType) {
                      const data = types.projects.edges;
                      for (let i = 0; i < (types.projects.edges).length; i++) {
                        projectType.push(<p>{data[i]?.node.title}</p>)
                      }
                      return projectType;
                })([], 0, 10)}
              </div>
          </>
        ))}
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const AllProjects = await getAllProjectsForHome(preview)
  const projectsTypes = await getProjectTypes()
  return {
    props: { 
        AllProjects,
        preview,
        projectsTypes
    },
    revalidate: 1, 
  }
}

