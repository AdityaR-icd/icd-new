import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { getAllPostsForHome } from '../lib/api'
import Link from 'next/link'
import { NextSeo } from 'next-seo';



export default function blogs({ allPosts: { edges }, preview }) {
  return (
    <>
      {edges.map(({ node }) => (
       
         <>
         <Link href={`/posts/${node.slug}`}>
          <a
            className="hover:underline"
          >
            <h3>{node.title}</h3>
          </a>
        </Link>
         {/* <Image src={node.featuredImage?.node.sourceUrl} alt="Picture of the author" /> */}
        {parse(node.excerpt)}
         </>
      ))}
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { 
      allPosts, 
      preview 
    },
    revalidate: 1, 
  }
}