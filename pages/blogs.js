import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { getAllPosts } from '../lib/api'
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
  return {
    props: { 
      posts,
    },
    revalidate: 1, 
  }
}