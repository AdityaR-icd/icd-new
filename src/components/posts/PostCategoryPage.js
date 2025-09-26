"use client";

import { useState, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PostItem from "../posts-items/posts-items";

import style from "../posts/posts.module.scss";
import categoryStyle from "../project/category.module.scss";

// Helper to slugify tag names
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function PostCategoryPage({ posts, meta, categories, tags }) {
  const pathname = usePathname();
  const slugFromPath = pathname.split("/").pop();

  const [seeAll, setSeeAll] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const tagsContainerRef = useRef(null);

  const metaData = meta.pages?.edges[0]?.node;
  const allPosts = posts.edges[0]?.node?.posts?.edges || [];

  // Filter posts by search
  const filteredPosts = useMemo(() => {
    if (!searchValue) return allPosts;
    return allPosts.filter((post) =>
      post.node.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, allPosts]);

  const handleTagClick = (tagName) => {
    setSeeAll(false);
    setSelectedTag(tagName);
  };

  const sideScroll = (direction, speed, distance, step) => {
    const element = tagsContainerRef.current;
    if (!element) return;
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += direction === "left" ? -step : step;
      scrollAmount += step;
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const visiblePosts = seeAll
    ? filteredPosts
    : filteredPosts.filter((post) =>
        post.node.tags.edges.some((t) => t.node.name === selectedTag)
      );

  return (
    <>
      {/* Header Section */}
      <section
        className={`${style.posts__page} mT__260 page__header posts__page ${
          showSearch ? style.post_search__open : ""
        }`}
      >
        <div className="container page__header--container">
          <div className="row">
            {/* Back & Title */}
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={() => window.history.back()}>
                <span className="backBtn"></span>
                <h1>{metaData?.title}</h1>
              </div>
            </div>

            {/* Categories & Search */}
            <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage tags-menu category-names">
              <div className={style.filter_menu_cont}>
                <Link
                  href="/posts"
                  className={`${categoryStyle.project__filter} project__filter marginRight`}
                >
                  all
                </Link>
                {categories?.categories.edges.map((item) => (
                  <Link
                    href={`/posts/category/${item.node.slug}`}
                    key={item.node.id}
                    className={`${
                      categoryStyle.project__filter
                    } project__filter marginRight ${
                      slugFromPath === item.node.slug
                        ? categoryStyle.active
                        : ""
                    }`}
                  >
                    {item.node.name}
                  </Link>
                ))}
              </div>

              <div id="sb-search" className={style.sb_search}>
                <form>
                  <input
                    className={`sb-search-input ${style.sb_search_input}`}
                    placeholder="Type a term to search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="search"
                    name="post-search"
                    autoComplete="off"
                  />
                  <span
                    className={`${style.sb_icon_search} ${style.magic_icon_search}`}
                    onClick={() => setShowSearch((prev) => !prev)}
                  ></span>
                </form>
              </div>
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>

        {/* Tags Section */}
        <div className={`container ${style.page__header__subNav}`}>
          <div className="row">
            <div className="col-12">
              <div
                className={`tags-cont ${style.tags_cont} ${
                  slugFromPath === "deep-design" ? "d-block" : "d-none"
                }`}
              >
                <span
                  className={`${style.left_arrow} d-none d-lg-block`}
                  onClick={() => sideScroll("left", 5, 220, 10)}
                />
                <ul className="tags-menu" id="tags-id" ref={tagsContainerRef}>
                  {tags.edges.map(({ node }, index) => (
                    <li
                      key={index + "post-tag"}
                      className={`${slugify(node.name)} ${
                        selectedTag === node.name ? style.active : ""
                      }`}
                      onClick={() => handleTagClick(node.name)}
                    >
                      <span className="filterHash">#</span>
                      {node.name}
                    </li>
                  ))}
                </ul>
                <span
                  className={`${style.right_arrow} d-none d-lg-block`}
                  onClick={() => sideScroll("right", 5, 220, 10)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section>
        <div className="container allPosts">
          <div className="row infinite-grid">
            {visiblePosts.map(({ node }) => (
              <PostItem key={node.id} data={node} ids={node.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
