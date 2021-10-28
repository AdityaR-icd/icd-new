import cards from './cards.module.scss'
import home from '../home/home.module.scss'
import parse from 'html-react-parser';
import Image from 'next/image'


export default function Cards({data}){
    let card = ""
    let bg = ""
    return(
        <>
         <section className="featured-card">
            <section className={ `${home.home__section__cards}`}>
                <div className="container">
                  <div className="row">
              {(
                function(featuredCard){
                  for (let k = 0; k < (data.homePage.featuredCards).length; k++) {  
                      if (data.homePage.featuredCards[k]?.designOptions.darkBg) {
                       bg = ` ${cards.cards__box} ${cards.background_grey}`;
                      }else{
                        bg = ` ${cards.cards__box} ${cards.background_yellow}`;
                      }
                    let cardImg = data.homePage.featuredCards[k]?.featuredImage.node?.sourceUrl
                    let bgImage = {
                      backgroundImage: 'url(' + cardImg + ')'
                    }
                    featuredCard.push( 
                        <div className={ ` col-lg-4 ${home.home_cards}`}>
                            <div className={bg}>
                            <Image  src={cardImg} alt="card-image" layout="fill" className="card__background_image"/>
                                <span className={ `${cards.card__tag}`}>{ data.homePage.featuredCards[k].cardCategories.edges[0]?.node.name }</span>
                                <span className={ `${cards.card__text}`}>{ parse(data.homePage.featuredCards[k].content) }</span>
                                <span className={ `${cards.card__link}`}><a href="/careers"><button>apply now</button></a></span>
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