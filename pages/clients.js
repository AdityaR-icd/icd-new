import { getClientsPage , getMenus , getClients , getFooter  } from '../lib/api'
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/clients/clients"));




export default function clients({ clients : { edges } , meta:{pages}  }  ) {
  const meta_data = pages.edges[0].node
    return (
        // <>
        //    {edges.map(({ node }) => (               
        //         <>
        //         <h4>{node.name}</h4>
        //          <div>
        //          {(
        //             function (project) {
        //                 const clients = node.projects.edges;
        //                 for (let i = 0; i < (node.projects.edges).length; i++) {
        //                     project.push(<p>{clients[i]?.node.title}</p>)
        //                 }
        //                 return project;
        //         })([], 0, 10)}
        //          </div>
        //         </>
        //    ))} 
        //    <br />
        //    <br />
        //   <h1>Projects according Industries</h1>
        //   <br />
        //   <br />
        //   {nodes.map( industry  => (  
        //     <>
        //       <h4>{industry.name}</h4>
        //       <div>
        //          {(
        //             function (indus) {
        //                 const clients = industry.projects.edges;
        //                 for (let i = 0; i < (industry.projects.edges).length; i++) {
        //                   indus.push(<p>{clients[i]?.node.title}</p>)
        //                 }
        //                 return indus;
        //           })([], 0, 10)}
        //         </div>
        //     </>
        //   ))}
        //  </>

        <Layout meta={meta_data} edges={edges} />
    )
}

export async function getStaticProps() {
    const meta = await getClientsPage();
    const clients = await getClients()
    const menus = await getMenus()
    const data = await getFooter()
    return {
      props: { 
        clients,
        menus,
        data,
        meta
      },
      revalidate: 1, 
    }
  }

