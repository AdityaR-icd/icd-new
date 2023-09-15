import { NextSeo } from 'next-seo';
import dynamic from "next/dynamic";
const Head = dynamic(() => import('next/head'));
const Intro = dynamic(() => import("../intro-text/intro-text"));
const Service = dynamic(() => import("./fetch-services"));

import style from "./services.module.scss";

export default function service({ meta , edges , other_service }){
    var serviceData = edges[0]?.node?.services?.edges;
    var otherServiceData = other_service?.[0].node?.services?.edges;
    const backButton = () => {
        window.history.back();
    }
    return(
        <>
        <NextSeo
            title={meta.seo.title}
            description={meta.seo.metaDesc}
            canonical="https://www.icdindia.com/services"
            robots={meta.metaRobotsNoindex}
            googlebot={meta.metaRobotsNofollow}
            openGraph={{
                url: 'https://www.icdindia.com/services',
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
        <meta name="twitter:url" content="https://www.icdindia.com/services" />
        <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
        {/* end of Twitter Cards */}
      </Head>
        <section className={`services__page mT__260 page__header`}>
            <div className="container page__header--container">
              <div className="row">
                <div className="col-12 page__header--title">
                    <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{meta.title}</h1></div>
                </div>
              </div>
              <span className="bottom__border"></span>
            </div>
        </section>
        <Intro description={meta.content} />
        <section className={style.servicesPage}>
            <div className="container">
                <div className="row">
                    {serviceData.map(({ node }) => (
                        <Service data={node}/>
                    ))}  
                </div>
            </div>
        </section>
        <Intro description={meta?.servicesSection2Text?.text} />
        <section className={style.servicesPage}>
            <div className="container">
                <div className="row">
                    {otherServiceData.map(({ node }) => (
                        <Service data={node}/> 
                    ))}  
                </div>
            </div>
        </section>
    </>
    
    )
}