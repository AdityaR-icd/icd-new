import parse from 'html-react-parser';
import { getAllPostsForHome , getMenus , getFooter , getPostAndMorePosts} from '../../lib/api'
import { useRouter } from 'next/router'
import Seo from '../../components/seo';
import PropTypes from 'prop-types';
import Like from '../../components/like';
import Head from 'next/head';
import Comment from '../../components/comment'



export default function Post({ post, posts, preview , tokken }) {
  const router = useRouter()
  const seo = post ? ( post?.seo ?? {} ) : ( {} );
	const uri = post ? ( post?.uri ?? {} ) : (  {} );
  const comment_data = post ? ( post.comments ?? {} ) : ( {} );

// console.log(tokken)
  if (router.isFallback) {
    return <div>Loading...</div>
  }

    return (
      <>
      <Seo seo={seo} uri={uri}/>
            {/* <Head>
              {seo?.schema ? (
                <script
                  type='application/ld+json'
                  className='yoast-schema-graph'
                  key='yoastSchema'
                  dangerouslySetInnerHTML={{__html: ( seo.schema.raw )}}
                />
              ) : null}
            </Head> */}
           {/* <Image src={heroPost.featuredImage?.node.sourceUrl} alt="Picture of the author" /> */}
         <h1>{post.title}</h1> 
          {parse(post.content)} 
            <Like count={post.likes?.likes}  id={post.id} type={'post'} />
            <Comment postId={post.postId} comment_data = {comment_data} />



      </>
    )
  }

  export async function getStaticPaths() {
    const allPosts = await getAllPostsForHome()
    return {
      paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
      fallback: true,
    }
    
  }
  
  export async function getStaticProps({ preview = false , params , previewData }) {
    const Moredata = await getPostAndMorePosts(params.slug, preview, previewData)
    const menus = await getMenus()
    const data = await getFooter()
    return {
      props: { 
        post: Moredata.post,
        posts: Moredata.posts,
        preview, 
        menus,
        data
      },
      revalidate: 1, 
    }
  }
