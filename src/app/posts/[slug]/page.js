// app/post/[slug]/page.js

import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

import { getAllPostsForHome, getPostAndMorePosts, getTeam } from "@/lib/api";

import Share from "@/assets/images/post-buttons/share.svg";
import Icon from "@/assets/images/logo/default-author.jpeg";

import style from "@/styles/singlePost.module.scss";
import carousel from "@/components/project-categories/all/all.module.scss";
import type from "@/components/project-categories/type/type.module.scss";

// Direct imports (no dynamic)
// import Seo from "@/components/seo";
import Like from "@/components/like";
import NextPost from "@/components/posts/next-post";
import PrevPost from "@/components/posts/prev-post";
import MusicArticle from "@/components/music-article/music";
/**
 * Generate static params (replaces getStaticPaths)
 */
// export async function generateStaticParams() {
//   const allPosts = await getAllPostsForHome();
//   return allPosts.edges.map(({ node }) => ({
//     slug: node.slug,
//   }));
// }

/**
 * Page component (server component by default)
 */
export default async function PostPage({
  params,
  preview = false,
  previewData,
}) {
  const Moredata = await getPostAndMorePosts(params.slug, preview, previewData);
  const teamData = await getTeam();

  const post = Moredata?.post;

  if (!post) {
    return <div>Post not found</div>; // triggers 404
  }

  const seo = post?.seo ?? {};
  const uri = post?.uri ?? {};
  const featuredImage = post?.leadComponentPost?.leadComponent?.sourceUrl;
  const categories = post?.categories?.edges[0]?.node?.name;
  const checkauthor = post?.postAuthor?.postAuthor;

  const date = new Date(post?.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const author = checkauthor?.[0]?.title || "icd studios";
  const authorImg = checkauthor?.[0]?.profileImage?.profileImage;
  const slug = post?.slug;
  // Instead of router.asPath, use slug
  const location = "https://www.icdindia.com";
  const shareUrl = `${location}/post/${slug}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text="${post?.title}"&url=${shareUrl}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post?.title}&source=LinkedIn`;

  return (
    <>
      {/* <Seo seo={seo} uri={uri} /> */}
      <section
        className={`${style.singlePost} singlePost mT__260`}
        key={post.id}
      >
        <div className="images-loaded-container">
          {featuredImage ? (
            <div className={`${style.leadImage} fade-in`}>
              <Image
                src={featuredImage}
                alt="post-lead"
                fill
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className={style.leadImage}></div>
          )}
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

                  {/* Author + Social */}
                  <div className={style.post__author}>
                    <div className={style.author_wrapper}>
                      <span className={`sl ${style.author__img}`}>
                        <img
                          alt="icd-icon"
                          src={authorImg ? authorImg.sourceUrl : Icon.src}
                        />
                      </span>
                      <span className={style["post-detail"]}>
                        {author} / {date} / {categories}
                      </span>
                    </div>

                    <div
                      className={`${style.social__media} ${style.header_socialmedia} social__media`}
                    >
                      <span className="icon share-icon icons-hide">
                        <a href={linkedinUrl} target="_blank"></a>
                      </span>
                      <span className="icon share-icon icons-hide">
                        <a href={twitterUrl} target="_blank"></a>
                      </span>
                      <span className="icon share-icon icons-hide">
                        <a href={fbUrl} target="_blank"></a>
                      </span>
                      <Like
                        count={post.likes?.likes}
                        id={post.id}
                        type="post"
                      />
                    </div>
                  </div>

                  {/* Post content */}
                  <div className={`${style.postContent} postContent`}>
                    {post?.content && parse(post?.content)}

                    {/* Music Article (client component) */}
                    {post?.musicArticle?.interactive && (
                      <MusicArticle teamData={teamData} />
                    )}
                  </div>
                </div>

                {/* Related posts/projects — can be added here if needed */}

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
