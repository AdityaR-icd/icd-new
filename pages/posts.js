import { getAllPosts , getAllPostsForHome , getPostCategories , getPostPage , getMenus , getFooter } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/posts/posts"));



export default function blogs({  posts : { edges } , meta:{pages} , categories }) {
  const meta_data = pages.edges[0].node
  return (
    <>
    <Layout meta={meta_data} categories={categories} edges={edges} />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  const menus = await getMenus()
  const data = await getFooter()
  const meta = await getPostPage()
  const categories = await getPostCategories()
  return {
    props: { 
      posts,
      menus,
      data,
      meta,
      categories
    },
    revalidate: 60, 
  }
}