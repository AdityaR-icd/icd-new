import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import dynamic from "next/dynamic";
const Intro = dynamic(() => import("../intro-text/intro-text"));
const SingleProfile = dynamic(() => import("./single-profile"));

import style from '../project/category.module.scss'
import Ourteam from './our-team.module.scss'

export default function team({ meta, team }) {


    const backButton = () => {
        window.history.back();
    }

    return <>
        <NextSeo
            title={meta?.seo?.title}
            description={meta?.seo?.metaDesc}
            canonical="https://www.icdindia.com/our-team"
            robots={meta?.metaRobotsNoindex}
            googlebot={meta?.metaRobotsNofollow}
            openGraph={{
                url: 'https://www.icdindia.com/our-team',
                title: meta?.seo?.title,
                description: meta?.seo?.metaDesc,
                images: [
                    {
                        url: meta?.featuredImage?.node.sourceUrl,
                        alt: 'homepage-image',
                        type: 'image/jpeg',
                    },
                ],
                site_name: meta?.seo?.title,
            }} />
        <Head>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta?.seo?.title} />
            <meta name="twitter:description" content={meta?.seo?.metaDesc} />
            <meta name="twitter:url" content="https://www.icdindia.com/our-team" />
            <meta name="twitter:image" content={meta?.featuredImage?.node?.sourceUrl} />
        </Head>


        <section className={` careers__page mT__260 `}>
            <div className="container page__header--container">
                <div className="row">
                    <div className="col-12 col-md-4 page__header--title">
                        <div className="back-cta" onClick={backButton}><span className={` ${style.backBtn} backBtn`}></span><h1>{meta?.title}</h1></div>
                    </div>

                    <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                        <Link
                            href={`/`}
                            className={`${style.project__filter} project__filter marginRight ${style.active}`}>
                            team
                        </Link>
                        <Link
                            href={`/careers`}
                            className={`${style.project__filter} project__filter marginRight`}>
                            careers
                        </Link>
                    </div>
                </div>
                <span className="bottom__border"></span>
            </div>
        </section>

        <Intro description={meta?.content} />


        <section className={Ourteam?.team}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 id="team" className="sectionHeading">the team</h2>
                    </div>
                </div>
                <div className="row">
                    {team?.edges.map(({ node }) => (

                        <SingleProfile data={node} key={node?.id} />
                    ))}
                </div>
            </div>
        </section>
    </>;
}