"use client";

import { NextSeo } from 'next-seo';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from "next/dynamic";
import Link from 'next/link';

const Head = dynamic(() => import('next/head'));
const PostItem = dynamic(() => import('../../../components/posts-items/posts-items'));

import style from '../../../components/posts/posts.module.scss';
import categoryStyle from '../../../components/project/category.module.scss';

export default function PostCategoryPage({ posts, meta, categories, tags }) {
  const pathname = usePathname();
  const [seeAll, setSeeAll] = useState(true);
  const [seetag, setTag] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const metaData = meta.pages?.edges[0].node;

  const backButton = () => {
    window.history.back();
  };

  const postsearch = () => {
    setShowSearch(!showSearch);
  };

  const sideScroll = (direction, speed, distance, step) => {
    const element = document.getElementById('tags-id');
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (direction === 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  const shuffleItems = ({ name, original }) => {
    setSeeAll(false);
    setTag(original);
  };

  const filteredPosts = posts.edges[0]?.node?.posts?.edges.filter(post =>
    post.node.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const slugFromPath = pathname.split('/').pop();

  return (<>
    <NextSeo
      title={metaData.seo.title}
      description={metaData.seo.metaDesc}
      canonical={`https://www.icdindia.com${pathname}`}
      robots={metaData.metaRobotsNoindex}
      googlebot={metaData.metaRobotsNofollow}
      openGraph={{
        url: `https://www.icdindia.com${pathname}`,
        title: metaData.seo.title,
        description: metaData.seo.metaDesc,
        images: [
          {
            url: metaData.featuredImage?.node.sourceUrl,
            alt: 'homepage-image',
            type: 'image/jpeg',
          },
        ],
        site_name: metaData.seo.title,
      }}
    />
    <Head>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaData.seo.title} />
      <meta name="twitter:description" content={metaData.seo.metaDesc} />
      <meta name="twitter:url" content={`https://www.icdindia.com${pathname}`} />
      <meta name="twitter:image" content={metaData.featuredImage?.node.sourceUrl} />
    </Head>
    <section className={`${style.posts__page} mT__260 page__header posts__page ${showSearch ? style.post_search__open : ''}`}>
      <div className="container page__header--container">
        <div className="row">
          <div className="col-12 col-md-4  page__header--title">
            <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{metaData.title}</h1></div>
          </div>
          <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage tags-menu category-names">
            <div className={style.filter_menu_cont}>
              <Link href={`/posts`} className={`${categoryStyle.project__filter} project__filter marginRight`}>all</Link>
              {categories?.categories.edges.map((item) => (
                <Link href={`/posts/category/${item?.node?.slug}`} key={item?.node.id} className={`${categoryStyle.project__filter} ${style.project__filter} project__filter marginRight ${slugFromPath === item?.node?.slug ? categoryStyle.active : ''}`}>
                  {item?.node?.name}
                </Link>
              ))}
            </div>
            <div id="sb-search" className={style.sb_search}>
              <form>
                <input className={` sb-search-input ${style.sb_search_input}`} placeholder="Type a term to search" onChange={(e) => setSearchValue(e.target.value)} type="search" name="post-search" id="postsearch" autoComplete="off" />
                <span className={`${style.sb_icon_search} ${style.magic_icon_search}`} onClick={postsearch}></span>
              </form>
            </div>
          </div>
        </div>
        <span className="bottom__border"></span>
      </div>
      <div className={`container ${style.page__header__subNav}`}>
        <div className="row">
          <div className="col-12">
            <div className={` tags-cont ${style.tags_cont} ${slugFromPath === 'deep-design' ? 'd-block' : 'd-none'}`}>
              <span className={` ${style.left_arrow} d-none d-lg-block`} onClick={() => sideScroll('left', 5, 220, 10)}></span>
              <ul className="tags-menu" id="tags-id">
                {tags.edges.map(({ node }) => {
                  const name = node.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                  const original = node.name;
                  return (
                    <li className={name} onClick={() => shuffleItems({ name, original })} key={node.id}><span className="filterHash">#</span>{node.name}</li>
                  );
                })}
              </ul>
              <span className={` ${style.right_arrow} d-none d-lg-block`} onClick={() => sideScroll('right', 5, 220, 10)}></span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container allPosts">
        <div className="row infinite-grid">
          {filteredPosts.map(({ node }) => (
            <PostItem data={node} ids={node.id} key={node.id} />
          ))}
        </div>
      </div>
    </section>
  </>);
}
