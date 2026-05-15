"use client";
import { useState } from "react";

import liked from "../assets/images/like-btn/like.svg";
import likesFilled from "../assets/images/like-btn/like-filled.svg";

export default function Like(count) {
  const like_count = count.count;
  const [likes] = useState(like_count);

  return (
    <>
      <span className="like-btn icon liked">
        <div className="like-icon">
          <img
            alt="icd-icon"
            decoding="async"
            src={liked.src}
            width="20"
            height="20"
            className="icon-img icon-outline"
          />
          <img
            alt="icd-icon"
            decoding="async"
            src={likesFilled.src}
            width="20"
            height="20"
            className="icon-img like-filled"
          />
        </div>
        {likes} likes
      </span>
    </>
  );
}
