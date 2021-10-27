import Link from 'next/link'
import loader from "../../../assets/images/loader/page-loader.gif";
import Image from 'next/image'
import './all.module.scss'

export default function allproject({ edges   }){
    var thumbnailClass = 'projectThumbnail';
    var client = '';
    var bgImage ='';
    var leadImgSrc  = '';
    var image = '';
    return(
        <>
        <section className="industry__filter all_filter">
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
                        <div className="projectCarousel">
                        <div className="thumbnail-cont">
                            <Link href={`/projects/${node.slug}`}>
                                    <span className={thumbnailClass} style={{ "width":"100%","background":"url("+loader.src+") no-repeat","backgroundPosition":"center" , "backgroundSize" : "10%" }}>
                                            <div className="full-thumb" style={bgImage}></div>
                                            <span className="thumbnail-gif"></span>
                                    </span>
                                    {/* <span className={showtag}>{award}</span> */}
                            </Link>
                        </div>
                        <Link href={`/projects/${node.slug}`}>
                            <span className="projectTitle">{node.projectComponent.heading}
                                <span className="grey__color">  / {client}</span>
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