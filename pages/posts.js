import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { getAllPosts , getMenus , getFooter } from '../lib/api'
import Link from 'next/link'
import { NextSeo } from 'next-seo';



export default function blogs({  posts : { edges } }) {
  return (
    <>
      { edges.map(({ node }) => (
          <>
            <div>
            <h5>{node.name} - ( Category )</h5>
                {(
                  function (projectType) {
                      const data = node.posts.edges;
                      for (let i = 0; i < (node.posts.edges).length; i++) {
                        projectType.push(
                        <>
                          <Link href={`/posts/${data[i]?.node.slug}`}>
                              <a className="hover:underline">
                                <h3>{data[i]?.node.title}</h3>
                              </a>
                          </Link>
                          <div>
                            {parse(data[i]?.node.excerpt)}
                          </div>
                        </>
                        )
                      }
                      return projectType;
                })([], 0, 10)}
              </div>
              <hr />
          </>
        ))}
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  const menus = await getMenus()
  const data = await getFooter()
  return {
    props: { 
      posts,
      menus,
      data
    },
    revalidate: 1, 
  }
}