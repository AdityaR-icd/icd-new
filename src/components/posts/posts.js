"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PostItem from "../posts-items/posts-items";

import style from "./posts.module.scss";
import categoryStyle from "../project/category.module.scss";

export default function Posts({ meta, categories, edges }) {
  const router = useRouter();
  const sectionRef = useRef(null);
  const inputRef = useRef(null);

  const [filter, setFilter] = useState("");
  const [seeAll, setSeeAll] = useState(true);

  const backButton = () => window.history.back();

  const postsearch = () => {
    const isOpen = sectionRef.current?.classList.toggle(style.post_search__open);
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setFilter("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const filteredEdges = filter
    ? edges.filter(({ node }) =>
        (node.title + " " + (node.content ?? "")).toLowerCase().includes(filter.toLowerCase())
      )
    : edges;

  const category = categories?.categories?.edges;

  const common = (
    <Link
      href="/posts" prefetch={true}
      className={`${categoryStyle.project__filter} project__filter marginRight ${categoryStyle.active}`}
      onClick={() => setSeeAll(true)}
    >
      all
    </Link>
  );

  const slug = category?.map((item) => {
    const activeClass =
      item?.node?.slug === router?.query?.slug
        ? `${categoryStyle.project__filter} project__filter marginRight ${categoryStyle.filter__active}`
        : `project__filter ${style.project__filter}`;

    return (
      <Link
        href={`/posts/category/${item?.node?.slug}`} prefetch={true}
        key={item?.node?.id}
        className={activeClass}
      >
        {item?.node?.name}
      </Link>
    );
  });

  return (
    <>
      <section
        ref={sectionRef}
        className={`${style.posts__page} mT__260 page__header posts__page`}
      >
        <div className="container page__header--container">
          <div className="row">
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={backButton}>
                <span className="backBtn"></span>
                <h1>{meta?.title}</h1>
              </div>
            </div>
            <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage tags-menu category-names">
              <div className={style.filter_menu_cont}>
                {common}
                {slug}
              </div>
              <div id="sb-search" className={style.sb_search}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    ref={inputRef}
                    className={`sb-search-input ${style.sb_search_input}`}
                    placeholder="Type a term to search"
                    onChange={(e) => setFilter(e.target.value)}
                    type="search"
                    name="post-search"
                    id="postsearch"
                    autoComplete="off"
                  />
                  <span
                    className={`${style.sb_icon_search} ${style.magic_icon_search}`}
                    onClick={postsearch}
                  ></span>
                </form>
              </div>
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>
      </section>

      <section>
        <div className="container allPosts">
          <div className="row infinite-grid">
            {filteredEdges.map(({ node }) => (
              <PostItem data={node} ids={node?.id} key={"posts-" + node?.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
