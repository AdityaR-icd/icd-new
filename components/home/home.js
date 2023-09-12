import Head from 'next/head'
import { NextSeo } from 'next-seo';
import dynamic from "next/dynamic";
import $ from 'jquery';
const Crousel = dynamic(() => import("../carousel/carousel-home"));
const ProjectLead = dynamic(() => import("../project-lead/project-lead"));
const Cards = dynamic(() => import("../cards/cards"));
const Snowflakes = require('magic-snowflakes');
import { useEffect } from 'react'


export default function Index({ home: { pages }, themes , latest }) {

  // console.log(pages)

  const data = pages?.edges[0]?.node
  const featuredata = pages?.edges
  const carouselProjects = pages?.edges[0]?.node?.projects?.carouselProjects

  // console.log(featuredata)
  if (themes?.theme == 'on') {
    useEffect(() => {
      $('body').addClass('home-snowflake')
    }, []);

    if (typeof window !== 'undefined') {
      var sf = new Snowflakes({
        color: "#ffffff",
        speed: 0.8,
        minSize: 12,
        maxSize: 35,
        count: 5,
        rotation: false,
        wind: false
      });
    }
  }

  return (
    <>
      <NextSeo
        title={data?.seo?.title}
        description={data?.seo?.metaDesc}
        canonical="https://www.icdindia.com/"
        robots={data?.metaRobotsNoindex}
        googlebot={data?.metaRobotsNofollow}
        openGraph={{
          url: 'https://www.icdindia.com/',
          title: data?.seo?.title,
          description: data?.seo?.metaDesc,
          images: [
            {
              url: data?.featuredImage?.node?.sourceUrl,
              alt: 'homepage-image',
              type: 'image/jpeg',
            },
          ],
          site_name: data?.seo?.title,
        }}
      />
      <Head>
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.seo?.title} />
        <meta name="twitter:description" content={data?.seo?.metaDesc} />
        <meta name="twitter:url" content="https://www.icdindia.com/" />
        <meta name="twitter:image" content={data?.featuredImage?.node?.sourceUrl} />
        {/* end of Twitter Cards */}
      </Head>
      <Crousel edges={carouselProjects} latestProject={latest} content={data?.content} />
      <ProjectLead edges={featuredata} latestProject={latest} />
      {data?.homePage?.featuredCards && <Cards data={data} />}
    </>
  )
}