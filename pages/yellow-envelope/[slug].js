import parse from 'html-react-parser';
import { getAllNewsletterWithSlug , getArticle } from '../../lib/api'
import { useRouter } from 'next/router'
import Seo from '../../components/seo';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import Comment from '../../components/comment'
import ErrorPage from 'next/error'



export default function newsletterss({ newsletter }) {
    const router = useRouter()
    const seo = newsletter ? ( newsletter?.seo ?? {} ) : ( {} );
    const uri = newsletter ? ( newsletter?.uri ?? {} ) : (  {} );


  
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
      <>
      <Seo seo={seo} uri={uri}/>
            <Head>
              {seo?.schema ? (
                <script
                  type='application/ld+json'
                  className='yoast-schema-graph'
                  key='yoastSchema'
                  dangerouslySetInnerHTML={{__html: ( seo.schema.raw )}}
                />
              ) : null}
            </Head>
            <h1>{newsletter.title}</h1>
            {parse(newsletter.content)}
            
            {(newsletter.yellowEnvelope.newsletterArticles).map( data  => (  
                <>
                    <h3>
                        {data.title}
                    </h3>
                        <div>
                            {parse(data.content)}
                        </div>
                    </>
            ))}
      </>
    )
  }
  
  export async function getStaticProps({ params }) {
    const data = await getArticle(params.slug)
    return {
      props: { 
        newsletter: data.newsletter,
      },
      revalidate: 1, 
    }
  }

  export async function getStaticPaths() {
    const allnewsletters = await getAllNewsletterWithSlug()
    return {
      paths: allnewsletters.edges.map(({ node }) => `/yellow-envelope/${node.slug}`) || [],
      fallback: true,
    }
    
  }