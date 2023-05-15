import Head from 'next/head'
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router'


export default function pageSeo({ seo }){
	const { asPath } = useRouter();
    return(
		
        <>
        <NextSeo 
            title={seo?.title}
            description={seo?.opengraphDescription}
            canonical={`https://www.icdindia.com${asPath}`}
            robots={seo.metaRobotsNoindex}
			      googlebot={seo.metaRobotsNofollow}
            openGraph={{
              url: process.env.domain,
              title: seo?.title,
              description: seo?.opengraphDescription,
              images: [
                {
                  url: seo?.opengraphImage?.sourceUrl,
                  alt: 'homepage-image',
                  type: 'image/jpeg',
                },
              ],
              site_name: seo.title,
            }}
        />
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seo?.title} />
          <meta name="twitter:description" content={seo?.opengraphDescription} />
          <meta name="twitter:url" content={`https://www.icdindia.com${asPath}`} />
          <meta name="twitter:image" content={seo.opengraphImage?.sourceUrl} />
        </Head> 
        </>
    )
}