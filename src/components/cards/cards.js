import cards from "./cards.module.scss";
import home from "../home/home.module.scss";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

export default function Cards({ data }) {
  return (
    <>
      <section className="featured-card">
        <section className={`${home.home__section__cards}`}>
          <div className="container">
            <div className="row">
              {data.homePage.featuredCards.map((card, index) => {
                const bg =
                  card?.designOptions?.yellowBg
                    ? `${cards.cards__box} ${cards.background_yellow}`
                    : `${cards.cards__box}`;
                const cardImg = card?.featuredImage?.node?.sourceUrl;

                return (
                  <div
                    className={`col-lg-4 ${home.home_cards}`}
                    key={card.id}
                  >
                    <div className={bg}>
                      {cardImg && (
                        <Image
                          src={cardImg}
                          alt="card-image"
                          className="card__background_image"
                          fill
                          sizes="(max-width: 992px) 100vw, 33vw"
                          priority={index < 2}
                        />
                      )}
                      <span
                        className={`${cards.card__tag} card__tag ${card.cardCategories.edges[0]?.node.name}`}
                      >
                        {card.cardCategories.edges[0]?.node.name}
                      </span>
                      <span className={`${cards.card__text}`}>
                        {parse(card.content)}
                      </span>
                      <span className={`${cards.card__link}`}>
                        <Link
                          href={card?.designOptions?.link?.url || "#"}
                          prefetch={true}
                        >
                          {card?.designOptions?.link?.title}
                        </Link>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
