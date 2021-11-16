import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import carousel from './all.module.scss'
import type from '../type/type.module.scss'

export default function allproject({ edges }){

    var client = '';
    var leadImgSrc  = '';

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
          <rect width="${w}" height="${h}" fill="#333" />
          <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
          <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`

    return(
        <>
        <section className={`${type.industry__filter} ${type.all_filter} `}>
            <div className="container">
                <div className="project__scroll">
                    <div className="row project__row">
                    {edges.map(({ node }) => (
                        client = node.clients.edges[0].node.name,
                        leadImgSrc = node.featuredImage.node.sourceUrl,
                    <>
                    <div className="col-md-4 project__item" key={ node.id }>
                        <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                        <div className={carousel.thumbnail_cont}>
                            <a href={`/projects/${node.slug}`}>
                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%" }}>
                                            <div className={`${carousel.full_thumb} full-thumb`}>
                                                <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                            </div>
                                            <span className="thumbnail-gif"></span>
                                    </span>
                                    <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
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
                    ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}