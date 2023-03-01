import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/home/home"));
import { getHome  } from '../lib/api'


export default async function Home({ project }) {
    const home = await getHome()
    // const menus = await getMenus()
    return(
       <Layout project={project} home={home} />
    )
}

// export async function getStaticProps() {
//     const data = await getFooter()
//     const home = await getHome()
//     // const menus = await getMenus()
//     const filters = await getFilters()
//     return {
//         props: { 
//         data,
//         home,
//         // menus,
//         filters
//         },
//         revalidate: 60, 
//     }
// }
