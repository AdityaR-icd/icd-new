import { NextSeo } from 'next-seo';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
const Head = dynamic(() => import('next/head'));
const All = dynamic(() => import("../project-categories/all/all"));
import project from './projects.module.scss'
import category from './category.module.scss'
import Link from 'next/link';
export default function Index({ AllProjects: { edges }, meta , projectsTypes: { nodes } , latest }) {
  const router = useRouter()
  const backButton = () => {
    window.history.back();
  }

  return (

    <>
      <NextSeo
        title={meta.seo.title}
        description={meta.seo.metaDesc}
        canonical={`https://www.icdindia.com${router.route}`}
        robots={meta.metaRobotsNoindex}
        googlebot={meta.metaRobotsNofollow}
        openGraph={{
          url: `https://www.icdindia.com${router.route}`,
          title: meta.seo.title,
          description: meta.seo.metaDesc,
          images: [
            {
              url: meta.featuredImage?.node.sourceUrl,
              alt: 'homepage-image',
              type: 'image/jpeg',
            },
          ],
          site_name: meta.seo.title,
        }} />
      <Head>
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.seo.title} />
        <meta name="twitter:description" content={meta.seo.metaDesc} />
        <meta name="twitter:url" content={`https://www.icdindia.com${router.route}`} />
        <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
        {/* end of Twitter Cards */}
      </Head>
      <>
        <section className={`${project.projects__page} mT__260 page__header `}>
          <div className="container page__header--container">
            <div className="row">
              <div className="col-12 col-md-4 page__header--title">
                <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{meta.title}</h1></div>
              </div>
              <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                <Link href="/projects/type/all" className={` project__filter ${category.project__filter} ${category.filter__active} filter__active`}  >all</Link>
                {/* <Link href="/projects" className="project__filter">category</Link> */}
                {nodes.map(({name , slug}) => (
                  <Link href={`/projects/category/${slug}`} className={` project__filter ${category.project__filter}`} >{name}</Link>
                ))}
              </div>
            </div>
            <span className="bottom__border"></span>
          </div>
        </section>
        <>
          <All edges={edges} latestProject={latest} />
        </>
      </></>
  )
}