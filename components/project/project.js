import { NextSeo } from 'next-seo';
import Head from 'next/head'
import React, { Component } from 'react';
import { useRouter } from 'next/router'
import { useState } from 'react'
import All from '../project-categories/all/all'
import project from './projects.module.scss'

export default function Index({ AllProjects: { edges }, preview , projectsTypes : { nodes } , data , meta }) {

  const router = useRouter()
  const [category, setType] = useState(false)
  const [all, setAll] = useState(true)
  const [active, setActive] = useState('filter__active')

  const backButton = () => {
    window.history.back();
  }

  const FilterByAll = () => {
    setAll(true)
    setType(false)
  }

  const FilterByType = () => {
    setAll(false)
    setType(true)
  }


  
  return (

      <>
      <NextSeo
      title={meta.seo.title}
      description={meta.seo.metaDesc}
      canonical="https://icd-v3-vercel.vercel.app/projects"
      robots={meta.metaRobotsNoindex}
      googlebot={meta.metaRobotsNofollow}
      openGraph={{
        url: 'https://icd-v3-vercel.vercel.app/projects',
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
      }} /><Head>
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.seo.title} />
        <meta name="twitter:description" content={meta.seo.metaDesc} />
        <meta name="twitter:url" content="https://icd-v3-vercel.vercel.app/projects" />
        <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
        {/* end of Twitter Cards */}
      </Head><>
        <section className={`${project.projects__page} mT__260 page__header `}>
          <div className="container page__header--container">
            <div className="row">
              <div className="col-12 col-md-4 page__header--title">
                <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{meta.title}</h1></div>
              </div>
              <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                <a className={ all ? "project__filter marginRight filter__active" : "project__filter marginRight" } onClick={ FilterByAll } >all</a>
                <a className={ category ? "project__filter  filter__active" : "project__filter " } onClick={ FilterByType } >category</a>
              </div>
            </div>
            <span className="bottom__border"></span>
          </div>
        </section>
        {all === true && (
          <>
          <All edges={edges}/>
          </>
        )}
        {category === true &&
          <>
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
          }
      </></>
    )
  }