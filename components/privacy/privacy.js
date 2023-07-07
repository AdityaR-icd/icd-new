import parse from 'html-react-parser';
import { NextSeo } from 'next-seo';
import dynamic from "next/dynamic";
const Head = dynamic(() => import('next/head'));
export default function posts({ meta }) {
    const backButton = () => {
        window.history.back();
    }
    return(
        <>
            <NextSeo
                title={meta.seo.title}
                description={meta.seo.metaDesc}
                canonical="https://www.icdindia.com/posts"
                robots={meta.metaRobotsNoindex}
                googlebot={meta.metaRobotsNofollow}
                openGraph={{
                    url: 'https://www.icdindia.com/posts',
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
                <meta name="twitter:url" content="https://www.icdindia.com/posts" />
                <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
                {/* end of Twitter Cards */}
            </Head>
            {/* <section className={`services__page mT__260 page__header`}>
                <div className="container page__header--container">
                <div className="row">
                    <div className="col-12 page__header--title">
                        <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>Privacy Policy</h1></div>
                    </div>
                </div>
                <span className="bottom__border"></span>
                </div>
            </section> */}
            <section className='mT__260 privacy-policy-page'>
                <div className='container'>
                    <div className='privacy-content'>
                        <h1>Privacy Policy</h1>
                        <div className='policyContent'>
                            {meta.content && parse(meta.content)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}