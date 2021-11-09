
import Head from 'next/head'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { getAllProjectsSubTypes , getProjectSubTypes , getProjectByTypes , getMenus , getFooter} from '../../../../lib/api'
import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
const All = dynamic(() => import("../../../../components/project-categories/all/all"));
import ogimage from '../../../../assets/images/seo/og-default.png'
import style from '../../../../components/project/category.module.scss'

export default function subProject({subTypeProjects , project }){
    const router = useRouter()
    var pageData = project?.edges[0]?.node
    var projectSubTypes = pageData?.children?.edges
    var edges = subTypeProjects?.projectTypes?.edges[0]?.node?.children?.edges[0].node?.projects.edges
    var seo = pageData?.seo
    var activeClass = ''


    const [allProject, setallProject] = useState(false)

    const allProjects  = () => {
        setallProject(true)
    }


    if (projectSubTypes?.length > 0) {
        var common = <a href={`/projects/category/${pageData?.slug}`}className={ allProject ?` ${style.project__filter} project__filter marginRight ${style.active} ${style.filter__active} `: "project__filter marginRight" } onClick={allProjects} >all</a>
         
        var slug = projectSubTypes?.map((item) => {
          if(item?.node?.slug == router.query.sub_slug){
              activeClass = `${style.project__filter} project__filter marginRight ${style.filter__active}`
          }
          else{
              activeClass = `project__filter marginRight`
          }
            return (
              <>
                {item?.node?.projects?.edges.length > 0  &&  (
                  <>
                  <Link href={`/projects/category/${pageData?.slug}/${item?.node?.slug}`}> 
                    <a className={activeClass}>{item?.node?.name}</a>
                  </Link>
                  </>
                )}
              </>
            )
        })
      }
    else {
        var slug = ''
    }

    if (router.isFallback) {
        return (
          <>
          </>
        )
    }

    const backButton = () => {
        window.history.back();
    }

    return (
        <>
          <NextSeo 
              title={` ${pageData.name} | Itu Chaudhuri Design ` }
              description={seo.metaDesc}
              canonical={`https://icd-v3-vercel.vercel.app/projects/category/${pageData.slug}`}
              openGraph={{
                url: `https://icd-v3-vercel.vercel.app/projects/category/${pageData.slug}`,
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
            <meta name="twitter:url" content={`https://icd-v3-vercel.vercel.app/projects/category/${pageData.slug}`} />
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
  
  
        <>
            {edges?.length > 0  &&  (
            <>
                <All edges={edges} />
            </>
            )}
        </>       
          
        </>
      )
} 


export async function getStaticPaths({params}) {
  const projectTypes = await getAllProjectsSubTypes() 
  return {
    // paths: projectTypes.edges.map(({ node }) => `/projects/category/packaging/fb`) || [] ,
    // paths: projectTypes.edges.map(({ node }) => `/projects/category/packaging/cosmetics`) || [] ,
    paths: [
      { params: { slug: 'packaging', sub_slug: 'fb' }},
      { params: { slug: 'packaging' , sub_slug: 'cosmetics' }},
      { params: { slug: 'packaging' , sub_slug: 'other' }},
      { params: { slug: 'editorial' , sub_slug: 'newspaper' }},
      { params: { slug: 'editorial' , sub_slug: 'magazine' }},
      { params: { slug: 'digital' , sub_slug: 'website' }},
      { params: { slug: 'digital' , sub_slug: 'application' }},
      { params: { slug: 'digital' , sub_slug: 'enterprise-product' }},
     ],
    fallback: true,
  }
}


export async function getStaticProps({ params }) {
    const gProject = await getProjectByTypes(params.slug)
    const subTypeProjects = await getProjectSubTypes(params.slug ,params.sub_slug);
    const menus = await getMenus()
    const data = await getFooter()
    return{
        props: {
            project: gProject.projectTypes,
            menus,
            data,
            subTypeProjects,
        },
        revalidate: 1, 
    }
}
  
