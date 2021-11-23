import { NextSeo } from 'next-seo';
import { useState } from 'react'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
const All = dynamic(() => import("../../project-categories/all/all"));
const Head = dynamic(() => import('next/head'));
const Image = dynamic(() => import("next/image"));


import category from '../../project/category.module.scss'
import carousel from '../../project-categories/all/all.module.scss'
import type from '../../project-categories/type/type.module.scss'
import industries from './industry.module.scss'

export default function industry({meta , edges}) {
  const router = useRouter()
  const [expand, setExpand] = useState(false)

  var projects = ''
  var projectLength = ''
  var client = '';
  var leadImgSrc  = '';

  const backButton = () => {
    window.history.back();
  }

  // Onclick expand
  const toggleClass = () => {
    const currentState = expand;
    setExpand(!currentState );
  } 

  if(expand){
    var sectionClass = `${industries.industry_type_cont} ${type.industry__filter} ${industries.projects_expanded}`
  }else{
    var sectionClass = `${industries.industry_type_cont} ${type.industry__filter}`
  }

  const toBase64 = (str) =>
  typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str)

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
            <stop stop-color="#f6f6f6" offset="20%" />
            <stop stop-color="#f0f0f0" offset="50%" />
            <stop stop-color="#f6f6f6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#F6F6F6" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`


return(
      <>
        <NextSeo
          title={meta.seo.title}
          description={meta.seo.metaDesc}
          canonical={`https://icd-v3-vercel.vercel.app${router.route}`}
          robots={meta.metaRobotsNoindex}
          googlebot={meta.metaRobotsNofollow}
          openGraph={{
            url: `https://icd-v3-vercel.vercel.app${router.route}`,
              title: meta.seo.title,
              description: meta.seo.metaDesc,
              images: [
                  {
                      url: meta.featuredImage?.node.sourceUrl,
                      alt: 'homepage-image',
                      type: 'image/jpeg',
                  },
              ],
              site_name: meta.seo.title,
          }} />
          <Head>
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={meta.seo.title} />
              <meta name="twitter:description" content={meta.seo.metaDesc} />
              <meta name="twitter:url" content={`https://icd-v3-vercel.vercel.app${router.route}`} />
              <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
          </Head>

          <section className="client__page mT__260 page__header">
            <div className="container page__header--container">
                <div className="row">
                <div className="col-12 col-md-4 page__header--title">
                <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{meta.title}</h1></div>
                </div>
                <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                    <a href="/clients" className="project__filter marginRight">alphabetically</a>
                    <a href="/clients/industry" className={` project__filter ${category.project__filter} ${category.filter__active} filter__active`}>industry</a>
                </div>
                </div>
                <span className="bottom__border"></span>
            </div>
        </section>

        {edges.map( industry => (
          projects = industry.projects,
          projectLength = projects?.edges.length,
        <div key={industry.id}>
          <section className={sectionClass} id={industry.slug}>
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <span className={type.project__category}>{industry.name}</span>
                          {projectLength > 3 &&  (
                            <>
                            <span className={`d-md-block d-none ${industries.project__category__seeAll}`}>
                              <span className="see-all" onClick = { toggleClass }><span className={industries.expand_btn}></span>{ expand ? 'less '+industry.name: 'more '+industry.name }</span>
                            </span>
                            </>
                          )}
                      </div>
                  </div>
                  <div className="row">
                    {projectLength > 0  &&  (
                      <>
                      {projects.edges.map(({ node }) => (
                          client = node.clients.edges[0].node.name,
                          leadImgSrc = node.featuredImage.node.sourceUrl,
                      <>
                      <div className={`col-md-4 ${industries.project__tile}`} key={ node.id }>
                          <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                            <div className={carousel.thumbnail_cont}>
                                <a href={`/projects/${node.slug}`}>
                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                        <div className={`${carousel.full_thumb} full-thumb`}>
                                            <Image className={carousel.project_lead} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}  src={leadImgSrc} alt="project-lead" layout="fill" />
                                        </div>
                                        <span className="thumbnail-gif"></span>
                                    </span>
                                  <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
                                </a>
                            </div>
                            <a href={`/projects/${node.slug}`}>
                                <span className={carousel.projectTitle}>{node.projectComponent.heading}
                                    <span className={carousel.grey__color}>  / {client}</span>
                                </span>
                            </a>
                        </div>
                      </div> 
                      </>
                      ))}
                      </>
                    )}
                  </div>
                  {projectLength > 3 &&  (
                    <>
                    <span className="d-block d-md-none m-expand">
                      <span className="see-all" onClick = { toggleClass }><span className={industries.expand_btn}></span>{ expand ? 'less '+industry.name: 'more '+industry.name }</span>
                    </span>
                    </>
                  )}
                </div>
            </section>
          </div>
        ))}
      </>
    )
}
