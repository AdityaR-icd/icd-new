import Layout from '../components/Home/home'
import { getFooter , getHighlightedProject , getHome } from '../lib/api'

export default function Home({data , project , home}){
    return(
       <Layout data={data} project={project} home={home} />
    )
}

export async function getStaticProps() {
    const data = await getFooter()
    const project = await getHighlightedProject()
    const home = await getHome()
    return {
        props: { 
        data,
        project,
        home
        },
        revalidate: 1, 
    }
}