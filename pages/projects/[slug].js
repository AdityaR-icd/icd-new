import parse from 'html-react-parser';
import { getAllProjectsWithSlug, getProject, getFooter, getAllProjectsNotIn } from '../../lib/api'
import { useRouter } from 'next/router'
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react'

// Import Slider
import Slider from "react-slick";

import Share from '../../assets/images/post-buttons/share.svg'
const Like = dynamic(() => import("../../components/like"));
const Seo = dynamic(() => import("../../components/seo"));
const All = dynamic(() => import("../../components/project-categories/all/all"));
import carousel from '../../components/project-categories/all/all.module.scss'
import type from '../../components/project-categories/type/type.module.scss'

import $ from 'jquery';
import { useMediaQuery } from 'react-responsive';
import style from '../../styles/singleProject.module.scss'




export default function Projects({ project }) {
  const router = useRouter()
  let fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + window?.location.origin + router.asPath
  let twitterUrl = 'https://twitter.com/intent/tweet?text="' + project?.title + '"&url=' + window?.location.origin + router.asPath
  let linkedinUrl = 'https://www.linkedin.com/shareArticle?mini=true&url="' + window?.location.origin + router.asPath + '"&title=' + project?.title;
  const seo = project ? (project?.seo ?? {}) : ({});
  const uri = project ? (project?.uri ?? {}) : ({});
  // console.log(uri)


  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const showModal = () => {
    $('.project_details_modal').removeClass(`${style.hide_popup}`);
    $('body').addClass(`project_detail_active`);
  }

  const hideModal = () => {
    $('.project_details_modal').addClass(`${style.hide_popup}`);
    $('body').removeClass(`project_detail_active`);
  }

  const toggleShareIcons = () => {
    $('.share-icon').toggleClass('icons-hide');
  }

  var projectIds = project?.projectId
  var categorySlug = project?.projectTypes.edges[0]?.node?.slug
  // var categoryId = project?.projectTypes?.edges[0]?.node?.databaseId
  const [project_slider, setproject_slider] = useState('')
  const [project_slider1, setproject_slider1] = useState('')
  useEffect(() => {

    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        $('.project_details_modal').addClass(`${style.hide_popup}`);
        $('body').removeClass(`project_detail_active`);
      }
    })

    async function fetchMyAPI() {
      const slides_data = await getAllProjectsNotIn(projectIds, categorySlug)


      // const slides_dat1 = await getAllOtherProjects(categoryId)
      setproject_slider(slides_data)
      // setproject_slider1(slides_dat1)
    }

    fetchMyAPI()

  }, []);

