import Head from 'next/head'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { getAllProjectsTypes , getProjectByTypes , getFooter , getFilters } from '../../../lib/api'
import { useRouter } from 'next/router'
import style from '../../../components/project/category.module.scss'
import ogimage from '../../../assets/images/seo/og-default.png'
import { useState } from 'react'


import dynamic from "next/dynamic";
const Intro = dynamic(() => import("../../../components/intro-text/intro-text"));
const All = dynamic(() => import("../../../components/project-categories/all/all"));




export default function Projects({ project }) {
    const router = useRouter()
    var pageData = project?.edges[0].node
    var projectSubTypes = pageData?.children?.edges
    var projects = pageData?.projects?.edges
    var seo = pageData?.seo

    const [allProject, setallProject] = useState(true)
    const [subTypeSlug, setsubTypeSlug] = useState(router.query.slug)
    


    const allProjects  = () => {
      setallProject(true)
    }


    if (projectSubTypes?.length > 0) {
        var common = <a className={ allProject ?` ${style.project__filter} project__filter marginRight ${style.active} ${style.filter__active} `: "project__filter marginRight" } onClick={allProjects} >all</a>
         
        var slug = projectSubTypes?.map((item) => {
          return <>
            {item?.node?.projects?.edges.length > 0  &&  (
              <>
                <Link
                  href={`/projects/category/${pageData?.slug}/${item?.node?.slug}`}
                  className={ !allProject ?` ${style.project__filter} project__filter marginRight ${style.filter__active}  `: "project__filter marginRight" }> 
                  {item?.node?.name}
                </Link>
              </>
            )}
          </>;
        })
      }
    else {
        var slug = ''
    }

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const backButton = () => {
        window.history.back();
    }
    
    return (
      <>
        <NextSeo 
            title={` ${pageData.name} | Itu Chaudhuri Design ` }
            description={seo.metaDesc}
            canonical={`https://www.icdindia.com/projects/category/${pageData.slug}`}
            openGraph={{
              url: `https://www.icdindia.com/projects/category/${pageData.slug}`,
              title: pageData.name,
              description: seo.opengraphDescription,
              images: [
                {
                  url: ogimage.src,
                  alt: 'project-categories',
                  type: 'image/jpeg',
                },
              ],
              site_name: pageData.name,
            }}
        />
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageData.name} />
          <meta name="twitter:description" content={seo.opengraphDescription} />
          <meta name="twitter:url" content={`https://www.icdindia.com/projects/category/${pageData.slug}`} />
          <meta name="twitter:image" content={ogimage.src} />
        </Head>
        <section className={`${style.project_type_cont} mT__260 page__header `}>
            <div className="container page__header--container">
              <div className="row">
                <div className="col-12 col-md-4 page__header--title">
                  <div className="back-cta" onClick={backButton}><span className={` ${style.backBtn} backBtn` }></span><h1>{pageData.name}</h1></div>
                </div>
                
                <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                    {common}
                    {slug}
                </div>
              </div>
              <span className="bottom__border"></span>
            </div>
        </section>


        {allProject  && (
          <>
            <Intro description={pageData.description} />
            <All edges={projects} />
          </>
        )}        
        
      </>
    )
  }
  
  export async function getStaticProps({ params }) {
    const gProject = await getProjectByTypes(params.slug)
    // const menus = await getMenus()
    const data = await getFooter()
    const filters = await getFilters()
    return {
      props: { 
        project: gProject.projectTypes,
        // menus,
        data,
        filters
      },
      revalidate: 180, 
    }
  }
  export async function getStaticPaths() {
    const allProjects = await getAllProjectsTypes() 
    return {
      paths: allProjects.edges.map(({ node }) => `/projects/category/${node.slug}`) || [] ,
      fallback: true,
    }
    
  }