
import Head from 'next/head'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { getAllProjectsSubTypes, getProjectSubTypes, getProjectByTypes, getFooter, getFilters } from '../../../../lib/api'
import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
const All = dynamic(() => import("../../../../components/project-categories/all/all"));
import ogimage from '../../../../assets/images/seo/og-default.png'
import style from '../../../../components/project/category.module.scss'

export default function subProject({ subTypeProjects, project }) {
  const router = useRouter()
  var pageData = project?.edges[0]?.node
  var projectSubTypes = pageData?.children?.edges
  var edges = subTypeProjects?.projectTypes?.edges[0]?.node?.children?.edges[0].node?.projects.edges
  var seo = pageData?.seo
  var activeClass = ''

  
  const [allProject, setallProject] = useState(false)

  const allProjects = () => {
    setallProject(true)
  }


  if (projectSubTypes?.length > 0) {
    var common = <Link href={`/projects/category/${pageData?.slug}`} className={allProject ? ` ${style.project__filter} project__filter marginRight ${style.active} ${style.filter__active} ` : "project__filter marginRight"} onClick={allProjects} >all</Link>

    var slug = projectSubTypes?.map((item) => {
      if (item?.node?.slug == router.query.sub_slug) {
        activeClass = `${style.project__filter} project__filter marginRight ${style.filter__active}`
      }
      else {
        activeClass = `project__filter marginRight`
      }
      return <>
        {item?.node?.projects?.edges.length > 0 && (
          <>
            <Link
              href={`/projects/category/${pageData?.slug}/${item?.node?.slug}`}
              className={activeClass}>
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
        title={` ${pageData.name} | Itu Chaudhuri Design `}
        description={seo.metaDesc}
        canonical={`https://www.icdindia.com/projects/category/${pageData.slug}/${router.query.sub_slug}`}
        openGraph={{
          url: `https://www.icdindia.com/projects/category/${pageData.slug}/${router.query.sub_slug}`,
          title: pageData.name,
          description: seo.opengraphDescription,
          images: [
            {
              url: "https://digital.icdindia.com/wp-content/uploads/2021/10/og-default.49aa7a10.png",
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
        <meta name="twitter:url" content={`https://www.icdindia.com/projects/category/${pageData.slug}/${router.query.sub_slug}`} />
        <meta name="twitter:image" content="https://digital.icdindia.com/wp-content/uploads/2021/10/og-default.49aa7a10.png" />
      </Head>
      <section className={`${style.project_type_cont} mT__260 page__header `}>
        <div className="container page__header--container">
          <div className="row">
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={backButton}><span className={` ${style.backBtn} backBtn`}></span><h1>{pageData.name}</h1></div>
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
        {edges?.length > 0 && (
          <>
            <All edges={edges} />
          </>
        )}
      </>

    </>
  )
}


export async function getStaticPaths({ params }) {
  const projectTypes = await getAllProjectsSubTypes()
  return {
    paths: [
      { params: { slug: 'packaging', sub_slug: 'fb-packaging' } },
      { params: { slug: 'packaging', sub_slug: 'cosmetics' } },
      { params: { slug: 'packaging', sub_slug: 'other' } },
      { params: { slug: 'editorial', sub_slug: 'newspaper' } },
      { params: { slug: 'editorial', sub_slug: 'magazine' } },
      { params: { slug: 'digital', sub_slug: 'website' } },
      { params: { slug: 'digital', sub_slug: 'application' } },
      { params: { slug: 'digital', sub_slug: 'enterprise-product' } },
    ],
    fallback: true,
  }
}


export async function getStaticProps({ params }) {
  const gProject = await getProjectByTypes(params.slug)
  const subTypeProjects = await getProjectSubTypes(params.slug, params.sub_slug);
  // const menus = await getMenus()
  const data = await getFooter()
  const filters = await getFilters()
  return {
    props: {
      project: gProject.projectTypes,
      // menus,
      data,
      subTypeProjects,
      filters
    },
    revalidate: 3600,
  }
}

