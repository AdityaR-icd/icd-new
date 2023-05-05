import parse from 'html-react-parser';
import $ from 'jquery';
import { useEffect } from 'react'
import { useState } from 'react';
import { getAllPostsForHome, getFooter, getPostAndMorePosts , getTeam } from '../../lib/api'
import { useRouter } from 'next/router'
import Image from "next/image";
import Link from 'next/link'
import Share from '../../assets/images/post-buttons/share.svg'
import Icon from '../../assets/images/logo/mobile-logo-new.png'


import style from '../../styles/singlePost.module.scss'
import carousel from '../../components/project-categories/all/all.module.scss'
import type from '../../components/project-categories/type/type.module.scss'
import dynamic from "next/dynamic";
const Seo = dynamic(() => import("../../components/seo"));
// const Comment = dynamic(() => import("../../components/comment/comment"));
const Like = dynamic(() => import("../../components/like"));
const PostItem = dynamic(() => import('../../components/posts-items/posts-items'))
const NextPost = dynamic(() => import('../../components/posts/next-post'))
const PrevPost = dynamic(() => import('../../components/posts/prev-post'))


export default function Post({ post }) {
  
  const router = useRouter()

  const [mounted, setMounted] = useState(false);
  const [range, setRange] = useState('0')
  useEffect(() => {
    setMounted(true)
  }, [])

  // const clientspage = 
  const seo = post ? (post?.seo ?? {}) : ({});
  const uri = post ? (post?.uri ?? {}) : ({});
  // const comment_data = post ? (post.comments ?? {}) : ({});

  var featuredImage = post?.leadComponentPost?.leadComponent?.sourceUrl
  var categories = post?.categories.edges[0]?.node?.name
  var checkauthor = post?.postAuthor?.postAuthor
  var checkrelatedpost = post?.relatedPost?.relatedBlog
  var checkrelatedproject = post?.relatedPost?.relatedProject


  const [interactionArticle, setinteractionArticle] = useState(post?.musicArticle?.interactive);
  const [team, setTeam] = useState(interactionArticle);
  useEffect( () => {
      if(interactionArticle === true) {
          async function fetchData() {
            // You can await here
                  const teamData = await getTeam()
                    setTeam(teamData)
            // ...
          }
          fetchData();
        }
  }, [])

  // console.log(team)


  let fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + window?.location.origin + router.asPath
  let twitterUrl = 'https://twitter.com/intent/tweet?text="' + post?.title + '"&url=' + window?.location.origin + router.asPath
  let linkedinUrl = 'https://www.linkedin.com/shareArticle?mini=true&url="' + window?.location.origin + router.asPath + '"&title=' + post?.title;

  if (checkauthor) {
    var author = post?.postAuthor?.postAuthor[0]?.title
    var authorImg = post?.postAuthor?.postAuthor[0]?.profileImage?.profileImage
  }
  // console.log(post?.postAuthor?.postAuthor[0])
  var client = '';
  var leadImgSrc = '';

  if (checkrelatedproject) {
    var relatedProject =

      <>

        {checkrelatedproject.map((node) => (
          client = node.clients.edges[0].node.name,
          leadImgSrc = node.featuredImage.node.sourceUrl,
          <>
            <div className="col-md-4 project__item" key={node.id}>
              <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                <div className={carousel.thumbnail_cont}>
                  <Link href={`/projects/${node.slug}`}>
                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                      <div className={`${carousel.full_thumb} full-thumb`}>
                        <Image
                          className={carousel.project_lead}
                          placeholder="blur"
                          loading="lazy"
                          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          src={leadImgSrc}
                          alt="project-lead"
                          layout="fill"
                          sizes="100vw" />
                      </div>
                      <span className="thumbnail-gif"></span>
                    </span>
                  </Link>
                </div>
                <Link href={`/projects/${node.slug}`}>
                  <span className={carousel.projectTitle}>{node.projectComponent.heading}
                    <span className={carousel.grey__color}>  / {client}</span>
                  </span>
                </Link>
              </div>
            </div>
          </>
        ))}

      </>

  }
  else {
    var relatedProject = ''
  }


  if (checkrelatedpost) {
    var relatedPost =

      <>
        {checkrelatedpost.map((data) => {
          var categories = data?.categories.edges[0]?.node?.name
          var featuredImage = data?.featuredImage?.node?.sourceUrl


          if (featuredImage) {
            var imageData =
              <span className={`${carousel.full_thumb} full-thumb`}>
                <Image
                  src={featuredImage}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  alt="post-lead"
                  layout="fill"
                  sizes="100vw" />
              </span>
          } else {
            imageData =
              <span className={`${carousel.full_thumb} full-thumb`}>

              </span>
          }
          return (
            <>
              <div className="col-md-4 project__item">
                <div className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}>
                  <div className={carousel.thumbnail_cont}>
                    <Link href={`/posts/${data.slug}`}>
                      <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                        {imageData}
                      </span>
                    </Link>
                  </div>
                  <Link href={`/posts/${data.slug}`}>
                    <span className={carousel.projectTitle}>{data.title}
                      <span className={carousel.grey__color}>  / {categories}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </>
          )
        })}
      </>

  }
  else {
    var relatedPost = ''
  }


  var date = new Date(post?.date).toLocaleDateString('en-IN', {
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
      <div className={` ${style.leadImage} fade-in `}>
        <Image
          src={featuredImage}
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
          className="full-lead-img"
          alt="post-lead"
          fill
          sizes="100vw" />
      </div>
  } else {
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

  const playAudio = async(audio) => {
      var file = document.getElementById(audio);

        var className = `.${audio}`
        if ($(className).hasClass('active')) {
            console.log('remove')
            $(className).removeClass('active');
        } else {
            $('.person-list li').removeClass('active');
            console.log('add')
            $(className).addClass('active');
        }

      file.currentTime = 0;
      if (file.paused) {
          document.querySelectorAll('audio').forEach(el => el.pause());
          console.log('play')
          file.load();
          file.play();
          // file.classList.add('active');
      } else {
          file.pause();
          // file.classList.remove('active');
          console.log('pause')
      }
  }

  const endFunction = async() => {
      document.querySelectorAll('li').forEach(el => el.classList.remove('active'));
  }


  const setRangeValue = async(value) => {
    console.log(value);
    setRange(value)
    $('.person-number').removeClass('show')
    $('.person' + range +'').addClass('show')
  }

  const rangeMinus = () => {

    if(range != 0){
      setRange(range - 1)
      console.log(range)
    }
  }

  const rangePlus = () => {
    if(range != 12){
      setRange(range + 1)
      console.log(range)
    }
  }


  var music_name = 
  <>
    {team?.edges?.map(({node} , i) => (
      <>
       {range == i &&  <ul className={`person${i} person-number`}>
          <li className={`p${i+1}`} onClick={() => playAudio(`p${i+1}`)}><span className="volume"></span>{node.music.artistFirst}</li>
          <li className={`p${i+2}`} onClick={() => playAudio(`p${i+2}`)}><span className="volume"></span>{node.music.artistSecond}</li>
          <li className={`p${i+3}`} onClick={() => playAudio(`p${i+3}`)}><span className="volume"></span>{node.music.artistThird}</li>
          <li className={`p${i+4}`} onClick={() => playAudio(`p${i+4}`)}><span className="volume"></span>{node.music.artistFourth}</li>
          <li className={`p${i+5}`} onClick={() => playAudio(`p${i+5}`)}><span className="volume"></span>{node.music.artistFifth}</li>
          <li><a href={node?.music?.playlistUrl} target="_blank" rel="noopener"><span className="playlist"></span>Go to playlist</a></li>
        </ul> }
      </>
    ))}
  </>

  var team_name = 
  <>
    {team?.edges?.map(({node} , i) => (
      <>
       {range == i &&  <span className={`person${i} person-number`}>{node?.title}</span>}
      </>
    ))}
  </>

  var team_img = 
  <>
    {team?.edges?.map(({node} , i) => (
      <>
     
       {range == i && <img className={`person${i} person-number`} src={node?.profileImage?.profileImageOnHover?.sourceUrl} alt="" />}
      </>
    ))}
  </>

  var music = 
  <>
    {team?.edges?.map(({node} , i) => (
      <>
       {range == i &&   <div className="audio">
          <audio onEnded={endFunction} preload="none" id={`p${i+1}`}
            src={node?.music.musicFirst}></audio>
          <audio onEnded={endFunction} preload="none" id={`p${i+2}`}
            src={node?.music.musicSecond}></audio>
          <audio onEnded={endFunction} preload="none" id={`p${i+3}`}
            src={node?.music.musicThird}></audio>
          <audio onEnded={endFunction} preload="none" id={`p${i+4}`}
            src={node?.music.musicFourth}></audio>
          <audio onEnded={endFunction} preload="none" id={`p${i+5}`}
            src={node?.music.musicFifth}></audio>
      </div> }
      </>
    ))}
  </>

  var interaction =  
    <>
      <div className="interaction-element">
        <img className='radio-img  d-none d-md-block' src="https://digital.icdindia.com/wp-content/uploads/2023/05/Radio-1-2.png" alt="" />
        <img className='radio-img  d-block d-md-none' src="https://digital.icdindia.com/wp-content/uploads/2023/05/Frame-24-1.png" alt="" />
          <span className='d-block d-md-none left-btn range-btn' onClick={rangeMinus}></span>
            <input type="range" min="0" max="12" className="slider" value={range} onChange={(e) => setRangeValue(e.target.value)} />
          <span className='d-block d-md-none right-btn range-btn' onClick={rangePlus}></span>
        <div className="person-list">
          {music_name}
        </div>
        <div className="person-img">
            {team_img}
        </div>

      <div className="person-name">
          {team_name}
      </div>
      </div>
      {music}
    </>

  return (
    <>
      {mounted && (
        <>
      <Seo seo={seo} uri={uri} />
      <section className={`${style.singlePost} singlePost mT__260`} key={post.id}>
        <div className="images-loaded-container">
          {imageData}
        </div>
        <div className={style.postContent_cont}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2">
                <div className={style.posts__container}>
                  <div className={style.post__tag}>
                    <span className={style.yellow__tag}>{categories}</span>
                  </div>
                  <h1>{post.title}</h1>
                  <div className={style.post__author}>
                    <div className={style.author_wrapper}>
                      <span className={`sl ${style.author__img}`}><img loading="lazy" alt='icd-icon' decoding="async" src={authorImg ? authorImg.sourceUrl : Icon.src} >
                      </img></span>
                      <span className={` ${style['post-detail']} `}>{author} / {date} / {categories} </span>
                    </div>

                    <div className={` ${style.social__media} ${style.header_socialmedia} social__media  `}>
                      <span className="icon share-icon icons-hide"><a href={linkedinUrl} className="linkedin-icon" target="_blank"></a></span>
                      <span className="icon share-icon icons-hide"><a href={twitterUrl} className="twitter-icon" target="_blank"></a></span>
                      <span className="icon share-icon icons-hide"><a href={fbUrl} className="fb-icon" target="_blank"></a></span>
                      <span className="icon" onClick={toggleShareIcons}><img loading="lazy" alt='icd-icon' decoding="async" src={Share.src} width="20" height="20" className="icon-img shareIcon--main" />share</span>
                      <Like count={post.likes?.likes} id={post.id} type={'post'} />
                    </div>

                  </div>
                  <div className={`${style.postContent} postContent`}>
                    {post?.content && parse(post?.content)}
                    {interaction}
                  </div>
                </div>
                <div className={` ${style.social__media} social__media `}>
                  <span className="icon share-icon icons-hide"><a href={linkedinUrl} className="linkedin-icon" target="_blank"></a></span>
                  <span className="icon share-icon icons-hide"><a href={twitterUrl} className="twitter-icon" target="_blank"></a></span>
                  <span className="icon share-icon icons-hide"><a href={fbUrl} className="fb-icon" target="_blank"></a></span>
                  <span className="icon" onClick={toggleShareIcons}><img loading="lazy" alt='icd-icon' decoding="async" src={Share.src} width="20" height="20" className="icon-img shareIcon--main" />share</span>
                  <Like count={post.likes?.likes} id={post.id} type={'post'} />
                </div>

                {relatedPost &&
                  <div className={style.relatedProjects__container}>
                    <span className={style.relatedProjects__head}>related </span>
                    <section className={`${type.industry__filter} ${type.all_filter} `}>
                      <div className="project__scroll">
                        <div className="row project__row">
                          {relatedProject}
                          {relatedPost}
                        </div>
                      </div>
                    </section>
                  </div>
                }


                <div className="post__navigation">
                  <div className="row">
                    <div className="col-md-6 ">
                      {post?.next && <PrevPost data={post?.next} />}
                    </div>
                    <div className="col-md-6">
                      {post?.previous && <NextPost data={post?.previous} />}
                    </div>
                  </div>
                </div>
                {/* <Comment postId={post.postId} comment_data={comment_data} /> */}
              </div>
            </div>
          </div>
        </div>
      </section>


      </>
      )}
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

export async function getStaticProps({ preview = false, params, previewData }) {
  const Moredata = await getPostAndMorePosts(params.slug, preview, previewData)
  // const menus = await getMenus()
  const data = await getFooter()
  // const filters = await getFilters()
  return {
    props: {
      post: Moredata.post,
      posts: Moredata.posts,
      preview,
      // menus,
      data
      // filters
    },
    revalidate: 2,
  }
}
