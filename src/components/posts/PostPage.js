"use client";

import parse from "html-react-parser";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Share from "../../assets/images/post-buttons/share.svg";
import Icon from "../../assets/images/logo/default-author.jpeg";

import style from "../../styles/singlePost.module.scss";
import carousel from "../../components/project-categories/all/all.module.scss";
import type from "../../components/project-categories/type/type.module.scss";
import Seo from "../../components/seo";
import Like from "../../components/like";
import NextPost from "../../components/posts/next-post";
import PrevPost from "../../components/posts/prev-post";
import MusicArticle from "../../components/music-article/music";

export default function PostPage({ post, teamData }) {
  const pathname = usePathname();
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [range, setRange] = useState(0);
  const audioRefs = useRef([]);

  const seo = post ? post?.seo ?? {} : {};
  const uri = post ? post?.uri ?? {} : {};

  const featuredImage = post?.leadComponentPost?.leadComponent?.sourceUrl;
  const categories = post?.categories?.edges[0]?.node?.name;
  const checkauthor = post?.postAuthor?.postAuthor;
  const checkrelatedpost = post?.relatedPost?.relatedBlog;
  const checkrelatedproject = post?.relatedPost?.relatedProject;

  const [interactionArticle, setinteractionArticle] = useState(
    post?.musicArticle?.interactive
  );

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs><linearGradient id="g"><stop stop-color="#f6f6f6" offset="20%" /><stop stop-color="#f0f0f0" offset="50%" /><stop stop-color="#f6f6f6" offset="70%" /></linearGradient></defs><rect width="${w}" height="${h}" fill="#F6F6F6" /><rect id="r" width="${w}" height="${h}" fill="url(#g)" /><animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const location = "https://www.icdindia.com";
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${location}${pathname}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text="${post?.title}"&url=${location}${pathname}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${location}${pathname}&title=${post?.title}"&source=LinkedIn`;

  useEffect(() => {
    const blockquotes = document.querySelectorAll("blockquote");
    blockquotes.forEach((blockquote) => {
      const fbpageURL = `https://www.facebook.com/sharer/sharer.php?u=${location}${pathname}`;
      const twitterpageURL = `https://twitter.com/intent/tweet?text="${post?.title}"&url=${location}${pathname}`;
      const fbshareurl = `<a href='${fbpageURL}' class='fb-share fb-icon' target='_blank'></a>`;
      const twittershareurl = `<a href='${twitterpageURL}' class='twitter-share twitter-icon' target='_blank'></a>`;
      blockquote.innerHTML += fbshareurl + twittershareurl;
    });
  }, [pathname, post?.title]);

  const author = checkauthor
    ? post?.postAuthor?.postAuthor[0]?.title || "icd studios"
    : "icd studios";
  const authorImg = checkauthor
    ? post?.postAuthor?.postAuthor[0]?.profileImage?.profileImage
    : null;

  const relatedProject = checkrelatedproject?.map((node) => {
    const client = node?.clients?.edges[0]?.node.name;
    const leadImgSrc = node.featuredImage.node.sourceUrl;
    return (
      <div className="col-md-4 project__item" key={node?.id}>
        <div
          className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}
        >
          <div className={carousel.thumbnail_cont}>
            <Link prefetch={true} href={`/projects/${node.slug}`}>
              <span
                className={`${carousel.projectThumbnail} fade-in`}
                style={{ width: "100%" }}
              >
                <div className={`${carousel.full_thumb} full-thumb`}>
                  <Image
                    unoptimized={true}
                    className={carousel.project_lead}
                    placeholder="blur"
                    priority={true}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(500, 500)
                    )}`}
                    src={leadImgSrc}
                    alt="project-lead"
                    layout="fill"
                    sizes="100vw"
                  />
                </div>
                <span className="thumbnail-gif"></span>
              </span>
            </Link>
          </div>
          <Link prefetch={true} href={`/projects/${node.slug}`}>
            <span className={carousel.projectTitle}>
              {node.projectComponent.heading}
              <span className={carousel.grey__color}> / {client}</span>
            </span>
          </Link>
        </div>
      </div>
    );
  });

  const relatedPost = checkrelatedpost?.map((data) => {
    const categories = data?.categories.edges[0]?.node?.name;
    const featuredImage = data?.featuredImage?.node?.sourceUrl;
    const imageData = featuredImage ? (
      <span className={`${carousel.full_thumb} full-thumb`}>
        <Image
          unoptimized={true}
          src={featuredImage}
          priority={true}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 500)
          )}`}
          alt="post-lead"
          layout="fill"
          sizes="100vw"
        />
      </span>
    ) : (
      <span className={`${carousel.full_thumb} full-thumb`}></span>
    );

    return (
      <div className="col-md-4 project__item" key={data?.slug}>
        <div
          className={`${carousel.projectCarousel} ${type.projectCarousel} ${style.projectCarousel}`}
        >
          <div className={carousel.thumbnail_cont}>
            <Link href={`/posts/${data.slug}`}>
              <span
                className={`${carousel.projectThumbnail} fade-in`}
                style={{ width: "100%" }}
              >
                {imageData}
              </span>
            </Link>
          </div>
          <Link prefetch={true} href={`/posts/${data.slug}`}>
            <span className={carousel.projectTitle}>
              {data.title}
              <span className={carousel.grey__color}> / {categories}</span>
            </span>
          </Link>
        </div>
      </div>
    );
  });

  const date = new Date(post?.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imageData = featuredImage ? (
    <div className={` ${style.leadImage} fade-in `}>
      <Image
        unoptimized
        src={featuredImage}
        priority={true}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
        className="full-lead-img"
        alt="post-lead"
        fill
        sizes="100vw"
      />
    </div>
  ) : (
    <div className={style.leadImage}></div>
  );

  const toggleShareIcons = () => {
    setShowShareIcons(!showShareIcons);
  };

  const playAudio = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i === index) {
        if (audio.paused) {
          audio.load();
          audio.play();
        } else {
          audio.pause();
        }
      } else {
        audio.pause();
      }
    });
  };

  const endFunction = () => {
    // This function can be implemented if needed
  };

  const setRangeValue = (value) => {
    setRange(value);
  };

  const rangeMinus = () => {
    if (range > 0) {
      setRange(range - 1);
    }
  };

  const rangePlus = () => {
    if (range < 12) {
      setRange(range + 1);
    }
  };

  const radioSvg = teamData?.edges?.map(({ node }, i) => (
    <div className="interaction-element" key={i}>
      <MusicArticle range={range} i={i} node={node} />
      <span
        className="d-block d-md-none left-btn range-btn"
        onClick={rangeMinus}
      ></span>
      <input
        type="range"
        min="0"
        max="12"
        className="slider"
        value={range}
        onChange={(e) => setRangeValue(e.target.value)}
      />
      <span
        className="d-block d-md-none right-btn range-btn"
        onClick={rangePlus}
      ></span>
    </div>
  ));

  return (
    <>
      <Seo seo={seo} uri={uri} />
      <section
        className={`${style.singlePost} singlePost mT__260`}
        key={post.id}
      >
        <div className="images-loaded-container">{imageData}</div>
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
                      <span className={`sl ${style.author__img}`}>
                        <img
                          alt="icd-icon"
                          decoding="async"
                          src={authorImg ? authorImg.sourceUrl : Icon.src}
                        ></img>
                      </span>
                      <span className={` ${style["post-detail"]} `}>
                        {author} / {date} / {categories}{" "}
                      </span>
                    </div>

                    <div
                      className={` ${style.social__media} ${style.header_socialmedia} social__media  `}
                    >
                      <span
                        className={`icon share-icon ${
                          !showShareIcons && "icons-hide"
                        }`}
                      >
                        <a
                          href={linkedinUrl}
                          className="linkedin-icon"
                          target="_blank"
                        ></a>
                      </span>
                      <span
                        className={`icon share-icon ${
                          !showShareIcons && "icons-hide"
                        }`}
                      >
                        <a
                          href={twitterUrl}
                          className="twitter-icon"
                          target="_blank"
                        ></a>
                      </span>
                      <span
                        className={`icon share-icon ${
                          !showShareIcons && "icons-hide"
                        }`}
                      >
                        <a href={fbUrl} className="fb-icon" target="_blank"></a>
                      </span>
                      <span className="icon" onClick={toggleShareIcons}>
                        <img
                          alt="icd-icon"
                          decoding="async"
                          src={Share.src}
                          width="20"
                          height="20"
                          className="icon-img shareIcon--main"
                        />
                        share
                      </span>
                      <Like
                        count={post.likes?.likes}
                        id={post.id}
                        type={"post"}
                      />
                    </div>
                  </div>
                  <div className={`${style.postContent} postContent`}>
                    {post?.content && parse(post?.content)}
                    {interactionArticle && (
                      <>
                        {radioSvg}
                        <p>
                          Keep your sound on for this. And have fun with it.
                        </p>
                        <p>
                          Everyone at ICD has a station of their own. Drag the
                          slider to switch channels. Click on the artist name
                          for a short stream of the team member’s favourite song
                          from that artist.
                        </p>
                        <p>
                          You can click on the Spotify link to get the full ICD
                          playlist. Also, do get in touch if you want the source
                          code to make a radio for your office, we’d be happy to
                          share the joy we got from this fun exercise.
                        </p>
                        <p>
                          As legendary fashion designer and creative director of
                          Chanel, Karl Lagerfeld said, “Music gives colour to
                          the air of the moment”. We agree.
                        </p>
                        <p>_____________________________</p>
                        <p>
                          <em>
                            Widget design: Abhishek Ghosh. Developer: Alok Joshi
                          </em>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className={` ${style.social__media} social__media `}>
                  <span
                    className={`icon share-icon ${
                      !showShareIcons && "icons-hide"
                    }`}
                  >
                    <a
                      href={linkedinUrl}
                      className="linkedin-icon"
                      target="_blank"
                    ></a>
                  </span>
                  <span
                    className={`icon share-icon ${
                      !showShareIcons && "icons-hide"
                    }`}
                  >
                    <a
                      href={twitterUrl}
                      className="twitter-icon"
                      target="_blank"
                    ></a>
                  </span>
                  <span
                    className={`icon share-icon ${
                      !showShareIcons && "icons-hide"
                    }`}
                  >
                    <a href={fbUrl} className="fb-icon" target="_blank"></a>
                  </span>
                  <span className="icon" onClick={toggleShareIcons}>
                    <img
                      alt="icd-icon"
                      decoding="async"
                      src={Share.src}
                      width="20"
                      height="20"
                      className="icon-img shareIcon--main"
                    />
                    share
                  </span>
                  <Like count={post.likes?.likes} id={post.id} type={"post"} />
                </div>

                {relatedPost && (
                  <div className={style.relatedProjects__container}>
                    <span className={style.relatedProjects__head}>
                      related{" "}
                    </span>
                    <section
                      className={`${type.industry__filter} ${type.all_filter} `}
                    >
                      <div className="project__scroll">
                        <div className="row project__row">
                          {relatedProject}
                          {relatedPost}
                        </div>
                      </div>
                    </section>
                  </div>
                )}

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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
