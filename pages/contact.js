import { getMenus , getFooter , getContactPage} from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/contact/contact"));
export default function contact({ meta : {pages} }) {
  const meta_data = pages.edges[0].node
    return (
       <Layout meta={meta_data} />
    )
}

export async function getStaticProps() {
  const menus = await getMenus()
  const data = await getFooter()
  const meta = await getContactPage()
  return {
    props: { 
      menus,
      data,
      meta
    },
    revalidate: 1, 
  }
}