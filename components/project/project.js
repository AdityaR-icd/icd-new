import Link from 'next/link'


export default function Index({ AllProjects: { edges }, preview , projectsTypes : { nodes } , data }) {
    return (
      <>
        {edges.map(({ node }) => (
         
           <>
           <Link href={`/projects/${node.slug}`}>
            <a
              className="hover:underline"
            >
              <h4>{node.title}</h4>
            </a>
          </Link>
           {/* <Image src={node.featuredImage?.node.sourceUrl} alt="Picture of the author" /> */}
          {/* {parse(node.excerpt)} */}
           </>
        ))}
  
        <br />
        <br />
        <h1>projects By categories</h1>
        {nodes.map( types  => (  
            <>
              <h4>{types.name}</h4>
              <div>
                  {(
                    function (projectType) {
                        const data = types.projects.edges;
                        for (let i = 0; i < (types.projects.edges).length; i++) {
                          projectType.push(<p>{data[i]?.node.title}</p>)
                        }
                        return projectType;
                  })([], 0, 10)}
                </div>
            </>
          ))}
      </>
    )
  }