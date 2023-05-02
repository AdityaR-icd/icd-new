import { getkabirPostsForHome, getkabir,  getFooter } from '../lib/api'

import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/kabir/kabir"));




export default function Index({ posts: { edges }, meta: { pages } }) {
  const meta_data = pages?.edges[0]?.node
  return (
    <>
      <Layout meta={meta_data} edges={edges} />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = await getkabirPostsForHome(preview)
  // const menus = await getMenus()
  const data = await getFooter()
  const meta = await getkabir()
  // const filters = await getFilters()
  return {
    props: {
      posts,
      preview,
      // menus,
      data,
      meta
      // filters
    },
    // revalidate: 86400, 
  }
}

