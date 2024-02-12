import parse from 'html-react-parser';
import Link from 'next/link';
import style from "./services.module.scss";
import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));

export default function fetchServices({ data }) {
    var cardImgSrc = data?.featuredImage?.backgroundImg?.sourceUrl;
    var cardGifImgSrc = data?.featuredImage?.gifAnimationImg?.sourceUrl;
    var projectLink = data?.projectLink?.linkProject?.slug;
    var contact = data?.featuredImage?.differentField

    if (projectLink) {
        var projecturl =
            <Link href={` /projects/${projectLink}`} legacyBehavior>
                <button>view project</button>
            </Link>
    } else {
        projecturl =
            <Link href={` /contact`} legacyBehavior>
                <button>enquire</button>
            </Link>
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
        <div className={`col-md-6 col-lg-4 ${style.servicesItem}`}>
            <span className={style.serviceLogo}>
                <span>
                    <Image  unoptimized placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={style.serviceLogo__anim} src={cardGifImgSrc} fill alt="" />
                    <Image   unoptimized placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`} className={style.serviceLogo__static} src={cardImgSrc} fill alt="" />
                </span>
            </span>
            <span className={style.serviceHeader}>{data.title}</span>
            {data?.content && 
                <span className={style.aboutService}>
                    {parse(data?.content)}
                </span>
            }

            <span className={style.servicesButton}>
                {projecturl}
            </span>
        </div>
    )
}