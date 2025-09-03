"use client";
// app/not-found.js
import Link from "next/link";
import Anim from "@/assets/images/404/404.gif";
import style from "@/styles/404.module.scss";

export default function NotFound() {
  const searchToggle = () => {
    document.body.classList.toggle("showSearch");
    if (document.body.classList.contains("showSearch")) {
      const input = document.querySelector(".searchInput");
      input?.focus();
    }
  };

  return (
    <div className="container">
      <div className={style.error_404}>
        <span>
          <img
            alt="icd-icon"
            priority
            decoding="async"
            // className={style.error404_anim}
            src={Anim.src}
          />
        </span>
        <span className={style.not_found}>
          Oops! The page couldn’t be found
        </span>
        <span className={style.error_subtext}>
          Looking for something specific? Try using{" "}
          <span className={style.error_search} onClick={searchToggle}>
            Search
          </span>{" "}
          or go to <Link href="/">Home</Link>
        </span>
      </div>
    </div>
  );
}
