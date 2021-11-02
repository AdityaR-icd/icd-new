import Head from 'next/head'
import { NextSeo } from 'next-seo';
import dynamic from "next/dynamic";
const Crousel = dynamic(() => import("../carousel/carousel-home"));
const ProjectLead = dynamic(() => import("../project-lead/project-lead"));
const Cards = dynamic(() => import("../cards/cards"));


export default function Index({ home: { pages } }) {
    const data = pages.edges[0]?.node
    const featuredata = pages.edges
      return (
        <>
        <NextSeo 
            title={data.seo.title}
            description={data.seo.metaDesc}
            canonical="https://icd-v3-vercel.vercel.app/"
            robots={data.metaRobotsNoindex}
			      googlebot={data.metaRobotsNofollow}
            openGraph={{
              url: 'https://icd-v3-vercel.vercel.app/',
              title: data.seo.title,
              description: data.seo.metaDesc,
              images: [
                {
                  url: data.featuredImage?.node.sourceUrl,
                  alt: 'homepage-image',
                  type: 'image/jpeg',
                },
              ],
              site_name: data.seo.title,
            }}
        />
        <Head>
        {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={data.seo.title} />
          <meta name="twitter:description" content={data.seo.metaDesc} />
          <meta name="twitter:url" content="https://icd-v3-vercel.vercel.app/" />
          <meta name="twitter:image" content={data.featuredImage?.node.sourceUrl} />
        {/* end of Twitter Cards */}
        </Head>
        <Crousel content={data.content} />
        <ProjectLead edges={featuredata} />
        <Cards data={data} />
        </>
      )
  }