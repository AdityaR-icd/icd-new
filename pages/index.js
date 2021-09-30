import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { getHighlightedProject } from '../lib/api'
import Link from 'next/link'
import { NextSeo } from 'next-seo';



export default function Index({ project: { edges }}) {
  return (
    <>
      {edges.map(({ node }) => (
       
         <>
            <h1>{node.title}</h1>
            {parse(node.content)}
         </>
      ))}
    </>
  )
}

export async function getStaticProps() {
  const project = await getHighlightedProject()
  return {
    props: { 
      project 
    },
    revalidate: 1, 
  }
}

