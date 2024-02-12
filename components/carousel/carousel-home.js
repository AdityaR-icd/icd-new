import styles from './carousel.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useState , useEffect } from 'react';
// Import Sliderp
import Slider from "react-slick";
import $ from 'jquery'
export default function carousel({content , edges , latestProject }){
    
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
        {...props}
        className={
            "slick-prev slick-arrow"
        }
        aria-hidden="true"
        // aria-disabled={currentSlide === 0 ? true : false}
        type="button"
        >
        Previous
        </button>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
        {...props}
        className={
            "slick-next slick-arrow" 
        }
        aria-hidden="true"
        // aria-disabled={currentSlide === slideCount - 3 ? true : false}
        type="button"
        // slide={slideCount}
        // currentSlide={currentSlide}
        >
        Next
        </button>
    );

    // var videosrc = "https://player.vimeo.com/video/736122279?background=1&quality=1080p&playsinline=1";
    // var mobilevideosrc = "https://player.vimeo.com/video/736122794?background=1&quality=1080p&playsinline=1";
    const [currentSlide, setcurrentSlide] = useState(1) 
    const [slideCounts, setslideCount] = useState(1)    

    const settings = {
        dots: false,
        infinite: true,
        // speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: true,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        fade: true,
        autoplay: true,
        speed: 400,
        autoplaySpeed: 1000,
        cssEase: "ease-in-out",
        // adaptiveHeight: true,
        // afterChange :
        //     (currentSlide) => 
        //       setcurrentSlide(currentSlide + 1),
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    // autoplaySpeed: 2000,
                    swipeToSlide: true,
                    arrows: false
                }
            },
        ],
        onInit: () => {
            if(typeof window !== "undefined"){
                console.log('init')
                $('.slick-active').find('video')?.get(0)?.play();
                $('.slick-active').find('video')?.get(1)?.play();
            }
           
        },
        beforeChange: () => {
            // setcurrentSlide(currentSlide + 1),
            // var videos = $(".slick-slide");
            // $(videos).find(".slick-slide)
            // console.log('change before')
            // $('.slick-slide').find('video').get(0).pause();
            //  $('.slick-active').find('video').get(0).play();
            // $('.slick-slide').find('video').get(0).currentTime = 0;
            // $('.slick-active').find('video').get(0).play();
        }, 
        
        afterChange: (currentSlide) => {
            let videos = $(".slick-slide");
            // let videos_active = $(".slick-active");
            videos.each(function(i, el) {
                $('.slick-slide').find('video').get(0).pause();
                $('.slick-slide').find('video').get(0).currentTime = 0;
            });
            console.log(currentSlide)
             setcurrentSlide(currentSlide + 1)
                // $('.slick-slide').find('video').get(0).pause();
                // console.log('function run')

                // $('.slick-slide').find('video').get(0).currentTime = 0;
                // $('.slick-active').find('video').get(0).currentTime = 0;
                $('.slick-active').find('video')?.get(0)?.play();
                $('.slick-active').find('video')?.get(1)?.play();

                // console.log($('.slick-active').find('video'))
               
            }
    };


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
    let project_video = ""
    let project_video_mobile = ''
    let project_thumbnail = ""
    let project_thumbnail_mobile = ""
    let slideCount 
    let text = ''

    var other_projects_slider = 
    


    edges.map(( node  , j , {length}) => {

        
        slideCount = length
        project_video = node?.projectComponent?.carouselVideoDesktop?.mediaItemUrl
        project_video_mobile = node?.projectComponent?.carouselVideoMobile?.mediaItemUrl
        project_thumbnail = node?.projectComponent?.carouselImage?.sourceUrl
        project_thumbnail_mobile = node?.projectComponent?.carouselImageMobile?.sourceUrl
        
        // console.log(j)
        // setslideCount({length})

        // and empty div for the last slide

        return <>
            <div className={styles.lead_video_cont} key={node.id}>
                <Link className="project_link" href={`/projects/${node?.slug}`}>

                    <div className={`${styles.project___section}`}>
                               
                            {project_video && (
                                <>
                                    <div className="d-none desktop d-lg-block">
                                        <video src={`${project_video}#t=0.02`} playsInline loop muted poster={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}></video>
                                    </div>
                                </>
                            )}

                            {project_video_mobile && (
                                <>
                                    <div className={` d-lg-none mobile d-block`}>
                                        <video src={`${project_video_mobile}#t=0.02`} playsInline loop muted poster={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}></video>
                                    </div>
                                </>
                            )}

                            {project_thumbnail_mobile && (
                                <div className={` d-lg-none d-block`}>
                                    <Image
                                        unoptimized={true}
                                        priority={true}
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                                        src={project_thumbnail_mobile}
                                        alt="project-lead"
                                        layout="fill"
                                        sizes="100vw" />
                                </div>
                            )}

                            {project_thumbnail && (
                                <div className="d-none d-lg-block">
                                    <Image
                                        unoptimized={true}
                                        priority={true}
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                                        src={project_thumbnail}
                                        alt="project-lead"
                                        layout="fill"
                                        sizes="100vw" />
                                </div>
                            )}

                    </div>
                    <div className='about-project-container'>
                        <div className='row'>
                            <div className='col-md-2' />
                            <div className='project-title-container offset-md-2'>
                                <div className='wrapper'>
                                
                                    <h1 className='project-title'>{node.title}</h1>
                                    <span className='slide-count d-none d-md-block'> {currentSlide}/{slideCount + 1}  </span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>

    })





    return(
        <section className={`${styles.heroCarousel} hero-carousel mB__150`}>
            <div className={styles.homelead_thumbnail}>
                {/* <span className={styles.loading}>loading</span> */}
                {(
                    <Slider {...settings}>
                        <div className={`${styles.lead_video_cont} lead_carousel_video`}>
                            <Link className="project_link" href={`/services`}>
                                <div className={`${styles.project__section}`}>
                                    <span className='col-md-2  d-none d-lg-block'></span>
                                    <h1 className='offset-md-2'>ICD serves marketing, branding and editorial functions, on screen, in print, on shelf or anywhere, really; with visual design, or a concept.</h1>      
                                </div>
                                <div className='about-project-container'>
                                    <div className='row'>
                                        <div className='col-md-2' />
                                        <div className='project-title-container offset-md-2'>
                                            <div className='wrapper'>
                                            
                                                <h1 className='project-title'>let’s talk</h1>
                                                <span className='slide-count d-none d-md-block'> {currentSlide}/{slideCount + 1}  </span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {other_projects_slider}

                    </Slider>
                )}
            </div>
            <div className={`${styles.carouselShape__block}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className={`col-md-2 ${styles.carouselBlock__1}`}></div>
                        <div className={`col-md-8 offset-md-2 ${styles.carouselBlock__2}`}>
                        
                        </div>
                    </div>
                </div>
            </div>
            <span className='slide-count mobile-only d-block d-lg-none'> {currentSlide}/7  </span>
        </section>
    )
}