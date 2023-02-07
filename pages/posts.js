import { getAllPosts , getPostCategories , getFilters , getPostPage , getFooter } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/posts/posts"));



export default function blogs({  posts : { edges } , meta:{pages} , categories , filters }) {
  const meta_data = pages.edges[0].node
  return (
    <>
    <Layout meta={meta_data} categories={categories} edges={edges} />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  // const menus = await getMenus()
  const data = await getFooter()
  const meta = await getPostPage()
  const categories = await getPostCategories()
  const filters = await getFilters()
  return {
    props: { 
      posts,
      // menus,
      data,
      meta,
      categories,
      filters

    },
    revalidate: 180, 
  }
}