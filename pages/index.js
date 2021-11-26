import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/home/home"));
import { getFooter  , getHome , getMenus } from '../lib/api'

export default function Home({data , project , home , menus}){
    return(
       <Layout data={data} project={project} home={home} menus={menus} />
    )
}

export async function getServerSideProps() {
    const data = await getFooter()
    const home = await getHome()
    const menus = await getMenus()
    return {
        props: { 
        data,
        home,
        menus
        },
        // revalidate: 180, 
    }
}
