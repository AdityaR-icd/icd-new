import cards from './cards.module.scss'
import home from '../home/home.module.scss'
import parse from 'html-react-parser';
import Image from "next/image";
import Link from 'next/link';

export default function Cards({ data }) {
  let card = ""
  let bg = ""
  return <>
    <section className="featured-card">
      <section className={`${home.home__section__cards}`}>
        <div className="container">
          <div className="row">
            {(
              function (featuredCard) {
                for (let k = 0; k < (data.homePage.featuredCards).length; k++) {
                  if (data.homePage.featuredCards[k]?.designOptions.darkBg) {
                    bg = `${cards.cards__box}`;

                  } if(data.homePage.featuredCards[k]?.designOptions.yellowBg) {
                     bg = `${cards.cards__box} ${cards.background_yellow}`;
                  }
                  let cardImg = data.homePage.featuredCards[k]?.featuredImage.node?.sourceUrl
                  let bgImage = {
                    backgroundImage: 'url(' + cardImg + ')'
                  }
                  featuredCard.push(
                    <div className={` col-lg-4 ${home.home_cards}`} key={data.homePage.featuredCards[k].id}>
                      <div className={bg}>
                        <Image
                          unoptimized
                          priority={true}
                          src={cardImg}
                          alt="card-image"
                          className="card__background_image"
                          layout="fill"
                          sizes="100vw" />
                        <span className={`${cards.card__tag} card__tag ${data.homePage.featuredCards[k].cardCategories.edges[0]?.node.name}`}>{data.homePage.featuredCards[k].cardCategories.edges[0]?.node.name}</span>
                        <span className={`${cards.card__text}`}>{parse(data.homePage.featuredCards[k].content)}</span>
                        <span className={`${cards.card__link}`}><Link href={data.homePage.featuredCards[k]?.designOptions?.link?.url || '#'}><button>{data.homePage.featuredCards[k]?.designOptions?.link?.title}</button></Link></span>
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
  </>;
}