const toBase64 = (str) => typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs><linearGradient id="g"><stop stop-color="#f6f6f6" offset="20%" /><stop stop-color="#f0f0f0" offset="50%" /><stop stop-color="#f6f6f6" offset="70%" /></linearGradient></defs><rect width="${w}" height="${h}" fill="#F6F6F6" /><rect id="r" width="${w}" height="${h}" fill="url(#g)" /><animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

  var other_projects = project_slider?.edges
  var other_projects1 = project_slider1?.edges
  var other_projects2 = []
  if (other_projects1?.length > 0) {
    other_projects1.map(({ node }) => {
      if (node.projects?.edges?.length > 0) {
        other_projects2.push(node?.projects?.edges)
      }
    })
  }


  if (other_projects?.length > 0) {
    other_projects = project_slider?.edges[0]?.node?.projects.edges ?? []
    other_projects1 = other_projects2


    var other_projects_slider = other_projects?.map(({ node }) => {
      var leadImgSrc = node?.featuredImage?.node?.sourceUrl
      var client = node?.clients?.edges[0]?.node.name
      return <>
        <div className="project__item resultItem-cont" key={node?.id}>
          <div className={`${carousel.projectCarousel} ${style.postsItems} ${type.projectCarousel}`}>
            <div className={`${carousel.thumbnail_cont} ${style.postLeadImage}`}>
              <Link href={`/projects/${node?.slug}`}>
                <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                  <div className={`${carousel?.full_thumb} full-thumb`}>
                    {leadImgSrc && (
                      <Image
                        // ={true}
                        
                        
                        className={carousel?.project_lead}
                        src={leadImgSrc}
                        alt="project-lead"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                        layout="fill"
                        />
                    )}
                  </div>
                  <span className="thumbnail-gif"></span>
                </span>
              </Link>
            </div>
            <Link href={`/projects/${node?.slug}`}>
              <span className={carousel.projectTitle}>{node?.projectComponent?.heading}
                <span className={carousel.grey__color}>  / {client}</span>
              </span>
            </Link>
          </div>
        </div>
      </>;
    })
  }


  const [seeAll, setseeAll] = useState('see all')

  const seeallTeam = () => {
    if (seeAll === 'see all') {
      setseeAll('see less');
      $('.team__content').addClass(`${style.ellipsis}`);
    } else {
      setseeAll('see all');
      $('.team__content').removeClass(`${style.ellipsis}`);
    }
  }


  var title = project?.title;
  var heading = project?.projectComponent?.heading;
  var description = project?.projectComponent?.description;
  var shortDesc = project?.shortDescription?.shortDesc;
  var projectLink = project?.shortDescription?.siteLink
  var clients = project?.clients?.edges[0]?.node?.name;
  var allclients = project?.clients?.edges.length
  var leadComponent = project?.projectComponent?.leadComponent?.sourceUrl
  var leadComponentMobile = project?.projectComponent?.leadComponentMobile?.sourceUrl
  var content = project?.content
  var team = project?.projectComponent?.details
  var category = project?.projectTypes?.edges[0]?.node?.name
  var awards = project?.projectComponent?.awardsReceived
  var awardName = project?.projectComponent?.nameOfTheAwardEgC
  var relatedProjects = project?.projectComponent?.relatedprojects ?? []


  var relatedProjects_slider = relatedProjects?.map((node) => {

    var leadImgSrc = node?.featuredImage?.node?.sourceUrl
    var client = node?.clients?.edges[0]?.node.name
    var categories = node?.categories?.edges[0]?.node.name
    var url

    if (node?.uri) {
      url = `/projects/${node?.slug}`
    } else {
      url = `/posts/${node.slug}`
    }

    // console.log(url)


    return <>
      <div className="project__item resultItem-cont" key={node?.id}>
        <div className={`${carousel.projectCarousel} ${style.postsItems} ${type.projectCarousel}`}>
          <div className={`${carousel.thumbnail_cont} ${style.postLeadImage}`}>
            <Link href={url} >
              <span className={`${carousel?.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                <div className={`${carousel.full_thumb} full-thumb`}>
                  <Image
                    // priority={true}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                    className={carousel?.project_lead}
                    src={leadImgSrc || 'https://digital.icdindia.com/wp-content/uploads/2023/04/Jack-Daniels-Gentleman-Jack-Components2-2048x1280.jpg'}
                    alt="project-lead"
                    layout="fill"
                    sizes="100vw" />
                </div>
                <span className="thumbnail-gif"></span>
              </span>
            </Link>
          </div>
          <Link href={url} >
            <span className={carousel?.projectTitle}>{node?.projectComponent?.heading || node?.title}
              <span className={carousel.grey__color}>  / {client || categories}</span>
            </span>
          </Link>
        </div>
      </div>
    </>;
  }).slice(0, 3)

  if (awards) {
    var leadImgSrc = project?.projectComponent?.awardsImage?.sourceUrl
    var awardImg = <Image
      priority={true}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
      className={` ${carousel.project_lead} d-none d-md-block `}
      src={leadImgSrc || 'https://digital.icdindia.com/wp-content/uploads/2023/04/Jack-Daniels-Gentleman-Jack-Components2-2048x1280.jpg'}
      alt="project-lead"
      filayout="fill" ll
      sizes="100vw" />
  }

  if (project?.projectComponent?.awardsImageMobile) {
    var mobile_image = project?.projectComponent?.awardsImageMobile?.sourceUrl
    var awardImgMobile = <Image
      // priority={true}
      loading="lazy"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
      className={` ${carousel.project_lead} d-block d-md-none `}
      src={leadImgSrc || 'https://digital.icdindia.com/wp-content/uploads/2023/04/Jack-Daniels-Gentleman-Jack-Components2-2048x1280.jpg'}
      alt="project-lead"
      layout="fill"
      sizes="100vw" />
  }

  if (project?.projectComponent?.leadVideo) {
    var leadVideo = project?.projectComponent?.video?.mediaItemUrl
    var leadVideo_mobile = project?.projectComponent?.videoMobile?.mediaItemUrl
  }


  var shareBtn = <div className={`${style.social__media} social__media`}>
    <span className="icon share-icon icons-hide"><a href={linkedinUrl} rel="noopener" aria-label="icd" className="linkedin-icon" target="_blank"></a></span>
    <span className="icon share-icon icons-hide"><a href={twitterUrl} rel="noopener" aria-label="icd" className="twitter-icon" target="_blank"></a></span>
    <span className="icon share-icon icons-hide"><a href={fbUrl} rel="noopener" aria-label="icd" className="fb-icon" target="_blank"></a></span>
    <span className="icon" onClick={toggleShareIcons}><img loading='lazy' alt='icd' decoding="async" src={Share.src} width="20" height="20" className="icon-img shareIcon--main" />share</span>
    <Like count={project?.likes?.likes} id={project.id} type={'project'} />
  </div>;

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      Previous
    </button>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 3 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 3 ? true : false}
      type="button"
      slide={slideCount}
      currentSlide={currentSlide}
    >
      Next
    </button>
  );


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    // afterChange: () => carouselArrowClick(),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        }
      }

    ]
  };
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true)
  // }, [])
  return <>
    {/* {mounted && (
      <> */}
    <Seo seo={seo} uri={uri} />

    {leadComponent && (
      <section className={style.singleProjectLeadCont}>
        <div className={style.leadImage}>
          <div className={style.images_loaded_container}>

            <Image
              src={leadComponent}
              priority={true}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
              alt="project-lead"
              layout="fill"
              className='d-none d-md-block'
              sizes="100vw" />


            <Image
              src={leadComponentMobile}
              priority={true}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
              alt="project-lead"
              layout="fill"
              className='d-block d-md-none'
              sizes="100vw" />

          </div>
        </div>
      </section>
    )}

    {leadVideo && (
      <section className={style.singleProjectLeadCont}>
        <div className={style.leadImage}>
          <div>
            <video src={leadVideo} className={`${style.video} d-none d-md-block`} autoPlay loop muted playsInline />
            <video src={leadVideo_mobile} className={`${style.video} d-block d-md-none`} autoPlay loop muted playsInline />
          </div>
        </div>
      </section>
    )}

    <article className={` ${style.singleProject} ${awards && style.winnerTag} singleProject`}>
      <div className={` project_details_modal ${style.project_details_modal} ${style.hide_popup}`}>
        <div className="container">
          <div className="row">
            <span className={`close-button ${style.close_button}`} onClick={hideModal}></span>
            <div className="col-lg-5 col-xl-4">
              <span className={style.modal_project_title}>{title}
                {awards && (
                  <span className="project__tag">Winner</span>
                )}
              </span>
              <div className={style.projectMeta__cont}>
                <span className={style.category__title}>project</span>
                <span className={style.category}>{heading}</span>
              </div>
              <div className={style.projectMeta__cont}>
                <span className={style.category__title}>client</span>
                <span className={style.category}>{clients}</span>
              </div>
            </div>
            <div className="col-lg-6 col-xl-7">
              <div>
                {description && (
                  parse(description)
                )}
              </div>
              <div className={style.projectContent__footer}>
                <button onClick={hideModal}>close</button>
                {shareBtn}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${style.projectHeading}`}>
        <div className="row">
          <div className="col-12 offset-md-3 col-md-8 col-xl-8 offset-xl-4">
            <div className={style.titlePadding}>
              <h1 className={style.project__Title}>{title}
                {awards && (
                  <span className={`${style.project__tag} project__tag`}>Winner</span>
                )}
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 offset-md-3 col-md-8 col-xl-8 offset-xl-4">
            <div className={style.projectMeta__cont}><span className={style.category__title}>project</span><span className={style.category}>{heading}</span></div>
            <div className={style.projectMeta__cont}><span className={style.category__title}>client</span><span className={style.category}>{project?.clients?.edges?.map((data , i)=>{
                  if (allclients === i + 1) {
                    return(data?.node?.name);
                  } else {
                    return(data?.node?.name + ', ');
                  }
               }) }</span></div>
            {projectLink && (
              <div className={style.projectMeta__cont}><span className={style.category__title}>view</span><span className={style.category}><a href={projectLink?.url} rel="noopener" aria-label="icd" target={projectLink?.target}>{projectLink?.title}</a></span></div>
            )}
            {project?.projectComponent?.awardsReceived > '' && (
              <>
                <div className={style.projectMeta__cont}><span className={style.category__title}>awards</span><span className={style.category}>{awardName}</span></div>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12 offset-md-3 col-md-8 col-xl-8 offset-xl-4">
            <div className={style.project__summary}>
              <div className={style.intro_para}>
                <div>
                  {shortDesc && (
                    parse(shortDesc)
                  )}
                </div>
              </div>
              <button className={style.collapse__btn} onClick={showModal}>project detail</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${style.projectWordpress}`}>
        {awardImg && (
          <div className='col-md-12'>
            <span className="awardImg-cont">
              {awardImg}
              {awardImgMobile}
            </span>
          </div>
        )}

        {content && (
          parse(content)

          // $('.wp-block-video.controls')
        )}
        {shareBtn}
      </div>
      <div className="container">
        <div className="col-12 offset-md-3 col-md-8 col-xl-8 offset-xl-4">
          <div className={style.team__block}>
            <span className={style.team}>team</span>
            <div className={` team__content ${style.team__content}`}>
              <div className={style.team__detail}>
                {team && (
                  parse(team)
                )}
              </div>
            </div>
            <a className={style.team__seeAll} rel="noopener" aria-label="icd" onClick={seeallTeam}>{seeAll}</a>
            <button className="collapse__btn" onClick={showModal}>project detail</button>
          </div>
        </div>
      </div>

      {relatedProjects_slider?.length > 0 && (
        <div className={`container slider-container ${style.relatedProjects__container}`}>
          <div className={style.more__projects_block}>
            <div className={`more_cont ${style['more_cont']}`}>
              <span className={style.more__projects_head} id="more-projectTitle">related</span>
              <span className={`${style.see_all} see-all`}>
                <Link href={`/projects/type/all`}>see all</Link>
              </span>
            </div>
            <span className="bottom__border"></span>
            <div className="more-projectsCarousel">
              <Slider {...settings}>
                {relatedProjects_slider}
              </Slider>
            </div>
          </div>
        </div>
      )}

      {other_projects?.length > 0 && (
        <div className='container slider-container'>
          <div className={style.more__projects_block}>
            <div className={`more_cont ${style['more_cont']}`}>
              <span className={style.more__projects_head} id="more-projectTitle">more {category}</span>
              <span className={`${style.see_all} see-all`}>
                <Link href={` /projects/category/${categorySlug} `}>see all</Link>
              </span>
            </div>
            <span className="bottom__border"></span>
            <div className="more-projectsCarousel">
              <Slider {...settings}>
                {other_projects_slider}
              </Slider>
            </div>
          </div>
        </div>
      )}

    </article>
    {/* </>
    )} */}
  </>
}

export async function getStaticProps({ params }) {
  const gProject = await getProject(params.slug)
  const data = await getFooter()
  return {
    props: {
      project: gProject.project,
      // menus,
      data,
      // filters,
    },
    revalidate: 2,
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug()
  return {
    paths: allProjects.edges.map(({ node }) => `/projects/${node.slug}`) || [],
    fallback: true,
  }
}


