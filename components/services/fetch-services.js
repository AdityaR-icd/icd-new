import parse from 'html-react-parser';
import Link from 'next/link';
import style from "./services.module.scss";

export default function fetchServices({data}) {
    var cardImgSrc = data?.featuredImage?.backgroundImg?.sourceUrl;
    var cardGifImgSrc = data?.featuredImage?.gifAnimationImg?.sourceUrl;
    var projectLink = data?.projectLink?.linkProject?.[0].slug;
    if(projectLink){
        var projecturl =    
                <Link href={` projects/${projectLink}` }>
                    <button>view project</button>
                </Link>
    }else{
        projecturl =    
            <Link href={` projects` }>
                <button>view project</button>
            </Link>
        }

    return(
        <div className={`col-md-6 col-lg-4 ${style.servicesItem}`}>
            <span className={style.serviceLogo}>
            <span>
                <img loading="lazy" decoding="async" className={style.serviceLogo__anim} src = { cardGifImgSrc } alt=""/>
                <img loading="lazy" decoding="async" className={style.serviceLogo__static} src = { cardImgSrc } alt=""/>
            </span>
            </span>
            <span className={style.serviceHeader}>{data.title}</span>
            <span className={style.aboutService}>
                {parse(data.content)}
            </span>
            <span className={style.servicesButton}>
                {projecturl}
            </span>
        </div>
    )
}