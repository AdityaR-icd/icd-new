import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import parse from 'html-react-parser';
import { getHighlightedProject , getHome } from '../lib/api'
import Link from 'next/link'
import { NextSeo } from 'next-seo';



export default function Index({ project: { edges } , home: { pages }}) {
  const data = pages.edges[0]?.node
  let client = ""
  let project_video = ""
  let i = 0
  let j = 0
  let text = ""
  let card = ""
  let bg = ""
  return (
    <>
    <section className="crousel-banner">
        {parse(data.content)}
    </section>
      {edges.map(({ node }) => (
        project_video = node.highlightedImage.video.mediaItemUrl,
        client = node.clients.edges[0]?.node.name,
            <>
              <div>
                  {(
                    function (home_text) {
                      if ( j % 2 !== 0 && j > 0 ) {
                          text = (
                              <div className="container textContainer">
                                  <div className="row">
                                      <div className="col-md-10 offset-md-1">
                                          {parse(data.homePage.featuredText[i]?.content)}
                                      </div>
                                  </div>
                              </div>
                          );
                          i = i + 1;
                      } else{
                      text = '';
                      }
                      j = j + 1;
                    return home_text;
                })([], 0, 10)}
              </div>
            <section className="highlighted_project">
              <video src={project_video} autoPlay playsInline loop></video>
              <span>{node.title} / <em>{client}</em></span>
              {text}
            </section>
         </>
      ))}
      <section className="featured-card">
          {(
            function(featuredCard){
              for (let k = 0; k < (data.homePage.featuredCards).length; k++) {  
                  if (data.homePage.featuredCards[k]?.designOptions.darkBg) {
                   bg = 'cards__box background-grey';
                  }else{
                    bg = 'cards__box background-yellow';
                  }
                let cardImg = data.homePage.featuredCards[k]?.featuredImage.node?.sourceUrl
                let bgImage = {
                  backgroundImage: 'url(' + cardImg + ')'
                }
                card = (
                    <div className={bg}  style={bgImage}  >
                      <span className="card__tag">
                          {data.homePage.featuredCards[k]?.cardCategories.edges[0]?.node.name}
                      </span>
                      <span className="card__text">
                        {parse(data.homePage.featuredCards[k]?.content)}
                      </span>
                      <span className="card__link">
                        <a href="/careers"><button>apply now</button></a>
                      </span>
                    </div>
                );
              }
              return featuredCard;
            })([], 0, 10)}
          {card}
      </section>
    </>
  )
}

export async function getStaticProps() {
  const project = await getHighlightedProject()
  const home = await getHome()
  return {
    props: { 
      project,
      home
    },
    revalidate: 1, 
  }
}

