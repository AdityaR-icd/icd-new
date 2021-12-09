import {  getFilters } from '../lib/api';
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/search/search"))
export default function search( {filters } ){

    var clients = []
    var industries = []
    var projectTypes = []
    var projectSubTypes = []
    var categories = []
    var tags = []
    var filter = []

    filters.clients.edges.map((item) => {      
        clients.push(item.node.name)
    })

    filters.industries.edges.map((item) => {      
        industries.push(item.node.name)
    })

    filters.projectTypes.edges.map((item) => {      
        projectTypes.push(item.node.name)
    })

    filters.projectSubTypes.edges.map((item) => {      
        projectSubTypes.push(item.node.name)
    })

    filters.categories.edges.map((item) => {      
        categories.push(item.node.name)
    })

    filters.tags.edges.map((item) => {      
        tags.push(item.node.name)
    })


    var allFilters = [...clients, ...industries, ...projectTypes, ...projectSubTypes, ...categories, ...tags]

    allFilters.map((item) => {  
        filter.push(item)
    })  

 return(
  <>
    <Layout  />
  </>
 )
}

export async function getServerSideProps(){
 const filters = await getFilters()
 return{
  props:{
    filters,
  },
 }
}