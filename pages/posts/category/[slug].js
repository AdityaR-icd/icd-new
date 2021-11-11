import { NextSeo } from 'next-seo';
import { useState } from 'react'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { getAllPostsByCategorySlug , getPostPage , getPostCategories  , getAllPostsByCategory , getMenus , getFooter} from '../../../lib/api'
import Link from 'next/link'
import $ from 'jquery'
const Head = dynamic(() => import('next/head'));
const PostItem = dynamic(() => import('../../../components/posts-items/posts-items'))


import style from '../../../components/posts/posts.module.scss'
import categoryStyle from '../../../components/project/category.module.scss'


export default function posts({posts , meta , categories }){
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const metaData = meta.pages?.edges[0].node
    const backButton = () => {
        window.history.back();
    }

    const [seeAll, setseeAll] = useState(false)
    const seeAllProject  = () => {
        setseeAll(true)
    }

    const postsearch = () => {
        $('.posts__page').toggleClass(style.post_search__open);
        if($('.posts__page').hasClass(style.post_search__open)){
            $('.sb-search-input').focus();
        } else {
            $('.sb-search-input').val('');
        }
    }



    var posts = posts.edges[0]?.node?.posts?.edges
    

    var category = categories?.categories.edges;
    var common = <a href={`/posts`}className={ `${categoryStyle.project__filter} project__filter marginRight `} onClick={seeAllProject} >all</a>
    
    var slug = category?.map((item) => {      
        if(item?.node?.slug == router.query.slug){
            var activeClass = `${categoryStyle.project__filter} ${style.project__filter} project__filter marginRight ${categoryStyle.active}`
        }
        else{
            activeClass = `project__filter ${style.project__filter}`
        }
        return (
        <>
            <>
            <Link href={`/posts/category/${item?.node?.slug}`} key={item?.node.id}> 
                <a className={activeClass}>{item?.node?.name}</a>
            </Link>
            </>
        </>
        )
    })

    return(
        <>
        <NextSeo
            title={metaData.seo.title}
            description={metaData.seo.metaDesc}
            canonical={`https://icd-v3-vercel.vercel.app/posts/category/${router.query.slug}`}
            robots={metaData.metaRobotsNoindex}
            googlebot={metaData.metaRobotsNofollow}
            openGraph={{
            url: `https://icd-v3-vercel.vercel.app/posts/category/${router.query.slug}`,
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
            <meta name="twitter:url" content={`https://icd-v3-vercel.vercel.app/posts/category/${router.query.slug}`} />
            <meta name="twitter:image" content={metaData.featuredImage?.node.sourceUrl} />
            </Head>

            <section className={`${style.posts__page} mT__260 page__header posts__page `}>
                <div className="container page__header--container">
                    <div className="row">
                    <div className="col-12 col-md-3 col-lg-3 page__header--title">
                        <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{metaData.title}</h1></div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 page__header--nav bottom__align nav__subPage tags-menu category-names">
                        <div className={style.filter_menu_cont}>
                            {common}
                            {slug}
                        </div>
                        <div id="sb-search" className={style.sb_search}>
                            <input className={` sb-search-input ${style.sb_search_input}`} placeholder="Type a term to search" type="search" name="post-search" id="postsearch" autoComplete="off"/>
                            <span className={`${style.sb_icon_search} ${style.magic_icon_search}`} onClick={ () => postsearch() }></span>
                        </div>
                    </div>
                    </div>
                    <span className="bottom__border"></span>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row infinite-grid">
                        {posts.map(({ node }) => (
                            <PostItem data={node} key={node.id} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticProps({ params }) {
    const menus = await getMenus()
    const data = await getFooter()
    const meta = await getPostPage()
    const categories = await getPostCategories()
    const gPosts = await getAllPostsByCategorySlug(params.slug)
    return {
    props: { 
        menus,
        data,
        meta,
        posts: gPosts,
        categories
    },
    revalidate: 1, 
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsByCategory() 
    return {
        paths: allPosts.edges.map(({ node }) => `/posts/category/${node.slug}`) || [] ,
        fallback: true,
    }
}