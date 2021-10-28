import Link from 'next/link'
import loader from "../../../assets/images/loader/page-loader.gif";
import Image from 'next/image'
import carousel from './all.module.scss'
import type from '../type/type.module.scss'

export default function allproject({ edges   }){
    var thumbnailClass = 'projectThumbnail';
    var client = '';
    var bgImage ='';
    var leadImgSrc  = '';
    var image = '';
    return(
        <>
        <section className={`${type.industry__filter} ${type.all_filter} `}>
            <div className="container">
                <div className="project__scroll">
                    <div className="row project__row">
                    {edges.map(({ node }) => (
                        client = node.clients.edges[0].node.name,
                        leadImgSrc = node.featuredImage.node.sourceUrl,
                        bgImage = {
                            backgroundImage: 'url(' + leadImgSrc + ')'
                        },
                    <>
                    <div className="col-md-4 project__item" key={ node.id }>
                        <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                        <div className={carousel.thumbnail_cont}>
                            <a href={`/projects/${node.slug}`}>
                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width":"100%","background":"url("+loader.src+") no-repeat","backgroundPosition":"center" , "backgroundSize" : "10%" }}>
                                            <div className={`${carousel.full_thumb} full-thumb`}>
                                                <Image className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
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