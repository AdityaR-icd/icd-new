"use client";

import Link from "next/link";
import All from "@/components/project-categories/all/all";
import style from "@/components/project/category.module.scss";
import { useParams } from "next/navigation";

export default function ProjectSubCategoryPage({
  pageData,
  projectSubTypes,
  edges,
  latestProject,
}) {
  const params = useParams();
  const { sub_slug } = params;
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
                  prefetch={true}
                  className="project__filter marginRight"
                >
                  all
                </Link>
              )}

              {/* Subtype links */}
              {projectSubTypes.map((item) => {
                const node = item?.node;
                if (!node?.projects?.edges?.length) return null;

                const isActive = node?.slug === sub_slug;
                return (
                  <Link
                    key={node.slug}
                    href={`/projects/category/${pageData?.slug}/${node.slug}`}
                    className={
                      isActive
                        ? `${style.project__filter} project__filter marginRight ${style.filter__active} ${style.active}`
                        : "project__filter marginRight"
                    }
                    prefetch={true}
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
