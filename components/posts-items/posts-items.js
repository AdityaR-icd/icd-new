import parse from 'html-react-parser';
import style from '../posts/posts.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import dynamic from "next/dynamic";
const Like = dynamic(() => import("../../components/like"));

export default function postItem({data}){
    var categories = data?.categories.edges[0]?.node?.name
    var featuredImage = data?.featuredImage?.node?.sourceUrl
    var tags = data?.tags.edges
    var date = new Date(data.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    if(featuredImage){
        var imageData = 
            <span className="postThumbnail fade-in">
                    <Image src={featuredImage} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="  alt="post-lead" layout="fill" />         
            </span>
        }else{
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
    return(
        <div className="col-md-6 col-lg-6 grid-item">
            <div className={`${style.postsItems} animateItems}`}>
                <Link href={`/posts/${data.slug}`}>
                    <div className={style.postLeadImage}>
                        <div className="images-loaded-container">
                            {imageData}
                        </div>
                        <span className={style.postCategory}>{categories}</span>
                    </div>
                </Link>
                <a href={`/posts/${data.slug}`}>
                    <h2 className={style.postTitle}>{data.title}</h2>
                    <span className={style.postBy}>  {date} </span>
                    <p className={style.postInfo}> {parse(data.excerpt)} </p>
                    <div className="d-none"><span>{categories}</span>{postsTags}</div>
                </a>
                <div className="row">
                    <div className="col-6">
                        <Link href={`/posts/${data.slug}`}>
                            <button>keep reading</button>
                        </Link>
                    </div>
                    <div className="col-6 text-right">
                        <Like count={data?.likes?.likes}  id={data.id} type={'post'} />
                    </div>
                </div>
            </div>
        </div>
    )
}