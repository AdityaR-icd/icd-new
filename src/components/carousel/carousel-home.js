"use client";

import styles from "./carousel.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import Slider from "react-slick";

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f6f6f6" offset="20%" />
        <stop stop-color="#f0f0f0" offset="50%" />
        <stop stop-color="#f6f6f6" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#F6F6F6" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
  </svg>`;

const blurUrl = `data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`;

function playActiveVideos(sliderEl) {
  if (!sliderEl) return;
  sliderEl.querySelectorAll(".slick-slide video").forEach((v) => {
    v.pause();
    v.currentTime = 0;
  });
  sliderEl.querySelectorAll(".slick-active video").forEach((v) => {
    v.play().catch(() => {});
  });
}

const SlickArrowLeft = ({ ...props }) => (
  <button {...props} className="slick-prev slick-arrow" type="button">
    Previous
  </button>
);

const SlickArrowRight = ({ ...props }) => (
  <button {...props} className="slick-next slick-arrow" type="button">
    Next
  </button>
);

export default function Carousel({ edges }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderContainerRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    fade: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 991,
        settings: { swipeToSlide: true, arrows: false },
      },
    ],
    onInit: () => {
      if (typeof window !== "undefined") {
        setTimeout(() => playActiveVideos(sliderContainerRef.current), 100);
      }
    },
    afterChange: (slide) => {
      playActiveVideos(sliderContainerRef.current);
      setCurrentSlide(slide + 1);
    },
  };

  const otherProjectsSlider = edges.map((node, j, { length }) => {
    const projectVideo =
      node?.projectComponent?.carouselVideoDesktop?.mediaItemUrl;
    const projectVideoMobile =
      node?.projectComponent?.carouselVideoMobile?.mediaItemUrl;
    const projectThumbnail = node?.projectComponent?.carouselImage?.sourceUrl;
    const projectThumbnailMobile =
      node?.projectComponent?.carouselImageMobile?.sourceUrl;

    return (
      <div className={styles.lead_video_cont} key={node.id}>
        <Link
          className="project_link"
          href={`/projects/${node?.slug}`}
          prefetch={true}
        >
          <div className={styles.project___section}>
            {projectVideo && (
              <div className="d-none d-lg-block">
                <video
                  src={`${projectVideo}#t=0.02`}
                  playsInline
                  loop
                  muted
                  poster={blurUrl}
                />
              </div>
            )}

            {projectVideoMobile && (
              <div className="d-lg-none">
                <video
                  src={`${projectVideoMobile}#t=0.02`}
                  playsInline
                  loop
                  muted
                  poster={blurUrl}
                />
              </div>
            )}

            {projectThumbnailMobile && (
              <div className="d-lg-none">
                <Image
                  priority={j === 0}
                  placeholder="blur"
                  blurDataURL={blurUrl}
                  src={projectThumbnailMobile}
                  alt="project-lead"
                  fill
                  sizes="100vw"
                />
              </div>
            )}

            {projectThumbnail && (
              <div className="d-none d-lg-block">
                <Image
                  priority={j === 0}
                  placeholder="blur"
                  blurDataURL={blurUrl}
                  src={projectThumbnail}
                  alt="project-lead"
                  fill
                  sizes="(max-width: 991px) 100vw, 100vw"
                />
              </div>
            )}
          </div>

          <div className="about-project-container">
            <div className="row">
              <div className="col-md-2" />
              <div className="project-title-container offset-md-2">
                <div className="wrapper">
                  <h1 className="project-title">{node.title}</h1>
                  <span className="slide-count d-none d-md-block">
                    {currentSlide}/{length + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <section className={`${styles.heroCarousel} hero-carousel mB__150`}>
      <div className={styles.homelead_thumbnail} ref={sliderContainerRef}>
        <Slider {...settings}>
          <div className={`${styles.lead_video_cont} lead_carousel_video`}>
            <Link className="project_link" href={`/services`} prefetch={true}>
              <div className={styles.project__section}>
                <h1 className="offset-md-2">
                  ICD serves marketing, branding and editorial functions, on
                  screen, in print, on shelf or anywhere, really; with visual
                  design, or a concept.
                </h1>
              </div>
              <div className="about-project-container">
                <div className="row">
                  <div className="col-md-2" />
                  <div className="project-title-container offset-md-2">
                    <div className="wrapper">
                      <h1 className="project-title">let&apos;s talk</h1>
                      <span className="slide-count d-none d-md-block">
                        {currentSlide}/{edges.length + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {otherProjectsSlider}
        </Slider>
      </div>

      <div className={styles.carouselShape__block}>
        <div className="container-fluid">
          <div className="row">
            <div className={`col-md-2 ${styles.carouselBlock__1}`} />
            <div
              className={`col-md-8 offset-md-2 ${styles.carouselBlock__2}`}
            />
          </div>
        </div>
      </div>

      <span className="slide-count mobile-only d-block d-lg-none">
        {currentSlide}/{edges.length + 1}
      </span>
    </section>
  );
}
