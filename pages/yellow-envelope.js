import Head from 'next/head'
import Image from 'next/image'
import parse from 'html-react-parser';
import { getAllArticleForHome , getYellowEnvelope , getFilters , getMenus , getFooter  } from '../lib/api'

import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/yellow-envelope/yellow-envelope"));

import Link from 'next/link'



export default function Index({ newsletters: { edges } , meta:{pages} , filters  }) {
  const meta_data = pages.edges[0].node
 return (
    <>
      <Layout meta={meta_data} edges={edges} />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const newsletters = await getAllArticleForHome(preview)
  const menus = await getMenus()
  const data = await getFooter()
  const meta = await getYellowEnvelope()
  const filters = await getFilters()
  return {
    props: { 
        newsletters,
        preview,
        menus,
        data,
        meta,
        filters
    },
    revalidate: 86400, 
  }
}

