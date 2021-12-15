import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/home/home"));
import { getFooter  , getHome , getMenus , getFilters } from '../lib/api'

export default function Home({data , project , home , menus , filters}) {
    return(
       <Layout data={data} themes={data} project={project} home={home} menus={menus} />
    )
}

export async function getStaticProps() {
    const data = await getFooter()
    const home = await getHome()
    const menus = await getMenus()
    const filters = await getFilters()
    return {
        props: { 
        data,
        home,
        menus,
        filters
        },
        revalidate: 86400, 
    }
}
