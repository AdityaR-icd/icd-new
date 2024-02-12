import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import parse from 'html-react-parser';
import Link from 'next/link'
import Image from "next/image";
const Head = dynamic(() => import('next/head'))
const Like = dynamic(() => import("../../components/like"));

import $ from 'jquery';

import style from '../posts/posts.module.scss'
    ;
export default function kanbir({ meta, edges }) {
    // console.log(meta.)
    const router = useRouter()

    const backButton = () => {
        window.history.back();
    }

    const postsearch = () => {
        $('.posts__page').toggleClass(style.post_search__open);
        if ($('.posts__page').hasClass(style.post_search__open)) {
            $('.sb-search-input').focus();
        } else {
            $('.sb-search-input').val('');
        }
    }

    const toBase64 = (str) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)


    const shimmer = (w, h) => `
        <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient id="g">
                <stop stop-color="#f6f6f6" offset="20%" />
                <stop stop-color="#f0f0f0" offset="50%" />
                <stop stop-color="#f6f6f6" offset="70%" />
            </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#F6F6F6" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`


    var htmlString = ''
    var stripedHtml = ''
    var content = ''

    return <>
        <NextSeo
            title={meta?.seo?.title}
            description={meta?.seo?.metaDesc}
            canonical={`https://www.icdindia.com${router.pathname}`}
            robots={meta?.metaRobotsNoindex}
            googlebot={meta?.metaRobotsNofollow}
            openGraph={{
                url: `https://www.icdindia.com${router?.pathname}`,
                title: meta?.seo?.title,
                description: meta?.seo?.metaDesc,
                images: [
                    {
                        url: meta?.featuredImage?.node?.sourceUrl,
                        alt: 'homepage-image',
                        type: 'image/jpeg',
                    },
                ],
                site_name: meta?.seo?.title,
            }} />
        <Head>
            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta?.seo?.title} />
            <meta name="twitter:description" content={meta?.seo
                ?.metaDesc} />
            <meta name="twitter:url" content={`https://www.icdindia.com${router?.pathname}`} />
            <meta name="twitter:image" content={meta?.featuredImage?.node?.sourceUrl} />
            {/* end of Twitter Cards */}
        </Head>


        <section className={`${style.posts__page} mT__260 page__header posts__page `}>
            <div className="container page__header--container">
                <div className="row">
                    <div className="col-12 col-md-4 page__header--title">
                        <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{meta?.title}</h1></div>
                    </div>
                    <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage tags-menu category-names">
                        <div className={style.filter_menu_cont}>
                            {/* {common}
                        {slug} */}
                        </div>
                        <div id="sb-search" className={style.sb_search}>
                            <input className={` sb-search-input ${style.sb_search_input}`} placeholder="Type a term to search" type="search" name="post-search" id="postsearch" autoComplete="off" />
                            <span className={`${style.sb_icon_search} ${style.magic_icon_search}`} onClick={() => postsearch()}></span>
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
                        var featuredImage = node?.featuredImage?.node?.sourceUrl
                        // <FetchNewsletter data={node} key={node.id}/>
                        var date = new Date(node.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        });
                        htmlString = node?.content
                        if (htmlString) {
                            var stripedHtml = htmlString?.replace(/<[^>]+>/g, ' ');
                            var content = stripedHtml?.substr(0, 500);
                        } else {
                            content = "...."
                        }

                        if (featuredImage) {
                            var imageData =
                                <span className="postThumbnail fade-in">
                                    <Image
                                     unoptimized
                                        src={featuredImage}
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                                        alt="post-lead"
                                        layout="fill"
                                        sizes="100vw" />
                                </span>
                        } else {
                            imageData =
                                <span className="postThumbnail fade-in">

                                </span>
                        }
                        return (
                            <div className="col-md-6 col-lg-6 grid-item" key={node.id}>
                                <div className={`${style.postsItems} animateItems}`}>
                                    <Link href={`/kabir/${node.slug}`}>
                                        <div className={style.postLeadImage}>
                                            <div className="images-loaded-container">
                                                {imageData}
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href={`/kabir/${node.slug}`}>
                                        <h2 className={style.postTitle}>{node.title}</h2>
                                        <span className={style.postBy}> {date}  </span>
                                        <div className={style.postInfo}> <p> {parse(content)} </p> </div>
                                    </Link>
                                    <div className="row">
                                        <div className="col-6">
                                            <Link href={`/kabir/${node.slug}`} legacyBehavior>
                                                <button>read letter</button>
                                            </Link>
                                        </div>
                                        <div className="col-6 text-right">
                                            <Like count={node?.likes?.likes} id={node.id} type={'kabir'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    </>;
}