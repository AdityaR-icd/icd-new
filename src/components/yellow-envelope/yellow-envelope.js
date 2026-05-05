"use client";

import { useRef } from "react";
import parse from "html-react-parser";
import Link from "next/link";

import style from "../posts/posts.module.scss";

export default function YellowEnvelop({ meta, edges }) {
  const sectionRef = useRef(null);
  const inputRef = useRef(null);

  const backButton = () => window.history.back();

  const postsearch = () => {
    const isOpen = sectionRef.current?.classList.toggle(style.post_search__open);
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

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
                <h1>{meta.title}</h1>
              </div>
            </div>
            <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage tags-menu category-names">
              <div className={style.filter_menu_cont}></div>
              <div id="sb-search" className={style.sb_search}>
                <input
                  ref={inputRef}
                  className={`sb-search-input ${style.sb_search_input}`}
                  placeholder="Type a term to search"
                  type="search"
                  name="post-search"
                  id="postsearch"
                  autoComplete="off"
                />
                <span
                  className={`${style.sb_icon_search} ${style.magic_icon_search}`}
                  onClick={postsearch}
                ></span>
              </div>
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row infinite-grid">
            {edges.map(({ node }) => {
              const date = new Date(node.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              const htmlString = node?.content ?? "";
              const content = htmlString
                ? htmlString.replace(/<[^>]+>/g, " ").substring(0, 500)
                : "....";

              return (
                <div className="col-md-4 col-lg- grid-item" key={node.id}>
                  <div className={`${style.postsItems} animateItems`}>
                    <Link href={`/yellow-envelope/${node.slug}`} prefetch={true}>
                      <h2 className={style.postTitle}>{node.title}</h2>
                      <span className={style.postBy}> {date} </span>
                      <div className={style.postInfo}>
                        <p>{parse(content)}</p>
                      </div>
                    </Link>
                    <div className="row">
                      <div className="col-6">
                        <Link href={`/yellow-envelope/${node.slug}`} prefetch={true}>
                          <button>read letter</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
