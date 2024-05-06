import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import dynamic from "next/dynamic";
const Intro = dynamic(() => import("../intro-text/intro-text"));
const FetchJobs = dynamic (() => import("./fetch-jobs/fetch-jobs"));
const Enquiry = dynamic(() => import("../enquiry/enquiry"));

import style from '../project/category.module.scss'

export default function career({meta , jobs}){

    const backButton = () => {
        window.history.back();
    }
    var positions = [];
    var mailid
    return <>
        <NextSeo
            title={meta.seo.title}
            description={meta.seo.metaDesc}
            canonical="https://www.icdindia.com/careers"
            robots={meta.metaRobotsNoindex}
            googlebot={meta.metaRobotsNofollow}
            openGraph={{
            url: 'https://www.icdindia.com/careers',
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.seo.title} />
        <meta name="twitter:description" content={meta.seo.metaDesc} />
        <meta name="twitter:url" content="https://www.icdindia.com/careers" />
        <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
        </Head>

        <section className={` careers__page mT__260 `}>
            <div className="container page__header--container">
            <div className="row">
                <div className="col-12 col-md-4 page__header--title">
                <div className="back-cta" onClick={backButton}><span className={` ${style.backBtn} backBtn` }></span><h1>{meta.title}</h1></div>
                </div>
                
                <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                    <Link
                        href={`/our-team`}
                        className={ `${style.project__filter} project__filter marginRight`}> 
                        team
                    </Link>
                    <Link
                        href={`/careers`}
                        className={ `${style.project__filter} project__filter marginRight ${style.active} `}> 
                        careers
                    </Link>
                </div>
            </div>
            <span className="bottom__border"></span>
            </div>
        </section>

        <Intro description={meta?.content} />

        <section className="careers__page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 id="team" className="sectionHeading">the positions</h2>
                    </div>
                </div>                    
                <div className="row">
                {jobs.edges.map(({ node }, index) => (
                    mailid = node.user?.user ? node?.user?.user : 'work@icdindia.com',
                    positions[index] = new Array(node.title, mailid),
                    <FetchJobs data={node} key={node.id}/>
                ))}        
                </div>
            </div>
        </section>

        <section className="careers__page mB__150" id="careerForm" >
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <Enquiry position = { positions } />
                    </div>
                </div>
            </div>
        </section>

    </>;
}