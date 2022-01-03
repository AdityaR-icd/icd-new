
import {  getFilters , getFooter , getFiltersBySlug } from '../../lib/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
const Type = dynamic(() => import("../../components/project-categories/type/type"));
const PostItem = dynamic(() => import('../../components/posts-items/posts-items'))
const Image = dynamic(() => import("next/image"));
import $ from 'jquery';
import carousel from '../../components/project-categories/all/all.module.scss'
import type from '../../components/project-categories/type/type.module.scss'
import style from '../../styles/singlePost.module.scss'
import { NextSeo } from 'next-seo';



export default function search( { filters , data , filter } ){
    const router = useRouter()

    useEffect(() => {
        if(router.pathname == "/search/[slug]"){
            $('body').addClass('search-page showSearch ignore-react-onclickoutside');
        }
    });
    const backButton = () => {
        window.history.back();
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

    var clN = 0
    if(filter?.clients?.edges != ''){
        var client = filter?.clients?.edges[0].node.name
        if(filter?.clients?.edges[0].node.projects.edges != ''){
            var clientsprojects = filter?.clients?.edges[0].node.projects
            clN = clientsprojects.edges.length
            var clientData = clientsprojects.edges.map(({node}) => {
                var leadImgSrc = node.featuredImage.node.sourceUrl
                return (
                   <>
                    <div className="col-md-4 project__item resultItem-cont" key={ node.id }>
                        <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                            <div className={carousel.thumbnail_cont}>
                                <a href={`/projects/${node.slug}`}>
                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                            <div className={`${carousel.full_thumb} full-thumb`}>
                                            {leadImgSrc &&(
                                                <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                            )} 
                                            </div>
                                            <span className="thumbnail-gif"></span>
                                    </span>
                                    {node?.projectComponent?.awardsReceived !== null  &&  (
                                        <span className={`${carousel.project__tag} project__tag`}>winner</span>
                                    )}
                                </a>
                            </div>
                            <a href={`/projects/${node.slug}`}>
                                <span className={carousel.projectTitle}>{node.projectComponent.heading}
                                    <span className={carousel.grey__color}>  / {client}</span>
                                </span>
                            </a>
                        </div>
                    </div> 
                   </> 
                )
            })
        }
    }

    var iN = 0
    if(filter?.industries?.edges != ''){
        if(filter?.industries?.edges[0].node.projects.edges != ''){
            var industriesprojects = filter?.industries?.edges[0].node.projects
            iN = industriesprojects.edges.length
            var industries = industriesprojects.edges.map(({node}) => {
                var leadImgSrc = node.featuredImage.node.sourceUrl
                var client = node.clients.edges[0].node.name
                return (
                   <>
                    <div className="col-md-4 project__item resultItem-cont" key={ node.id }>
                        <div className={`${carousel.projectCarousel} ${style.postsItems} ${type.projectCarousel}`}>
                            <div className={ `${carousel.thumbnail_cont} ${style.postLeadImage}`}>
                                <a href={`/projects/${node.slug}`}>
                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                            <div className={`${carousel.full_thumb} full-thumb`}>
                                            {leadImgSrc &&(
                                                <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                            )} 
                                            </div>
                                            <span className="thumbnail-gif"></span>
                                    </span>
                                    {node?.projectComponent?.awardsReceived !== null  &&  (
                                        <span className={`${carousel.project__tag} project__tag`}>winner</span>
                                    )}
                                </a>
                            </div>
                            <a href={`/projects/${node.slug}`}>
                                <span className={carousel.projectTitle}>{node.projectComponent.heading}
                                    <span className={carousel.grey__color}>  / {client}</span>
                                </span>
                            </a>
                        </div>
                    </div> 
                   </> 
                )
            })
        }
    }

    var StN = 0
    if(filter?.projectTypes?.edges != ''){
        if(filter?.projectTypes?.edges[0].node.projects.edges != ''){
            var projectSubTypesprojects = filter?.projectTypes?.edges[0].node.projects
            StN = projectSubTypesprojects.edges.length
            var SubTypes = projectSubTypesprojects.edges.map(({node}) => {
                var leadImgSrc = node.featuredImage.node.sourceUrl
                var client = node.clients.edges[0].node.name
                return (
                   <>
                    <div className="col-md-4 project__item resultItem-cont" key={ node.id }>
                        <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                            <div className={carousel.thumbnail_cont}>
                                <a href={`/projects/${node.slug}`}>
                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                            <div className={`${carousel.full_thumb} full-thumb`}>
                                            {leadImgSrc &&(
                                                <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                            )} 
                                            </div>
                                            <span className="thumbnail-gif"></span>
                                    </span>
                                    {node?.projectComponent?.awardsReceived !== null  &&  (
                                        <span className={`${carousel.project__tag} project__tag`}>winner</span>
                                    )}
                                </a>
                            </div>
                            <a href={`/projects/${node.slug}`}>
                                <span className={carousel.projectTitle}>{node.projectComponent.heading}
                                    <span className={carousel.grey__color}>  / {client}</span>
                                </span>
                            </a>
                        </div>
                    </div> 
                   </> 
                )
            })
        }
    }

    var kN = 0
    if(filter?.keywords?.edges != ''){
       

        if(filter?.keywords?.edges[0].node.projects.edges != ''){
            var keywordsprojects = filter?.keywords?.edges[0].node.projects
            kN = keywordsprojects.edges.length
            var keywordsData = keywordsprojects.edges.map(({node}) => {
                var leadImgSrc = node.featuredImage.node.sourceUrl
                var client = node.clients.edges[0].node.name
                return (
                   <>
                    <div className="col-md-4 project__item resultItem-cont" key={ node.id }>
                        <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                            <div className={carousel.thumbnail_cont}>
                                <a href={`/projects/${node.slug}`}>
                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                            <div className={`${carousel.full_thumb} full-thumb`}>
                                            {leadImgSrc &&(
                                                <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                            )} 
                                            </div>
                                            <span className="thumbnail-gif"></span>
                                    </span>
                                    {node?.projectComponent?.awardsReceived !== null  &&  (
                                        <span className={`${carousel.project__tag} project__tag`}>winner</span>
                                    )}
                                </a>
                            </div>
                            <a href={`/projects/${node.slug}`}>
                                <span className={carousel.projectTitle}>{node.projectComponent.heading}
                                    <span className={carousel.grey__color}>  / {client}</span>
                                </span>
                            </a>
                        </div>
                    </div> 
                   </> 
                )
            })
        }
    }

    var cN = 0
    if(filter?.categories?.edges != ''){
        if(filter?.categories?.edges[0].node.posts?.edges != ''){
            var postsCat = filter?.categories?.edges[0].node.posts
            cN = postsCat.edges.length

            var allposts = postsCat.edges.map((data) => {
                var categories = data?.node?.categories.edges[0]?.node?.name
                var featuredImage = data?.node?.featuredImage?.node?.sourceUrl

                if(featuredImage){
                    var imageData = 
                        <span className={`${carousel.full_thumb} full-thumb`}>
                                <Image src={featuredImage} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}  alt="post-lead" layout="fill" />         
                        </span>
                    }else{
                        imageData = 
                        <span className={`${carousel.full_thumb} full-thumb`}>
                                
                        </span>
                    }
                return (
                    <div className="col-md-4 project__item resultItem-cont" key={data.node.id}>
                    <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                        <div className={carousel.thumbnail_cont}>
                            <a href={`/posts/${data.node.slug}`}>
                                <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                {imageData}
                                </span> 
                                <span className="postCategory">{categories}</span>
                            </a>
                        </div>
                        <a href={`/posts/${data.node.slug}`}>
                            <span className={carousel.projectTitle}>{data.node.title}
                            </span>
                        </a>
                    </div>
                </div> 
                )
            })
        }
    }

    var tagN = 0
    if(filter?.tags?.edges != ''){
        if(filter?.tags?.edges[0].node.posts?.edges != ''){
            var poststags = filter?.tags?.edges[0].node.posts
            tagN = poststags.edges.length
            var allpostsTags = poststags.edges.map((data) => {
                var categories = data?.node?.categories.edges[0]?.node?.name
                var featuredImage = data?.node?.featuredImage?.node?.sourceUrl

                if(featuredImage){
                    var imageData = 
                        <span className={`${carousel.full_thumb} full-thumb`}>
                                <Image src={featuredImage} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}  alt="post-lead" layout="fill" />         
                        </span>
                    }else{
                        imageData = 
                        <span className={`${carousel.full_thumb} full-thumb`}>
                                
                        </span>
                    }
                return (
                        <div className="col-md-4 project__item resultItem-cont" key={data.node.id}>
                            <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                                <div className={carousel.thumbnail_cont}>
                                    <a href={`/posts/${data.node.slug}`}>
                                        <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                        {imageData}
                                        </span> 
                                        <span className="postCategory">{categories}</span>
                                    </a>
                                </div>
                                <a href={`/posts/${data.node.slug}`}>
                                    <span className={carousel.projectTitle}>{data.node.title}
                                    </span>
                                </a>
                            </div>
                        </div> 
                    )
                })
            }
        }

    var resultCount = clN + StN + iN + tagN + cN + kN

    if(resultCount > 0 ){
        var resultText = resultCount + ' results'
    }else{
        resultText = 'no results found'
    }

 return(
  <>    
    <NextSeo 
        title={`${router.query.slug} | Itu Chaudhuri Design `}
        description=''
        canonical={`https://icd-v3-vercel.vercel.app/search/${router.query.slug}`}
        robots={data.metaRobotsNoindex}
                googlebot={data.metaRobotsNofollow}
        openGraph={{
            url: `https://icd-v3-vercel.vercel.app/search/${router.query.slug}`,
            title: router.query.slug,
            description: '',
            images: [
            {
                url: '',
                alt: 'homepage-image',
                type: 'image/jpeg',
            },
            ],
            site_name: `${router.query.slug} | Itu Chaudhuri Design `,
        }}
    />
    <section className="search-results-cont">
        <div className="container">
            <div className="row">
                <div className="col-12 page__header--title">
                    <div className={router.query.slug}>
                        <div className="back-cta" onClick={backButton}>
                            <span className="backBtn"></span>
                            <h1> {resultText} </h1>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="row">
                {clientData}
                {SubTypes}
                {keywordsData}
                {industries}
                {allposts}
                {allpostsTags}
            </div>
        </div>
    </section>
  </>
 )
}

export async function getServerSideProps(params){
 const filter = await getFiltersBySlug(params.query.slug)
 const data = await getFooter()
 const filters = await getFilters()
 return{
  props:{
    filter,
    filters,
    data
  },
 }
}