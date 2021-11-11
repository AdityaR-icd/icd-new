import parse from 'html-react-parser';
import $ from 'jquery';
import { useEffect } from 'react'
import { getAllPostsForHome , getMenus , getFooter , getPostAndMorePosts} from '../../lib/api'
import { useRouter } from 'next/router'
import Image from 'next/image'


import style from '../../styles/singlePost.module.scss'

import dynamic from "next/dynamic";
const Seo = dynamic(() => import("../../components/seo"));
const Comment = dynamic(() => import("../../components/comment"));
const Like = dynamic(() => import("../../components/like"));



export default function Post({ post }) {
  // console.log(post)
  useEffect(() => {
    document.body.classList.add(style.bg_yellow);
  });
  const router = useRouter()
  const seo = post ? ( post?.seo ?? {} ) : ( {} );
	const uri = post ? ( post?.uri ?? {} ) : (  {} );
  const comment_data = post ? ( post.comments ?? {} ) : ( {} );

  var featuredImage = post?.leadComponentPost?.leadComponent?.sourceUrl


  if(featuredImage){
    var imageData = 
        <div className={` ${style.leadImage} fade-in `}>
            <Image src={featuredImage} placeholder="blur" className="full-lead-img" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="  alt="post-lead" layout="fill" />         
        </div> 
    }else{
      imageData = 
        <div className={style.leadImage}>
          
        </div>
  }
  if (router.isFallback) {
    return <div>Loading...</div>
  }

    return (
      <>
      <Seo seo={seo} uri={uri}/>
         {/* <h1>{post.title}</h1> 
          {parse(post.content)} 
            <Like count={post.likes?.likes}  id={post.id} type={'post'} />
            <Comment postId={post.postId} comment_data = {comment_data} /> */}
            <section className={`${style.singlePost} mT__260`} key={ post.id }>  
              <div className="images-loaded-container">
                {imageData}
              </div>  
              <div className={style.postContent_cont}>
                  <div className="container">
                      <div className="row">
                          <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                              <div className={style.posts__container}>
                                  <div className={style.post__tag}>
                                      <span className={style.yellow__tag}>inside stories</span>
                                  </div>
                                  <h1>{ post.title }</h1>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>     
            </section>
      </>
    )
  }

  export async function getStaticPaths() {
    const allPosts = await getAllPostsForHome()
    return {
      paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
      fallback: true,
    }
    
  }
  
  export async function getStaticProps({ preview = false , params , previewData }) {
    const Moredata = await getPostAndMorePosts(params.slug, preview, previewData)
    const menus = await getMenus()
    const data = await getFooter()
    return {
      props: { 
        post: Moredata.post,
        posts: Moredata.posts,
        preview, 
        menus,
        data
      },
      revalidate: 1, 
    }
  }
