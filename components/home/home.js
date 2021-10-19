import { data } from "jquery"
import Head from 'next/head'
import parse from 'html-react-parser';
import Link from 'next/link'
import Seo from '../seo';
import Crousel from '../carousel/carousel-home'
import ProjectLead from "../project-lead/project-lead";

import home from './home.module.scss'

export default function Index({ project: { edges } , home: { pages } }) {
    const data = pages.edges[0]?.node
    let card = ""
    let bg = ""
      return (
        <>
       <Head>
       {parse(data.seo.fullHead)}
       </Head>
        <Crousel content={data.content} />
        <ProjectLead edges={edges} data={data}/>
          <section className="featured-card">
            <section className={ `${home.home_section__cards}`}>
                <div className="container">
                  <div className="row">
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
                    featuredCard.push( 
                        <div className={ ` col-lg-4 ${home.home_cards}`}>
                            <div className={bg} style={bgImage}>
                                <span className="card__tag">{ data.homePage.featuredCards[k].cardCategories.edges[0]?.node.name }</span>
                                <span className="card__text">{ parse(data.homePage.featuredCards[k].content) }</span>
                                <span className="card__link"><a href="/careers"><button>apply now</button></a></span>
                            </div>
                        </div>
                      )
                    }
                  return featuredCard;
                })([], 0, 10)}
                  </div>
                </div>
              </section>
          </section>
        </>
      )
  }