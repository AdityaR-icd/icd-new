"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import carousel from "@/components/project-categories/all/all.module.scss";
import type from "@/components/project-categories/type/type.module.scss";
import style from "@/styles/singlePost.module.scss";

export default function SearchResults({ slug, filter, latestProject }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/search")) {
      document.body.classList.add("search-page", "showSearch", "ignore-react-onclickoutside");
      return () => {
        document.body.classList.remove("search-page", "showSearch", "ignore-react-onclickoutside");
      };
    }
  }, [pathname]);

  let clients = [];
  let industry = [];
  let projectTypes = [];
  let keyword = [];
  let projects = [];
  let posts = [];
  let categories = [];
  let tags = [];

  if (filter?.clients?.edges?.length) {
    const clientsprojects = filter?.clients?.edges[0]?.node?.projects;
    if (clientsprojects?.edges?.length) clients = clientsprojects.edges.map(({ node }) => node);
  }
  if (filter?.industries?.edges?.length) {
    const industriesprojects = filter?.industries?.edges[0]?.node?.projects;
    if (industriesprojects?.edges?.length) industry = industriesprojects.edges.map(({ node }) => node);
  }
  if (filter?.projectTypes?.edges?.length) {
    const projectSubTypesprojects = filter?.projectTypes?.edges[0]?.node?.projects;
    if (projectSubTypesprojects?.edges?.length) projectTypes = projectSubTypesprojects.edges.map(({ node }) => node);
  }
  if (filter?.keywords?.edges?.length) {
    const keywordsprojects = filter?.keywords?.edges[0]?.node?.projects;
    if (keywordsprojects?.edges?.length) keyword = keywordsprojects.edges.map(({ node }) => node);
  }
  if (filter?.categories?.edges?.length) {
    const postsCat = filter?.categories?.edges[0]?.node?.posts;
    if (postsCat?.edges?.length) categories = postsCat.edges.map((data) => data);
  }
  if (filter?.tags?.edges?.length) {
    const poststags = filter?.tags?.edges[0]?.node?.posts;
    if (poststags?.edges?.length) tags = poststags.edges.map((data) => data);
  }
  if (filter?.projects?.edges?.length) projects = filter?.projects.edges.map(({ node }) => node);
  if (filter?.posts?.edges?.length) posts = filter?.posts.edges.map((data) => data);

  const Allprojects = [...new Set([...clients, ...industry, ...projectTypes, ...keyword, ...categories, ...projects])];
  const allposts = [...new Set([...categories, ...tags, ...posts])];

  const uniqueProjects = Array.from(new Set(Allprojects.map((a) => a.id))).map(
    (id) => Allprojects.find((a) => a.id === id)
  );
  const uniquePosts = Array.from(new Set(allposts.map((a) => a?.node?.id))).map(
    (id) => allposts.find((a) => a?.node?.id === id)
  );

  const resultCount = uniqueProjects.length + uniquePosts.length;
  const resultText = resultCount > 0 ? `${resultCount} results` : "no results found";

  const latestIds = latestProject?.edges?.map(({ node }) => node.id) ?? [];

  return (
    <section className="search-results-cont">
      <div className="container">
        <div className="row">
          <div className="col-12 page__header--title">
            <div className={slug}>
              <div className="back-cta" onClick={() => window.history.back()}>
                <span className="backBtn"></span>
                <h1>{resultText}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {uniqueProjects
            .sort((a, b) => new Date(b?.date) - new Date(a?.date))
            .map((node) => {
              const leadImgSrc = node?.featuredImage?.node?.sourceUrl;
              const newtag = latestIds.includes(node?.id) ? (
                <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
              ) : null;

              return (
                <div className="col-md-4 project__item resultItem-cont" key={node.id}>
                  <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                    <div className={carousel.thumbnail_cont}>
                      <Link href={`/projects/${node.slug}`} prefetch={true}>
                        <span className={`${carousel.projectThumbnail} fade-in`} style={{ width: "100%" }}>
                          <div className={`${carousel.full_thumb} full-thumb`}>
                            {leadImgSrc && (
                              <div className={carousel.project_lead} style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                                <Image
                                  src={leadImgSrc}
                                  alt={node?.projectComponent?.heading || "project"}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            )}
                          </div>
                          <span className="thumbnail-gif"></span>
                        </span>
                        {node?.projectComponent?.awardsReceived !== null && (
                          <span className={`${carousel.project__tag} project__tag`}>winner</span>
                        )}
                        {newtag}
                      </Link>
                    </div>
                    <Link href={`/projects/${node.slug}`} prefetch={true}>
                      <span className={carousel.projectTitle}>
                        {node.projectComponent?.heading}
                        <span className={carousel.grey__color}> / {node?.clients?.edges[0]?.node?.name}</span>
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}

          {uniquePosts
            .sort((a, b) => new Date(b?.date) - new Date(a?.date))
            .map((data) => {
              const categories = data?.node?.categories.edges[0]?.node?.name;
              const featuredImage = data?.node?.featuredImage?.node?.sourceUrl;

              return (
                <div className="col-md-4 project__item resultItem-cont" key={data.node.id}>
                  <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                    <div className={carousel.thumbnail_cont}>
                      <Link href={`/posts/${data.node.slug}`} prefetch={true}>
                        <span className={`${carousel.projectThumbnail} fade-in`} style={{ width: "100%" }}>
                          {featuredImage ? (
                            <span className={`${carousel.full_thumb} full-thumb`} style={{ position: "relative", display: "block", aspectRatio: "16/9" }}>
                              <Image
                                src={featuredImage}
                                alt={data.node.title || "post"}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: "cover" }}
                              />
                            </span>
                          ) : (
                            <span className={`${carousel.full_thumb} full-thumb`}></span>
                          )}
                        </span>
                        <span className="postCategory">{categories}</span>
                      </Link>
                    </div>
                    <Link href={`/posts/${data.node.slug}`} prefetch={true}>
                      <span className={carousel.projectTitle}>{data.node.title}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
