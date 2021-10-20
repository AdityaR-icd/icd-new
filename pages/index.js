import Layout from '../components/home/home'
import { getFooter , getHighlightedProject , getHome , getMenus } from '../lib/api'

export default function Home({data , project , home , menus}){
    return(
       <Layout data={data} project={project} home={home} menus={menus} />
    )
}

export async function getStaticProps() {
    const data = await getFooter()
    const project = await getHighlightedProject()
    const home = await getHome()
    const menus = await getMenus()
    return {
        props: { 
        data,
        project,
        home,
        menus
        },
        revalidate: 1, 
    }
}