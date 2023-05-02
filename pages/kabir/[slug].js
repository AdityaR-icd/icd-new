import parse from 'html-react-parser';
import { getAllkabirWithSlug, kabirArticle, getFooter} from '../../lib/api'
import $ from 'jquery';
import Image from "next/image";
import { useEffect } from 'react'
import Share from '../../assets/images/post-buttons/share.svg'
import Icon from '../../assets/images/logo/kabir.png'

import style from '../../styles/singlePost.module.scss'

import dynamic from "next/dynamic";
const Like = dynamic(() => import("../../components/like"));
const Seo = dynamic(() => import("../../components/seo"));


export default function kabir({ kabir, data }) {
    useEffect(() => {
        document.body.classList.add(style.bg_yellow);
        document.body.classList.add('bg-yellow');
    });

    const seo = kabir ? (kabir?.seo ?? {}) : ({});
    const uri = kabir ? (kabir?.uri ?? {}) : ({});

    var featuredImage = kabir?.featuredImage?.node?.sourceUrl
    const toBase64 = (str) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)

    const toggleShareIcons = () => {
        $('.share-icon').toggleClass('icons-hide');
    }

    var date = new Date(kabir?.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });


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


    if (featuredImage) {
        var imageData =
            <div className={` ${style.leadImage} fade-in `}>
                <Image
                    src={featuredImage}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                    className="full-lead-img"
                    alt="post-lead"
                    fill
                    sizes="100vw" />
            </div>
    } else {
        imageData =
            <div className={style.leadImage}>

            </div>
    }

    return (
        <>
            <Seo seo={seo} uri={uri} />
            <section className={`${style.singlePost} mT__260`} key={kabir?.id}>
                <div className="images-loaded-container">
                    {imageData}
                </div>
                <div className={style.postContent_cont}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <div className={style.posts__container}>
                                    <div className={style.post__tag}>
                                        {/* <span className={style.yellow__tag}> { categories }  </span> */}
                                        <span className={style.yellow__tag}>  </span>
                                    </div>
                                    <h1>{kabir?.title}</h1>
                                    <div className={style.post__author}>
                                        <span className="author__img"><img alt='icd-icon' loading="lazy" decoding="async" src={Icon.src} ></img></span>
                                        <span className="post-detail">kabir / {date} </span>
                                        <div className={` ${style.social__media} ${style.header_socialmedia} ${style.header_socialmedia_mobile} social__media d-block d-lg-none `}>
                                            <Like count={kabir?.likes?.likes} id={kabir?.id} type={'kabir'} />
                                            <span className="icon share-icon icons-hide"><a href={data?.linkedin} className="linkedin-icon" target="_blank"></a></span>
                                            <span className="icon share-icon icons-hide"><a href={data?.twitter} className="twitter-icon" target="_blank"></a></span>
                                            <span className="icon share-icon icons-hide"><a href={data?.facebook} className="fb-icon" target="_blank"></a></span>
                                            <span className="icon" onClick={toggleShareIcons}><img loading="lazy" alt='icd-icon' decoding="async" src={Share.src} width="20" height="20" className="icon-img shareIcon--main" />share</span>
                                        </div>
                                    </div>
                                    <div className={`${style.postContent} postContent`}>

                                        {kabir?.content && (
                                            <>
                                                {parse(kabir?.content)}
                                            </>
                                        )}

                                    </div>
                                </div>
                                <div className={` ${style.social__media} social__media `}>
                                    <span className="icon share-icon icons-hide"><a href={data?.linkedin} className="linkedin-icon" target="_blank"></a></span>
                                    <span className="icon share-icon icons-hide"><a href={data?.twitter} className="twitter-icon" target="_blank"></a></span>
                                    <span className="icon share-icon icons-hide"><a href={data?.facebook} className="fb-icon" target="_blank"></a></span>
                                    <span className="icon" onClick={toggleShareIcons}><img loading="lazy" alt='icd-icon' decoding="async" src={Share.src} width="20" height="20" className="icon-img shareIcon--main" />share</span>
                                    <Like count={kabir?.likes?.likes} id={kabir?.id} type={'kabir'} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const article = await kabirArticle(params.slug)
    // const menus = await getMenus()
    const data = await getFooter()
    // const filters = await getFilters()
    return {
        props: {
            kabir: article.kabir,
            // menus,
            data
            // filters
        },
        //   revalidate: 180, 
    }
}

// export async function getStaticPaths() {
//     const allnewsletters = await getAllkabirWithSlug()
//     return {
//       paths: allnewsletters.edges.map(({ node }) => `/kabir/${node.slug}`) || [],
//       fallback: true,
//     }  
// }