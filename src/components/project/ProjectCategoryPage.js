"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import style from "../../components/project/category.module.scss";
import Intro from "../../components/intro-text/intro-text";
import All from "../../components/project-categories/all/all";

export default function ProjectCategoryPage({ project, latestProject }) {
  const pathname = usePathname();
  const [allProject, setAllProject] = useState(true);

  const pageData = project?.edges?.[0]?.node;
  const projectSubTypes = pageData?.children?.edges;
  const projects = pageData?.projects?.edges;

  const backButton = () => window.history.back();

  const common = (
    <a
      className={`${style.project__filter} project__filter marginRight ${allProject ? style.active : ""}`}
      onClick={() => setAllProject(true)}
    >
      all
    </a>
  );

  const slug = projectSubTypes?.map(
    (item, index) =>
      item?.node?.projects?.edges.length > 0 && (
        <Link
          href={`/projects/category/${pageData?.slug}/${item?.node?.slug}`}
          className={`${style.project__filter} project__filter marginRight ${!allProject ? style.active : ""}`}
          key={`${index}-project-category`}
          prefetch={true}
        >
          {item?.node?.name}
        </Link>
      )
  );

  if (!pageData) return null;

  return (
    <>
      <section className={`${style.project_type_cont} mT__260 page__header`}>
        <div className="container page__header--container">
          <div className="row">
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={backButton}>
                <span className={`${style.backBtn} backBtn`}></span>
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
