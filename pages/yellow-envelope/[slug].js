import parse from 'html-react-parser';
import { getAllNewsletterWithSlug , getArticle , getMenus , getFooter } from '../../lib/api'
import { useRouter } from 'next/router'
import Seo from '../../components/seo';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import Comment from '../../components/comment'



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
            <h1>{newsletter.title}</h1>
            {parse(newsletter.content)}
            
            {(newsletter.yellowEnvelope?.newsletterArticles).map( data  => (  
                <div key={data.id}>
                  <h3>
                      {data.title}
                  </h3>
                  <div>
                      {parse(data.content)}
                  </div>
                </div>
            ))}
      </>
    )
  }
  
  export async function getStaticProps({ params }) {
    const article = await getArticle(params.slug)
    const menus = await getMenus()
    const data = await getFooter()
    return {
      props: { 
        newsletter: article.newsletter,
        menus,
        data
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