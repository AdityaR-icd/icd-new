import Head from 'next/head'
import parse from 'html-react-parser';
import { NextSeo } from 'next-seo';
import Crousel from '../carousel/carousel-home'
import ProjectLead from "../project-lead/project-lead";
import Cards from "../cards/cards";


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