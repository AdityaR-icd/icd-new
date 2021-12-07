import clients from '../../components/clients/clients';
import {  getPosts , getProjects } from '../../lib/api';
export default function search( {projects , posts } ){

var clients = ''
var industries = ''
var types = ''
var projectTypes = ''
var projectSubTypes = ''
var projectSubType = ''
projects.edges.map((project) => {
    clients = project?.node?.clients?.edges[0]?.node.name
    industries = project?.node?.industries?.edges[0]?.node?.name
    types = project?.node?.projectTypes?.edges

    types.map((type) =>{
        projectTypes = type?.node?.name
        projectSubTypes = type?.node.children?.edges
        if (projectSubTypes?.length > 0) {
            projectSubTypes?.map((item) => {
                projectSubType = item?.node?.name
                console.log(projectSubType)
            });
        }
    });
});
 return(
  <>
  </>
 )
}

export async function getServerSideProps(){
 const projects = await getProjects()
 const posts = await getPosts()
 return{
  props:{
    projects,
    posts
  },
 }
}