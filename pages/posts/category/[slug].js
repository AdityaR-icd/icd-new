import { NextSeo } from 'next-seo';
import { useState } from 'react'
import dynamic from "next/dynamic";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAllPostsByCategorySlug, getPostPage, getPostCategories, getAllTags, getAllPostsByCategory, getFooter, getFilters } from '../../../lib/api'
import Link from 'next/link'
import $ from 'jquery'
const Head = dynamic(() => import('next/head'));
const PostItem = dynamic(() => import('../../../components/posts-items/posts-items'))


import style from '../../../components/posts/posts.module.scss'
import categoryStyle from '../../../components/project/category.module.scss'


export default function posts({ posts, meta, categories, tags }) {


    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }


    const metaData = meta.pages?.edges[0].node
    const backButton = () => {
        window.history.back();
    }

    const [seeAll, setseeAll] = useState(true)
    const [seetag, setTag] = useState('')


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

    const [searchValue, setsearchValue] = useState('')
    const [search, setSearch] = useState('')

    // const handleSubmit = async (evt) => {
    //     evt.preventDefault();
    //     setSearch(await getSearchPostsByCategory ( router.query.slug , searchValue))

    //     $('.allPosts').addClass('d-none')
    // }

    const sideScroll = (direction, speed, distance, step) => {
        var element = document.getElementById('tags-id'), scrollAmount = 0;
        var slideTimer = setInterval(function () {
            if (direction == 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                window.clearInterval(slideTimer);
            }
        }, speed);
    }



    const shuffleItems = ({ name, original }) => {
        setseeAll(false)
        setTag(original)
        var class_name = '.' + name;
        $('.tags-menu li').removeClass(style.active);
        $('.tags-menu').find(class_name).addClass(style.active);
    }


    useEffect(() => {
        if (router.query.slug === 'deep-design') {
            $('.tags-cont').addClass('d-block');
        } else {
            $('.tags-cont').removeClass('d-block');
        }

        router.events.on("routeChangeComplete", (url) => {
            setseeAll(true)
        })

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




    var post = posts.edges[0]?.node?.posts?.edges


    var category = categories?.categories.edges;
    var common = <Link href={`/posts`} className={`${categoryStyle.project__filter} project__filter marginRight `}>all</Link>

    var slug = category?.map((item) => {
        if (item?.node?.slug == router.query.slug) {
            var activeClass = `${categoryStyle.project__filter} ${style.project__filter} project__filter marginRight ${categoryStyle.active}`
        }
        else {
            activeClass = `project__filter ${style.project__filter}`
        }
        return (
            <>
                <Link href={`/posts/category/${item?.node?.slug}`} key={item?.node.id} className={activeClass}>  {item?.node?.name} </Link>
            </>
        )
    })

    return <>
        {mounted && (<>
            <NextSeo
                title={metaData.seo.title}
                description={metaData.seo.metaDesc}
                canonical={`https://www.icdindia.com/posts/category/${router.query.slug}`}
                robots={metaData.metaRobotsNoindex}
                googlebot={metaData.metaRobotsNofollow}
                openGraph={{
                    url: `https://www.icdindia.com/posts/category/${router.query.slug}`,
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
                }} />
            <Head>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaData.seo.title} />
                <meta name="twitter:description" content={metaData.seo.metaDesc} />
                <meta name="twitter:url" content={`https://www.icdindia.com/posts/category/${router.query.slug}`} />
                <meta name="twitter:image" content={metaData.featuredImage?.node.sourceUrl} />
            </Head>

            <section className={`${style.posts__page} mT__260 page__header posts__page `}>
                <div className="container page__header--container">
                    <div className="row">
                        <div className="col-12 col-md-4  page__header--title">
                            <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{metaData.title}</h1></div>
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
                <div className={`container ${style.page__header__subNav}`}>
                    <div className="row">
                        <div className="col-12">
                            <div className={` tags-cont ${style.tags_cont} d-none`}>
                                <span className={` ${style.left_arrow} d-none d-lg-block`} onClick={() => sideScroll('left', 5, 220, 10)}></span>
                                <ul className="tags-menu" id="tags-id">
                                    {tags.edges.map(({ node }) => {
                                        var name = node.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                        var original = node.name;
                                        return (
                                            <li className={name} onClick={() => shuffleItems({ name, original })} ><span className="filterHash">#</span>{node.name}</li>
                                        )
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
                        {post.map(({ node }) => (

                            <>
                                {seeAll && (
                                    <PostItem data={node} ids={node.id} />
                                )}
                                {(
                                    node.tags.edges?.map((item) => {
                                        return (
                                            <>
                                                {!seeAll && (
                                                    <>
                                                        {seetag == item?.node.name && (

                                                            <PostItem data={node} ids={node.id} />
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )
                                    })
                                )}
                            </>
                        ))}
                    </div>
                </div>

                {(

                    <>
                        {search && (
                            <>
                                <div className="container">
                                    <div className="row infinite-grid">
                                        {search.edges[0]?.node?.posts?.edges.map(({ node }) => (
                                            <PostItem data={node} ids={node.id} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
        </>)}
    </>
        ;
}

export async function getStaticProps({ params }) {
    // const menus = await getMenus()
    const data = await getFooter()
    const meta = await getPostPage()
    const categories = await getPostCategories()
    const posts = await getAllPostsByCategorySlug(params.slug)
    const tags = await getAllTags()
    const filters = await getFilters()
    return {
        props: {
            // menus,
            data,
            meta,
            posts,
            categories,
            tags,
            filters
        },
        revalidate: 3600,
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsByCategory()
    return {
        paths: allPosts.edges.map(({ node }) => `/posts/category/${node.slug}`) || [],
        fallback: true,
    }
}