"use client";
import Intro from "../intro-text/intro-text";
import ContactForm from "./contact-form/contact-form";

import style from "../project/category.module.scss";

export default function Contact({ meta }) {
  const backButton = () => {
    window.history.back();
  };

  let contactEmail = meta?.contactEmail?.contactEMail;

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
              {/* {common}
                    {slug} */}
            </div>
          </div>
          <span className="bottom__border"></span>
        </div>
      </section>

      <Intro description={meta?.content} />
      <section className="careers__page mB__150" id="careerForm">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ContactForm dataEmail={contactEmail} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
