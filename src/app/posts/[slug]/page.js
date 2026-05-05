import { notFound } from "next/navigation";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

import { getPostAndMorePosts, getTeam, getAllPostsSlug } from "@/lib/api";
import {
  buildMetadata,
  buildBreadcrumbSchema,
  buildArticleSchema,
} from "@/lib/seo-utils";

import Icon from "@/assets/images/logo/default-author.jpeg";
import style from "@/styles/singlePost.module.scss";

import Like from "@/components/like";
import NextPost from "@/components/posts/next-post";
import PrevPost from "@/components/posts/prev-post";
import MusicArticle from "@/components/music-article/music";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPostsSlug();
  return (posts?.edges ?? [])
    .slice(0, 30)
    .map(({ node }) => ({ slug: node.slug }));
}

export async function generateMetadata({ params }) {
  const { slug: postSlug } = await params;
  const data = await getPostAndMorePosts(postSlug, false, null);
  const seo = data?.post?.seo;
  return buildMetadata(seo, {
    title: data?.post?.title,
    description: data?.post?.excerpt,
  });
}

export default async function PostPage({
  params,
  preview = false,
  previewData,
}) {
  const { slug: postSlug } = await params;
  const [Moredata, teamData] = await Promise.all([
    getPostAndMorePosts(postSlug, preview, previewData),
    getTeam(),
  ]);

  const post = Moredata?.post;
  if (!post) return notFound();

  const seo = post?.seo ?? {};
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

  const location = "https://www.icdindia.com";
  const shareUrl = `${location}/posts/${slug}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text="${post?.title}"&url=${shareUrl}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post?.title}&source=LinkedIn`;

  const breadcrumbSchema = buildBreadcrumbSchema(seo?.breadcrumbs);
  const articleSchema = buildArticleSchema({
    title: post.title,
    image: featuredImage,
    datePublished: post?.date,
    author,
    authorImage: authorImg?.sourceUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {seo?.schema?.raw && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.schema.raw }}
        />
      )}

      <section
        className={`${style.singlePost} singlePost mT__260`}
        key={post.id}
      >
        <div className="images-loaded-container">
          {featuredImage ? (
            <div className={`${style.leadImage} fade-in`}>
              <Image
                src={featuredImage}
                alt={post.title}
                fill
                priority
                sizes="100vw"
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

                  <div className={style.post__author}>
                    <div className={style.author_wrapper}>
                      <span className={`sl ${style.author__img}`}>
                        <Image
                          alt={author}
                          src={authorImg ? authorImg.sourceUrl : Icon}
                          width={40}
                          height={40}
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
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        ></a>
                      </span>
                      <span className="icon share-icon icons-hide">
                        <a
                          href={twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        ></a>
                      </span>
                      <span className="icon share-icon icons-hide">
                        <a
                          href={fbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        ></a>
                      </span>
                      <Like
                        count={post.likes?.likes}
                        id={post.id}
                        type="post"
                      />
                    </div>
                  </div>

                  <div className={`${style.postContent} postContent`}>
                    {post?.content && parse(post?.content)}
                    {post?.musicArticle?.interactive && (
                      <MusicArticle teamData={teamData} />
                    )}
                  </div>
                </div>

                <div className="post__navigation">
                  <div className="row">
                    <div className="col-md-6">
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
