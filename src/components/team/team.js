"use client";
import Link from "next/link";

import Intro from "../intro-text/intro-text";
import SingleProfile from "./single-profile";

import style from "../project/category.module.scss";
import Ourteam from "./our-team.module.scss";

export default function team({ meta, team }) {
  const backButton = () => {
    window.history.back();
  };

  return (
    <>
      <section className={` careers__page mT__260 `}>
        <div className="container page__header--container">
          <div className="row">
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={backButton}>
                <span className={` ${style.backBtn} backBtn`}></span>
                <h1>{meta?.title}</h1>
              </div>
            </div>

            <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
              <Link
                href={`/`}
                className={`${style.project__filter} project__filter marginRight ${style.active}`}
              >
                team
              </Link>
              <Link
                href={`/careers`}
                className={`${style.project__filter} project__filter marginRight`}
              >
                careers
              </Link>
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>
      </section>

      <Intro description={meta?.content} />

      <section className={Ourteam?.team}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 id="team" className="sectionHeading">
                the team
              </h2>
            </div>
          </div>
          <div className="row">
            {team?.edges.map(({ node }) => (
              <SingleProfile data={node} key={node?.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
