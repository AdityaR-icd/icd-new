
import { getFilters, getFooter, getFiltersBySlug , getLatestProject } from '../../lib/api';
import { useEffect , useState } from 'react';
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

import Link from 'next/link';

export default function search({ filters, data, filter , latestProject }) {
    const router = useRouter()

    useEffect(() => {
        if (router.pathname == "/search/[slug]") {
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


    var clients = []
    var industry = []
    var projectTypes = []
    var keyword = []
    var projects = []
    var posts = []
    var categories = []
    var tags = []
    var Allprojects = []

    var allposts = []


    var clN = 0
    if (filter?.clients?.edges != '') {
        var client = filter?.clients?.edges[0].node.name
        if (filter?.clients?.edges[0].node.projects.edges != '') {
            var clientsprojects = filter?.clients?.edges[0].node.projects
            clN = clientsprojects.edges.length
            var clientData = clientsprojects.edges.map(({ node }) => {
                clients.push(node)
                // var leadImgSrc = node?.featuredImage?.node?.sourceUrl
                // return (
                //     <>
                //         <div className="col-md-4 project__item resultItem-cont" key={node.id}>
                //             <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                //                 <div className={carousel.thumbnail_cont}>
                //                     <Link href={`/projects/${node.slug}`}>
                //                         <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                //                             <div className={`${carousel.full_thumb} full-thumb`}>
                //                                 {leadImgSrc && (
                //                                     <Image ={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                //                                 )}
                //                             </div>
                //                             <span className="thumbnail-gif"></span>
                //                         </span>
                //                         {node?.projectComponent?.awardsReceived !== null && (
                //                             <span className={`${carousel.project__tag} project__tag`}>winner</span>
                //                         )}
                //                     </Link>
                //                 </div>
                //                 <Link href={`/projects/${node.slug}`}>
                //                     <span className={carousel.projectTitle}>{node.projectComponent.heading}
                //                         <span className={carousel.grey__color}>  / {client}</span>
                //                     </span>
                //                 </Link>
                //             </div>
                //         </div>
                //     </>
                // )
            })
        }
    }

    var iN = 0
    if (filter?.industries?.edges != '') {
        if (filter?.industries?.edges[0].node.projects.edges != '') {
            var industriesprojects = filter?.industries?.edges[0].node.projects
            iN = industriesprojects.edges.length
            var industries = industriesprojects.edges.map(({ node }) => {
                industry.push(node)
                // var leadImgSrc = node.featuredImage.node.sourceUrl
                // var client = node.clients.edges[0].node.name
                // return (
                //     <>
                //         <div className="col-md-4 project__item resultItem-cont" key={node.id}>
                //             <div className={`${carousel.projectCarousel} ${style.postsItems} ${type.projectCarousel}`}>
                //                 <div className={`${carousel.thumbnail_cont} ${style.postLeadImage}`}>
                //                     <Link href={`/projects/${node.slug}`}>
                //                         <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                //                             <div className={`${carousel.full_thumb} full-thumb`}>
                //                                 {leadImgSrc && (
                //                                     <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                //                                 )}
                //                             </div>
                //                             <span className="thumbnail-gif"></span>
                //                         </span>
                //                         {node?.projectComponent?.awardsReceived !== null && (
                //                             <span className={`${carousel.project__tag} project__tag`}>winner</span>
                //                         )}
                //                     </Link>
                //                 </div>
                //                 <Link href={`/projects/${node.slug}`}>
                //                     <span className={carousel.projectTitle}>{node.projectComponent.heading}
                //                         <span className={carousel.grey__color}>  / {client}</span>
                //                     </span>
                //                 </Link>
                //             </div>
                //         </div>
                //     </>
                // )
            })
        }
    }

    var StN = 0
    if (filter?.projectTypes?.edges != '') {
        if (filter?.projectTypes?.edges[0].node.projects.edges != '') {
            var projectSubTypesprojects = filter?.projectTypes?.edges[0].node.projects
            StN = projectSubTypesprojects.edges.length
            var SubTypes = projectSubTypesprojects.edges.map(({ node }) => {
                projectTypes.push(node)
                // var leadImgSrc = node.featuredImage.node.sourceUrl
                // var client = node.clients.edges[0].node.name
                // return (
                //     <>
                //         <div className="col-md-4 project__item resultItem-cont" key={node.id}>
                //             <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                //                 <div className={carousel.thumbnail_cont}>
                //                     <Link href={`/projects/${node.slug}`}>
                //                         <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                //                             <div className={`${carousel.full_thumb} full-thumb`}>
                //                                 {leadImgSrc && (
                //                                     <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                //                                 )}
                //                             </div>
                //                             <span className="thumbnail-gif"></span>
                //                         </span>
                //                         {node?.projectComponent?.awardsReceived !== null && (
                //                             <span className={`${carousel.project__tag} project__tag`}>winner</span>
                //                         )}
                //                     </Link>
                //                 </div>
                //                 <Link href={`/projects/${node.slug}`}>
                //                     <span className={carousel.projectTitle}>{node.projectComponent.heading}
                //                         <span className={carousel.grey__color}>  / {client}</span>
                //                     </span>
                //                 </Link>
                //             </div>
                //         </div>
                //     </>
                // )
            })
        }
    }

    var kN = 0
    if (filter?.keywords?.edges != '') {
    if (filter?.keywords?.edges[0].node.projects.edges != '') {
        var keywordsprojects = filter?.keywords?.edges[0].node.projects
        kN = keywordsprojects.edges.length
        var keywordsData = keywordsprojects.edges.map(({ node }) => {
            keyword.push(node)
            // var leadImgSrc = node.featuredImage.node.sourceUrl
            // var client = node.clients.edges[0].node.name
            // return (
            //     <>
            //         <div className="col-md-4 project__item resultItem-cont" key={node.id}>
            //             <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
            //                 <div className={carousel.thumbnail_cont}>
            //                     <Link href={`/projects/${node.slug}`}>
            //                         <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
            //                             <div className={`${carousel.full_thumb} full-thumb`}>
            //                                 {leadImgSrc && (
            //                                     <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
            //                                 )}
            //                             </div>
            //                             <span className="thumbnail-gif"></span>
            //                         </span>
            //                         {node?.projectComponent?.awardsReceived !== null && (
            //                             <span className={`${carousel.project__tag} project__tag`}>winner</span>
            //                         )}
            //                     </Link>
            //                 </div>
            //                 <Link href={`/projects/${node.slug}`}>
            //                     <span className={carousel.projectTitle}>{node.projectComponent.heading}
            //                         <span className={carousel.grey__color}>  / {client}</span>
            //                     </span>
            //                 </Link>
            //             </div>
            //         </div>
            //     </>
            // )
        })
    }
    }

    var cN = 0
    if (filter?.categories?.edges != '') {
        if (filter?.categories?.edges[0].node.posts?.edges != '') {
            var postsCat = filter?.categories?.edges[0].node.posts
            cN = postsCat.edges.length

            var allposts = postsCat.edges.map((data) => {
                categories.push(data)
                // var categories = data?.node?.categories.edges[0]?.node?.name
                // var featuredImage = data?.node?.featuredImage?.node?.sourceUrl

                // if (featuredImage) {
                //     var imageData =
                //         <span className={`${carousel.full_thumb} full-thumb`}>
                //             <Image src={featuredImage} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} alt="post-lead" layout="fill" />
                //         </span>
                // } else {
                //     imageData =
                //         <span className={`${carousel.full_thumb} full-thumb`}>

                //         </span>
                // }
                // return (
                //     <div className="col-md-4 project__item resultItem-cont" key={data.node.id}>
                //         <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                //             <div className={carousel.thumbnail_cont}>
                //                 <Link href={`/posts/${data.node.slug}`}>
                //                     <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                //                         {imageData}
                //                     </span>
                //                     <span className="postCategory">{categories}</span>
                //                 </Link>
                //             </div>
                //             <Link href={`/posts/${data.node.slug}`}>
                //                 <span className={carousel.projectTitle}>{data.node.title}
                //                 </span>
                //             </Link>
                //         </div>
                //     </div>
                // )
            })
        }
    }

    var tagN = 0
    if (filter?.tags?.edges != '') {
        if (filter?.tags?.edges[0].node.posts?.edges != '') {
            var poststags = filter?.tags?.edges[0].node.posts
            tagN = poststags.edges.length
            var allpostsTags = poststags.edges.map((data) => {
                tags.push(data)
                // var categories = data?.node?.categories?.edges[0]?.node?.name
                // var featuredImage = data?.node?.featuredImage?.node?.sourceUrl

                // if (featuredImage) {
                //     var imageData =
                //         <span className={`${carousel.full_thumb} full-thumb`}>
                //             <Image src={featuredImage} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} alt="post-lead" layout="fill" />
                //         </span>
                // } else {
                //     imageData =
                //         <span className={`${carousel.full_thumb} full-thumb`}>

                //         </span>
                // }
                // return (
                //     <div className="col-md-4 project__item resultItem-cont" key={data.node.id}>
                //         <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                //             <div className={carousel.thumbnail_cont}>
                //                 <Link href={`/posts/${data.node.slug}`}>
                //                     <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                //                         {imageData}
                //                     </span>
                //                     <span className="postCategory">{categories}</span>
                //                 </Link>
                //             </div>
                //             <Link href={`/posts/${data.node.slug}`}>
                //                 <span className={carousel.projectTitle}>{data.node.title}
                //                 </span>
                //             </Link>
                //         </div>
                //     </div>
                // )
            })
        }
    }

    var Allprojects = 0
    if (filter?.projects?.edges != '') {
        // var client = filter?.projects?.edges[0].node?.clients?.edges.name
        if (filter?.projects?.edges != '') {
            var clientsprojects = filter?.projects
            Allprojects = clientsprojects.edges.length
            var ProjectData = clientsprojects.edges.map(({ node }) => {
                projects.push(node)
                // var leadImgSrc = node?.featuredImage?.node?.sourceUrl
                // return (
                //     <>
                //         <div className="col-md-4 project__item resultItem-cont" key={node.id}>
                //             <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                //                 <div className={carousel.thumbnail_cont}>
                //                     <Link href={`/projects/${node.slug}`}>
                //                         <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                //                             <div className={`${carousel.full_thumb} full-thumb`}>
                //                                 {leadImgSrc && (
                //                                     <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                //                                 )}
                //                             </div>
                //                             <span className="thumbnail-gif"></span>
                //                         </span>
                //                         {node?.projectComponent?.awardsReceived !== null && (
                //                             <span className={`${carousel.project__tag} project__tag`}>winner</span>
                //                         )}
                //                     </Link>
                //                 </div>
                //                 <Link href={`/projects/${node.slug}`}>
                //                     <span className={carousel.projectTitle}>{node.projectComponent.heading}
                //                         <span className={carousel.grey__color}>  / {node?.clients?.edges[0].node?.name}</span>
                //                     </span>
                //                 </Link>
                //             </div>
                //         </div>
                //     </>
                // )
            })
        }
    }

    var Allposts = 0
    if (filter?.posts?.edges != '') {
        if (filter?.posts?.edges != '') {
            var postsCat = filter?.posts
            Allposts = postsCat.edges.length

            var allposts = postsCat.edges.map((data) => {
                posts.push(data)
                // var categories = data?.node?.categories.edges[0]?.node?.name
                // var featuredImage = data?.node?.featuredImage?.node?.sourceUrl

                // if (featuredImage) {
                //     var imageData =
                //         <span className={`${carousel.full_thumb} full-thumb`}>
                //             <Image src={featuredImage} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} alt="post-lead" layout="fill" />
                //         </span>
                // } else {
                //     imageData =
                //         <span className={`${carousel.full_thumb} full-thumb`}>

                //         </span>
                // }
                // return (
                //     <div className="col-md-4 project__item resultItem-cont" key={data.node.id}>
                //         <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                //             <div className={carousel.thumbnail_cont}>
                //                 <Link href={`/posts/${data.node.slug}`}>
                //                     <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                //                         {imageData}
                //                     </span>
                //                     <span className="postCategory">{categories}</span>
                //                 </Link>
                //             </div>
                //             <Link href={`/posts/${data.node.slug}`}>
                //                 <span className={carousel.projectTitle}>{data.node.title}
                //                 </span>
                //             </Link>
                //         </div>
                //     </div>
                // )
            })
        }
    }


    var Allprojects = [...new Set([...clients, ...industry, ...projectTypes, ...keyword, ...categories, ...projects])]
    var allposts = [...new Set([...categories, ...tags , ...posts])]

    const uniqueProjects = Array.from(new Set(Allprojects.map(a => a.id)))
    .map(id => {
    return Allprojects.find(a => a.id === id)
    })

    const uniquePosts = Array.from(new Set(allposts.map(a => a?.node?.id)))
    .map(id => {
    return allposts.find(a => a?.node?.id === id)
    })




    var resultCount = uniqueProjects.length + uniquePosts.length

    if (resultCount > 0) {
        var resultText = resultCount + ' results'
    } else {
        resultText = 'no results found'
    }
    var id = []
    const [project, setProjects] = useState(latestProject)
    if (project?.edges) {
        project.edges.map(({ node }) => {
            id.push(node.id)
        })
    }
    return (
        <>
            <NextSeo
                title={`${router.query.slug} | Itu Chaudhuri Design `}
                description=''
                canonical={`https://www.icdindia.com/search/${router.query.slug}`}
                robots={data.metaRobotsNoindex}
                googlebot={data.metaRobotsNofollow}
                openGraph={{
                    url: `https://www.icdindia.com/search/${router.query.slug}`,
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
                        {
                            uniqueProjects.map(( node , i ) => {
                                var leadImgSrc = node?.featuredImage?.node?.sourceUrl
                                if(node?.id === id[0] || node?.id === id[1] || node?.id === id[2]){
                                    var newtag = <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
                                }else
                                    newtag = ''
                                return (
                                    <>
                                        <div className="col-md-4 project__item resultItem-cont" key={node.id}>
                                            <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                                                <div className={carousel.thumbnail_cont}>
                                                    <Link href={`/projects/${node.slug}`}>
                                                        <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                                                            <div className={`${carousel.full_thumb} full-thumb`}>
                                                                {leadImgSrc && (
                                                                    <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                                                )}
                                                            </div>
                                                            <span className="thumbnail-gif"></span>
                                                        </span>
                                                        {node?.projectComponent?.awardsReceived !== null && (
                                                            <span className={`${carousel.project__tag} project__tag`}>winner</span>
                                                        )}
                                                        {newtag}
                           
                                                    </Link>
                                                </div>
                                                <Link href={`/projects/${node.slug}`}>
                                                    <span className={carousel.projectTitle}>{node.projectComponent?.heading}
                                                        <span className={carousel.grey__color}>  / {node?.clients?.edges[0]?.node?.name}</span>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )
                            })

                            
                        }

                        {
                            uniquePosts.map((data) => {
                                // console.log(data)
                                var categories = data?.node?.categories.edges[0]?.node?.name
                                var featuredImage = data?.node?.featuredImage?.node?.sourceUrl

                                if (featuredImage) {
                                    var imageData =
                                        <span className={`${carousel.full_thumb} full-thumb`}>
                                            <Image src={featuredImage} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} alt="post-lead" layout="fill" />
                                        </span>
                                } else {
                                    imageData =
                                        <span className={`${carousel.full_thumb} full-thumb`}>

                                        </span>
                                }
                                return (
                                    <div className="col-md-4 project__item resultItem-cont" key={data.node.id}>
                                        <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                                            <div className={carousel.thumbnail_cont}>
                                                <Link href={`/posts/${data.node.slug}`}>
                                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                                                        {imageData}
                                                    </span>
                                                    <span className="postCategory">{categories}</span>
                                                </Link>
                                            </div>
                                            <Link href={`/posts/${data.node.slug}`}>
                                                <span className={carousel.projectTitle}>{data.node.title}
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(params) {
    const filter = await getFiltersBySlug(params.query.slug)
    const data = await getFooter()
    const filters = await getFilters()
    const latestProject = await getLatestProject()
    return {
        props: {
            filter,
            filters,
            data,
            latestProject
        },
    }
}