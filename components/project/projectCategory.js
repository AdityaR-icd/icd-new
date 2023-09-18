import { NextSeo } from 'next-seo';
import React from 'react';
import dynamic from "next/dynamic";
const Head = dynamic(() => import('next/head'));
const Type = dynamic(() => import("../project-categories/type/type"));
import Link from 'next/link';

import project from './projects.module.scss'
import category from './category.module.scss'
export default function projectCategory({ meta, projectsTypes: { nodes } , latest }) {


  const backButton = () => {
    window.history.back();
  }

  return (

    <>

      <>
        <NextSeo
          title={meta.seo.title}
          description={meta.seo.metaDesc}
          canonical="https://www.icdindia.com/projects"
          robots={meta.metaRobotsNoindex}
          googlebot={meta.metaRobotsNofollow}
          openGraph={{
            url: 'https://www.icdindia.com/projects',
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
          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.seo.title} />
          <meta name="twitter:description" content={meta.seo.metaDesc} />
          <meta name="twitter:url" content="https://www.icdindia.com/projects" />
          <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
          {/* end of Twitter Cards */}
        </Head>

        <section className={`${project.projects__page} mT__260 page__header `}>
          <div className="container page__header--container">
            <div className="row">
              <div className="col-12 col-md-4 page__header--title">
                <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{meta.title}</h1></div>
              </div>
              <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                <Link href="/projects/type/all" className="project__filter marginRight">all</Link>
                {/* <Link href="/projects" className={` project__filter ${category.project__filter} ${category.filter__active} filter__active`} >category</Link> */}
                {nodes.map(({name , slug}) => (
                  <Link href={`/projects/category/${slug}`} className={` project__filter ${category.project__filter}`} >{name}</Link>
                ))}
              </div>
            </div>
            <span className="bottom__border"></span>
          </div>
        </section>

        <Type nodes={nodes} latestProject={latest} />
      </>

    </>

  )
}
