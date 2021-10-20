import parse from 'html-react-parser';
import {getAllProjectsWithSlug , getProject , getMenus , getFooter} from '../../lib/api'
import { useRouter } from 'next/router'
import Like from '../../components/like';
import Seo from '../../components/seo';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import Comment from '../../components/comment'



export default function Projects({ project , data , menus }) {
  const router = useRouter()
  const seo = project ? ( project?.seo ?? {} ) : ( {} );
	const uri = project ? ( project?.uri ?? {} ) : (  {} );


  
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
      <>
      <Seo seo={seo} uri={uri}/>
           {/* <Image src={heroPost.featuredImage?.node.sourceUrl} alt="Picture of the author" /> */}
            <h1>{project.title}</h1>
            {parse(project.content)}
            <Like count={project.likes?.likes}  id={project.id} type={'project'} />
            {/* <Comment postId={post.postId} /> */}

      </>
    )
  }
  
  export async function getStaticProps({ params }) {
    const gProject = await getProject(params.slug)
    const menus = await getMenus()
    const data = await getFooter()
    return {
      props: { 
        project: gProject.project,
        menus,
        data
      },
      revalidate: 1, 
    }
  }

  export async function getStaticPaths() {
    const allProjects = await getAllProjectsWithSlug() 
    return {
      paths: allProjects.edges.map(({ node }) => `/projects/${node.slug}`) || [] ,
      fallback: true,
    }
    
  }