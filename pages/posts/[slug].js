import parse from 'html-react-parser';
import $ from 'jquery';
import { useEffect } from 'react'
import { getAllPostsForHome , getMenus , getFooter , getPostAndMorePosts} from '../../lib/api'
import { useRouter } from 'next/router'
import Image from 'next/image'


import Share from '../../assets/images/post-buttons/share.svg'
import Icon from '../../assets/images/logo/mobile-logo-new.png'


import style from '../../styles/singlePost.module.scss'

import dynamic from "next/dynamic";
const Seo = dynamic(() => import("../../components/seo"));
const Comment = dynamic(() => import("../../components/comment"));
const Like = dynamic(() => import("../../components/like"));



export default function Post({ post , data }) {
  useEffect(() => {
    document.body.classList.add(style.bg_yellow);
    document.body.classList.add('bg-yellow');
  });
  const router = useRouter()
  const seo = post ? ( post?.seo ?? {} ) : ( {} );
	const uri = post ? ( post?.uri ?? {} ) : (  {} );
  const comment_data = post ? ( post.comments ?? {} ) : ( {} );

  var featuredImage = post?.leadComponentPost?.leadComponent?.sourceUrl
  var categories = post?.categories.edges[0]?.node?.name
  var checkauthor = post?.postAuthor?.author
  if(checkauthor){
    var author = post?.postAuthor?.author[0]?.name
    var authorImg = post?.postAuthor?.author[0]?.profileImage?.profileImage
  }


  var date = new Date(post?.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });


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

  const toggleShareIcons = () => {
    $('.share-icon').toggleClass('icons-hide');
  }

    return (
      <>
      <Seo seo={seo} uri={uri}/>
         {/*
            <Comment postId={post.postId} comment_data = {comment_data} /> */}
            <section className={`${style.singlePost} mT__260`} key={ post.id }>  
              <div className="images-loaded-container">
                {imageData}
              </div>  
              <div className={style.postContent_cont}>
                  <div className="container">
                      <div className="row">
                          <div className="col-12 col-md-10 offset-md-2">
                              <div className={style.posts__container}>
                                  <div className={style.post__tag}>
                                      <span className={style.yellow__tag}>inside stories</span>
                                  </div>
                                  <h1>{ post.title }</h1>
                                  <div className={style.post__author}>
                                      <span className="author__img"><img loading="lazy" decoding="async" src={ authorImg ? authorImg.sourceUrl : Icon.src } ></img></span>
                                      <span className="post-detail">{ author } / { date } / { categories } </span>
                                      <div className={` ${style.social__media} ${style.header_socialmedia} social__media d-none d-lg-block `}>
                                        <span className="icon share-icon icons-hide"><a href={data.linkedin} className="linkedin-icon" target="_blank"></a></span>
                                        <span className="icon share-icon icons-hide"><a href={data.twitter} className="twitter-icon" target="_blank"></a></span>
                                        <span className="icon share-icon icons-hide"><a href={data.facebook} className="fb-icon" target="_blank"></a></span>
                                        <span className="icon" onClick={ toggleShareIcons }><img loading="lazy" decoding="async" src={ Share.src } width="20" height="20" className="icon-img shareIcon--main" />share</span>
                                        <Like count={post.likes?.likes}  id={post.id} type={'post'} />
                                      </div>
                                      <div className={` ${style.social__media} ${style.header_socialmedia} ${style.header_socialmedia_mobile} social__media d-block d-lg-none `}>
                                          <Like count={post.likes?.likes}  id={post.id} type={'post'} />  
                                          <span className="icon share-icon icons-hide"><a href={data.linkedin} className="linkedin-icon" target="_blank"></a></span>
                                          <span className="icon share-icon icons-hide"><a href={data.twitter} className="twitter-icon" target="_blank"></a></span>
                                          <span className="icon share-icon icons-hide"><a href={data.facebook} className="fb-icon" target="_blank"></a></span>
                                          <span className="icon" onClick={ toggleShareIcons }><img loading="lazy" decoding="async" src={ Share.src } width="20" height="20" className="icon-img shareIcon--main" />share</span>
                                      </div>
                                  </div>
                                  <div className={`${style.postContent} postContent`}>
                                      {parse(post.content)}
                                  </div>
                              </div>
                              <div className={` ${style.social__media} social__media `}>
                                <span className="icon share-icon icons-hide"><a href={data.linkedin} className="linkedin-icon" target="_blank"></a></span>
                                <span className="icon share-icon icons-hide"><a href={data.twitter} className="twitter-icon" target="_blank"></a></span>
                                <span className="icon share-icon icons-hide"><a href={data.facebook} className="fb-icon" target="_blank"></a></span>
                                <span className="icon" onClick={ toggleShareIcons }><img loading="lazy" decoding="async" src={ Share.src } width="20" height="20" className="icon-img shareIcon--main" />share</span>
                                <Like count={post.likes?.likes}  id={post.id} type={'post'} />
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
