import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { getAllProjectsTypes , getProjectByTypes , getMenus , getFooter} from '../../../lib/api'
import { useRouter } from 'next/router'
import style from '../../../components/project/category.module.scss'
import ogimage from '../../../assets/images/seo/og-default.png'


import dynamic from "next/dynamic";
const Intro = dynamic(() => import("../../../components/intro-text/intro-text"));
const All = dynamic(() => import("../../../components/project-categories/all/all"));




export default function Projects({ project }) {
    const router = useRouter()
    var pageData = project?.edges[0].node
    var projectSubTypes = pageData?.projects?.edges[0].node.projectSubTypes
    var projects = pageData?.projects.edges
    var seo = pageData?.seo


    if (projectSubTypes?.edges.length > 0) {
        var common = <a className="project__filter marginRight">all</a>
        var slug = 
        
        projectSubTypes.edges.map((item) => {
            return (
                <>
                <a href={ `/projects/category/${item.slug}` } className="project__filter marginRight">{item.node.name}</a>
                </>
            )
        }).reverse();
    } else {
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

        <Intro description={pageData.description}/>

        <All edges={projects}/>
        
      </>
    )
  }
  
  export async function getStaticProps({ params }) {
    const gProject = await getProjectByTypes(params.slug)
    const menus = await getMenus()
    const data = await getFooter()
    return {
      props: { 
        project: gProject.projectTypes,
        menus,
        data
      },
      revalidate: 1, 
    }
  }

  export async function getStaticPaths() {
    const allProjects = await getAllProjectsTypes() 
    return {
      paths: allProjects.edges.map(({ node }) => `/projects/category/${node.slug}`) || [] ,
      fallback: true,
    }
    
  }