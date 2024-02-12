import dynamic from "next/dynamic";
import Link from "next/link";
const Image = dynamic(() => import("next/image"));
import carousel from '../all/all.module.scss'
import type from './type.module.scss'
// import Shimmer from "react-shimmer-effect";
import { useState, useEffect } from "react";
import $ from 'jquery'

export default function projectTypes({ nodes, latestProject }) {
    var data = ''
    var slug = ''
    var title = ''
    var leadImgSrc = ''
    var client = ''
    var clientsName = ''
    var heading = ''
    var common
    var Projecttype

    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState(latestProject)


    // if(typeof window != 'undefined'){

    // }

    var tag = 'false'
    var id = []
    var project_id = []

    if (projects?.edges) {
        projects.edges.map(({ node }) => {
            id.push(node.id)
        })

        nodes.map(({ projects }) => {
            projects.edges.map(({ node }) => {
                project_id.push(node.id)
            })
        })
    }
    function intersection(first, second) {
        var s = new Set(second);
        return first.filter(item => s.has(item));
    };

    common = intersection(project_id, id)

    // useEffect(() => {
    //     $('.').addClass(new)
    // }, []);

    if (typeof window != 'undefined') {

    }

    for (var i = 0; i < id.length; i++) {
        if (id[i] === project_id[i]) {
            tag = 'true'
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

    return (
        <>
            {nodes.map(({ projects }, i, types) => (

                <section className={`${type.industry__filter}  ${type.projectType__filter}`} >
                    <div className={` container ${type.container}`}>
                        <div className="row">
                            <div className="col-12">
                                <span className={type.project__category}>{types[i].name}</span>
                                <a className={`${type.see_all} see-all`} href={`/projects/category/${types[i].slug}`}>see all</a>
                            </div>
                        </div>

                        <div className={type.project__scroll} >
                            <div className={`row Projectrow ${type.project__row}`}>
                                {projects.edges.map(({ node }, j) => (
                                    slug = node?.slug,
                                    title = node?.title,
                                    leadImgSrc = (node?.featuredImage?.node.sourceUrl).replace('gif', 'mp4'),
                                    client = node?.clients.edges,
                                    clientsName = client[0]?.node.name,
                                    heading = node?.projectComponent?.heading,
                                    Projecttype = node?.projectTypes?.edges[0]?.node?.name,

                                    <>
                                        {types[i]?.name == Projecttype &&
                                            <div className={`col-md-4 ${type.project__item}`}>
                                                <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                                                    <Link prefetch={false} href={`/projects/${slug}`}>
                                                        <div className={carousel.thumbnail_cont}>
                                                            <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                                                                <div className={`${carousel.full_thumb} full-thumb`}>
                                                                    {!leadImgSrc.includes('mp4') && (
                                                                        <Image  unoptimized priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" fill sizes='100vw' />
                                                                    )}
                                                                    {leadImgSrc.includes('mp4') && (
                                                                        <video autoPlay muted loop playsInline>
                                                                            <source src={leadImgSrc.replace('fl_progressive,q_auto,dpr_auto,f_auto/f_auto,q_auto/', '')} type="video/mp4" />
                                                                        </video>
                                                                    )}
                                                                </div>
                                                                <span className="thumbnail-gif"></span>
                                                            </span>
                                                            {node?.projectComponent?.awardsReceived !== null && (
                                                                <span className={`${carousel.project__tag} project__tag`}>winner</span>
                                                            )}

                                                            {node?.id === id[0] && (
                                                                <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
                                                            )}
                                                            {node?.id === id[1] && (
                                                                <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
                                                            )}
                                                            {node?.id === id[2] && (
                                                                <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
                                                            )}

                                                            {/* </Link> */}
                                                        </div>
                                                        {/* <Link href={`/projects/${slug}`}> */}
                                                        <span className={carousel.projectTitle}>
                                                            {heading}
                                                            <span className={` ${carousel.grey__color}`}>  / {clientsName}</span>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    )
}
