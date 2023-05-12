import Head from 'next/head'
import { NextSeo } from 'next-seo'
import dynamic from "next/dynamic";
const Intro = dynamic(() => import("../intro-text/intro-text"));
const ContactForm = dynamic(() => import ( './contact-form/contact-form'));

import style from '../project/category.module.scss'

export default function contact({ meta }){
    const backButton = () => {
        window.history.back();
    }

    let contactEmail = meta?.contactEmail?.contactEMail



    return(
    <>
        <NextSeo
            title={meta.seo.title}
            description={meta.seo.metaDesc}
            canonical="https://www.icdindia.com/contact"
            robots={meta.metaRobotsNoindex}
            googlebot={meta.metaRobotsNofollow}
            openGraph={{
            url: 'https://www.icdindia.com/contact',
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
        <meta name="twitter:url" content="https://www.icdindia.com/contact" />
        <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
        </Head>


        <section className={` careers__page mT__260 `}>
            <div className="container page__header--container">
              <div className="row">
                <div className="col-12 col-md-4 page__header--title">
                  <div className="back-cta" onClick={backButton}><span className={` ${style.backBtn} backBtn` }></span><h1>{meta.title}</h1></div>
                </div>
                
                <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                    {/* {common}
                    {slug} */}
                </div>
              </div>
              <span className="bottom__border"></span>
            </div>
        </section>

        <Intro description={meta?.content} />
        <section className="careers__page mB__150" id="careerForm">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ContactForm dataEmail={contactEmail} />
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}