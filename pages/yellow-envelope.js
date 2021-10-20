import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { getAllArticleForHome , getMenus , getFooter  } from '../lib/api'
import Link from 'next/link'



export default function Index({ newsletters: { edges } }) {
 return (
    <>
      {edges.map(({ node }) => (
       
         <>
         <Link href={`/yellow-envelope/${node.slug}`}>
          <a
            className="hover:underline"
          >
            <h4>{node.title}</h4>
          </a>
        </Link>
        {parse(node.content)}
         </>
      ))}
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const newsletters = await getAllArticleForHome(preview)
  const menus = await getMenus()
  const data = await getFooter()
  return {
    props: { 
        newsletters,
        preview,
        menus,
        data
    },
    revalidate: 1, 
  }
}

