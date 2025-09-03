"use client";

import Head from "next/head";
import Link from "next/link";
// import { NextSeo } from 'next-seo';
import { usePathname } from "next/navigation";
import { useState } from "react";

import style from "../../components/project/category.module.scss";
import ogimage from "../../assets/images/seo/og-default.png";

import Intro from "../../components/intro-text/intro-text";
import All from "../../components/project-categories/all/all";
// import { NextSeo } from 'next-seo';

export default function ProjectCategoryPage({ project, latestProject }) {
  const pathname = usePathname();
  const [allProject, setAllProject] = useState(true);

  const pageData = project?.edges[0].node;
  const projectSubTypes = pageData?.children?.edges;
  const projects = pageData?.projects?.edges;
  const seo = pageData?.seo;

  const backButton = () => {
    window.history.back();
  };

  const slugFromPath = pathname.split("/").pop();

  const common = (
    <a
      className={`${style.project__filter} project__filter marginRight ${
        allProject ? style.active : ""
      }`}
      onClick={() => setAllProject(true)}
    >
      all
    </a>
  );

  const slug = projectSubTypes?.map(
    (item) =>
      item?.node?.projects?.edges.length > 0 && (
        <Link
          href={`/projects/category/${pageData?.slug}/${item?.node?.slug}`}
          className={`${style.project__filter} project__filter marginRight ${
            !allProject ? style.active : ""
          }`}
          key={item.node.id}
        >
          {item?.node?.name}
        </Link>
      )
  );

  return (
    <>
      {/* <NextSeo
        title={`${pageData.name} | Itu Chaudhuri Design`}
        description={seo.metaDesc}
        canonical={`https://www.icdindia.com${pathname}`}
        openGraph={{
          url: `https://www.icdindia.com${pathname}`,
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
      /> */}
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.name} />
        <meta name="twitter:description" content={seo.opengraphDescription} />
        <meta
          name="twitter:url"
          content={`https://www.icdindia.com${pathname}`}
        />
        <meta name="twitter:image" content={ogimage.src} />
      </Head>
      <section className={`${style.project_type_cont} mT__260 page__header `}>
        <div className="container page__header--container">
          <div className="row">
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={backButton}>
                <span className={` ${style.backBtn} backBtn`}></span>
                <h1>{pageData.name}</h1>
              </div>
            </div>
            <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
              {common}
              {slug}
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>
      </section>

      {allProject && (
        <>
          <Intro description={pageData.description} />
          <All edges={projects} latestProject={latestProject} />
        </>
      )}
    </>
  );
}
