import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import carousel from './all.module.scss'
import type from '../type/type.module.scss'

export default function allproject({ edges }){

    var client = '';
    var leadImgSrc  = '';
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
                                                <Image className={carousel.project_lead} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="  src={leadImgSrc} alt="project-lead" layout="fill" />
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