import parse from 'html-react-parser';
import style from '../posts/posts.module.scss'
import Link from 'next/link'
import Image from "next/image";

import dynamic from "next/dynamic";
const Like = dynamic(() => import("../../components/like"));

export default function postItem({ data, ids }) {
    var categories = data?.categories.edges[0]?.node?.name
    var featuredImage = data?.featuredImage?.node?.sourceUrl
    var tags = data?.tags.edges
    var date = new Date(data.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

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

    if (featuredImage) {
        var imageData =
            <span className="postThumbnail fade-in">
                <Image

                 unoptimized
                    src={featuredImage}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                    alt="post-lead"
                    fill
                    sizes="100vw" />
            </span>
    } else {
        imageData =
            <span className="postThumbnail fade-in">

            </span>
    }
    if (tags?.length > 0) {
        var postsTags = tags?.map((item) => {
            return (
                <>
                    <span>{item?.node.name}</span>
                </>
            )
        })
    }
    else {
        var postsTags = <span></span>
    }


    return (
        <div className="col-md-6 col-lg-6 grid-item">
            <div className={`${style.postsItems} animateItems`}>
                <Link href={`/posts/${data.slug}`} legacyBehavior prefetch={false}>
                <a>
                    <div className={style.postLeadImage}>
                        <div className="images-loaded-container">
                            {imageData}
                        </div>
                        <span className={style.postCategory}>{categories}</span>
                    </div>
                {/* </Link>
                <Link href={`/posts/${data.slug}`} legacyBehavior> */}
                    <h2 className={style.postTitle}>{data.title}</h2>
                    <span className={style.postBy}>  {date} </span>
                    <div className={style.postInfo}> {parse(data.excerpt.substr(0,393))} </div>
                    <div className="d-none"><span>{categories}</span>{postsTags}</div>
                {/* </Link> */}
                    <div className="row">
                        <div className="col-6">
                            {/* <Link href={`/posts/${data.slug}`} legacyBehavior> */}
                                <button>keep reading</button>
                            {/* </Link> */}
                        </div>
                        <div className="col-6 text-right">
                            <Like count={data?.likes?.likes} id={data.id} type={'post'} />
                        </div>
                    </div>
                </a>
                </Link>
            </div>
        </div>
    );
}