import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import carousel from '../all/all.module.scss'
import type from './type.module.scss'

export default function projectTypes({ nodes }){
    var data = ''
    var slug = ''
    var title = ''
    var leadImgSrc = ''
    var client = ''
    var clientsName = ''
    var heading = ''
    return(
        <>
        {nodes.map(({ projects } , i , types)  => (
            data = projects.edges,
            slug = data[0]?.node.slug,
            title = data[0]?.node.title,
            leadImgSrc = data[0]?.node.featuredImage.node.sourceUrl,
            client = data[0].node.clients.edges,
            clientsName = client[0]?.node.name,
            heading = data[0].node.projectComponent.heading,



            <section className= {`${type.industry__filter} ${type.projectType__filter}`} >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <span className={type.project__category}>{types[i].name}</span>
                            <a className={`${type.see_all} see-all`} href={`/projects/category/${types[i].slug}`}>see all</a>
                        </div>
                    </div>
    
                    <div className="project__scroll">
                        <div className="row project__row">
                            <>
                                <>
                                    <div className="col-md-4 project__item">
                                        <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                                            <div className={carousel.thumbnail_cont}>
                                                <a href={`/projects/${slug}`}>
                                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                                                        <div className={`${carousel.full_thumb} full-thumb`}>
                                                            <Image className={carousel.project_lead} priority={true} src={leadImgSrc} alt="project-lead" layout="fill" />
                                                        </div>
                                                        <span className="thumbnail-gif"></span>
                                                    </span>
                                                    <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
                                                </a>
                                            </div>
                                            <a href={`/projects/${slug}`}>
                                                <span className={carousel.projectTitle}>
                                                    {heading}
                                                    <span className={carousel.grey__color}>  / {clientsName}</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </> 
                            </>
                        </div>
                    </div>
                </div>
            </section>
        ))}
        </>
    )
}
