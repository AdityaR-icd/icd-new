"use client";

import Link from "next/link";

import Intro from "../intro-text/intro-text";
import FetchJobs from "./fetch-jobs/fetch-jobs";
import Enquiry from "../enquiry/enquiry";

import style from "../project/category.module.scss";

export default function Career({ meta, jobs }) {
  const backButton = () => {
    window.history.back();
  };
  var positions = [];
  var mailid;
  return (
    <>
      <section className={` careers__page mT__260 `}>
        <div className="container page__header--container">
          <div className="row">
            <div className="col-12 col-md-4 page__header--title">
              <div className="back-cta" onClick={backButton}>
                <span className={` ${style.backBtn} backBtn`}></span>
                <h1>{meta.title}</h1>
              </div>
            </div>

            <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
              <Link
                href={`/our-team`}
                className={`${style.project__filter} project__filter marginRight`}
              >
                team
              </Link>
              <Link
                href={`/careers`}
                className={`${style.project__filter} project__filter marginRight ${style.active} `}
              >
                careers
              </Link>
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>
      </section>

      <Intro description={meta?.content} />

      <section className="careers__page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 id="team" className="sectionHeading">
                the positions
              </h2>
            </div>
          </div>
          <div className="row">
            {jobs.edges.map(
              ({ node }, index) => (
                (mailid = node.user?.user
                  ? node?.user?.user
                  : "work@icdindia.com"),
                (positions[index] = new Array(node.title, mailid)),
                (<FetchJobs data={node} key={node.id} />)
              )
            )}
          </div>
        </div>
      </section>

      <section className="careers__page mB__150" id="careerForm">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Enquiry position={positions} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
