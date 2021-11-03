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

            <section className= {`${type.industry__filter} ${type.projectType__filter}`} >
                <div className={` container ${type.container}`}>
                    <div className="row">
                        <div className="col-12">
                            <span className={type.project__category}>{types[i].name}</span>
                            <a className={`${type.see_all} see-all`} href={`/projects/category/${types[i].slug}`}>see all</a>
                        </div>
                    </div>
    
                    <div className={type.project__scroll}>
                        <div className={`row ${type.project__row}`}>
                        {projects.edges.map(({ node }) => (
                            slug = node?.slug,
                            title = node?.title,
                            leadImgSrc = node.featuredImage.node.sourceUrl,
                            client = node?.clients.edges,
                            clientsName = client[i]?.node.name,
                            heading = node.projectComponent.heading,                
                                <>
                                    <div className={ `col-md-4 ${type.project__item}` }>
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
                                )).slice(0,3)}
                        </div>
                    </div>
                </div>
            </section>
        ))}
        </>
    )
}
