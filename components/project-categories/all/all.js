import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import carousel from './all.module.scss'
import types from '../type/type.module.scss'
import { useState, useEffect } from 'react'
import Link from "next/link";
import { getLatestProject } from '../../../lib/api'

export default function allproject({ edges , latestProject }) {

    var client = '';
    var leadImgSrc = '';
    var project_id = '';



    const toBase64 = (str) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)

    const [projects, setProjects] = useState(latestProject)

    var tag = 'false'

    var id = []
    var project_id = []

    if (projects?.edges) {
        projects?.edges.map(({ node }) => {
            id.push(node?.id)
        })

        edges.map(({ node }) => {
            project_id.push(node?.id)
        })
    }

    for (var i = 0; i < id.length; i++) {
        if (id[i] == project_id[i]) {
            tag = 'true'
        }
    }





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
            <section className={`${types.industry__filter} ${types.all_filter} `}>
                <div className="container">
                    <div className="project__scroll">
                        <div className="row project__row">
                            {edges.map(({ node }, i) => (
                                // console.log(id[i] , node?.id),
                               
                                client = node?.clients?.edges[0]?.node?.name,
                                leadImgSrc = (node?.featuredImage?.node?.sourceUrl).replace('gif' , 'mp4'),
                                // console.log(leadImgSrc),
                                
                                <>
                                    <div className="col-md-4 project__item" key={node?.id}>
                                        <div className={`${carousel.projectCarousel} ${types.projectCarousel}`}>
                                            <div className={carousel.thumbnail_cont}>
                                                <Link href={`/projects/${node?.slug}`}>
                                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                                                        <div className={`${carousel.full_thumb} full-thumb`}>
                                                            {!leadImgSrc.includes('mp4')  && (
                                                                <Image unoptimized priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                                            )}
                                                                                                                                                                            {leadImgSrc.includes('mp4')  && (
                                                                <video autoPlay muted loop playsInline>
                                                                <source src={leadImgSrc.replace('fl_progressive,q_auto,dpr_auto,f_auto/f_auto,q_auto/' , '')} type="video/mp4" />
                                                                </video>
                                                            )}
                                                        </div>
                                                        <span className="thumbnail-gif"></span>
                                                    </span>
                                                    {node?.projectComponent?.awardsReceived && (
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
                                                </Link>
                                            </div>
                                            <Link href={`/projects/${node?.slug}`}>
                                                <span className={carousel.projectTitle}>{node?.projectComponent?.heading}
                                                    <span className={carousel.grey__color}>  / {client}</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}