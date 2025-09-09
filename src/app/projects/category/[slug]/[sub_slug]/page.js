// app/projects/category/[slug]/[sub_slug]/page.tsx
"use client";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProjectSubTypes,
  getProjectByTypes,
  getFooter,
  getFilters,
  getLatestProject,
} from "@/lib/api";

import All from "@/components/project-categories/all/all";
import style from "@/components/project/category.module.scss";

export default async function SubProjectPage({ params }) {
  const gProject = await getProjectByTypes(params.slug);
  const subTypeProjects = await getProjectSubTypes(
    params.slug,
    params.sub_slug
  );
  const latestProject = await getLatestProject();
  await getFooter();
  await getFilters();

  const pageData = gProject?.projectTypes?.edges?.[0]?.node;
  if (!pageData) return notFound();

  const projectSubTypes = pageData?.children?.edges || [];
  const edges =
    subTypeProjects?.projectTypes?.edges?.[0]?.node?.children?.edges?.[0]?.node
      ?.projects?.edges || [];

  return (
    <>
      <section className={`${style.project_type_cont} mT__260 page__header`}>
        <div className="container page__header--container">
          <div className="row">
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={() => history.back()}>
                <span className={`${style.backBtn} backBtn`}></span>
                <h1>{pageData.name}</h1>
              </div>
            </div>

            <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
              {/* All projects link */}
              {projectSubTypes.length > 0 && (
                <Link
                  href={`/projects/category/${pageData?.slug}`}
                  className="project__filter marginRight"
                >
                  all
                </Link>
              )}

              {/* Subtype links */}
              {projectSubTypes.map((item) => {
                const node = item?.node;
                if (!node?.projects?.edges?.length) return null;

                const isActive = node?.slug === params.sub_slug;
                return (
                  <Link
                    key={node.slug}
                    href={`/projects/category/${pageData?.slug}/${node.slug}`}
                    className={
                      isActive
                        ? `${style.project__filter} project__filter marginRight ${style.filter__active} ${style.active}`
                        : "project__filter marginRight"
                    }
                  >
                    {node.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>
      </section>

      {/* Projects list */}
      {edges.length > 0 && <All edges={edges} latestProject={latestProject} />}
    </>
  );
}
