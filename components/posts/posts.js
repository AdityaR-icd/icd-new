import { NextSeo } from 'next-seo';
import dynamic from "next/dynamic";
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
const Head = dynamic(() => import('next/head'));
const PostItem = dynamic(() => import('../posts-items/posts-items'))
import $ from 'jquery';


import style from './posts.module.scss'
import categoryStyle from '../project/category.module.scss'


export default function posts({ meta, categories, edges }) {
    const router = useRouter()

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    const backButton = () => {
        window.history.back();
    }

    const [seeAll, setseeAll] = useState(true)
    const seeAllProject = () => {
        setseeAll(false)
    }

    const [searchValue, setsearchValue] = useState('')
    //  const [search, setSearch] = useState('')

    const postsearch = () => {
        $('.posts__page').toggleClass(style.post_search__open);
        if ($('.posts__page').hasClass(style.post_search__open)) {
            $('.sb-search-input').focus();
        } else {
            $('.infinite-grid .grid-item').show();
            $('.sb-search-input').val('');
            $('.allPosts').removeClass('d-none')
        }
    }


    // const handleSubmit = async (evt) => {
    //     evt.preventDefault();
    //     setSearch(await getSearchPosts (searchValue))

    //     $('.allPosts').addClass('d-none')
    // }


    useEffect(() => {

        $(document).ready(function () {
            $("#postsearch").keyup(function () {

                // Retrieve the input field text and reset the count to zero
                var filter = $(this).val(), count = 0;

                // Loop through the comment list
                $(".infinite-grid .grid-item").each(function () {

                    // If the list item does not contain the text phrase fade it out
                    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                        $(this).fadeOut();

                        // Show the list item if the phrase matches and increase the count by 1
                    } else {
                        $(this).show();
                        count++;
                    }
                });
            });
        });
    });

    var category = categories?.categories?.edges;
    var common = <Link href={`/posts`} className={`${categoryStyle.project__filter} project__filter marginRight ${categoryStyle.active}`} onClick={seeAllProject} >all</Link>

    var slug = category?.map((item) => {
        if (item?.node?.slug == router?.query?.slug) {
            var activeClass = `${categoryStyle.project__filter} project__filter marginRight ${categoryStyle.filter__active}`
        }
        else {
            activeClass = `project__filter ${style.project__filter}`
        }

        return <>
            <>
                <Link href={`/posts/category/${item?.node?.slug}`} key={item?.node?.id} className={activeClass}>  {item?.node?.name} </Link>
            </>
        </>
    })

    return (
        <>
            {mounted && (
                <>
                    <NextSeo
                        title={meta?.seo?.title}
                        description={meta?.seo?.metaDesc}
                        canonical="https://www.icdindia.com/posts"
                        robots={meta?.metaRobotsNoindex}
                        googlebot={meta?.metaRobotsNofollow}
                        openGraph={{
                            url: 'https://www.icdindia.com/posts',
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
                        <meta name="twitter:description" content={meta?.seo?.metaDesc} />
                        <meta name="twitter:url" content="https://www.icdindia.com/posts" />
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
                                        {common}
                                        {slug}
                                    </div>
                                    <div id="sb-search" className={style.sb_search}>
                                        <form>
                                            <input className={` sb-search-input ${style.sb_search_input}`} placeholder="Type a term to search" onChange={(e) => setsearchValue(e.target.value)} type="search" name="post-search" id="postsearch" autoComplete="off" />
                                            <span className={`${style.sb_icon_search} ${style.magic_icon_search}`} onClick={postsearch}></span>
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
                                {edges.map(({ node }) => (
                                    <PostItem data={node} ids={node?.id} />
                                ))}
                            </div>
                        </div>

                        {/* {(

                            <>
                                {search  && (
                                    <>
                                    <div className="container">
                                        <div className="row infinite-grid">
                                        {search.edges.map(({ node }) => (
                                            <PostItem data={node} ids={node.id} />
                                        ))}
                                        </div>
                                    </div>
                                    </>
                                )}
                            </>
                        )} */}
                    </section>
                </>
            )}
        </>
    )
}

