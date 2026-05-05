"use client";
import parse from "html-react-parser";
import { useEffect } from "react";
export default function posts({ meta }) {
  useEffect(() => {
    document.body.classList.add("bg-yellow");
    return () => {
      document.body.classList.remove("bg-yellow");
    };
  }, []);
  return (
    <section className="mT__260 privacy-policy-page">
      <div className="container">
        <div className="privacy-content">
          <h1>Privacy Policy</h1>
          <div className="policyContent">
            {meta.content && parse(meta.content)}
          </div>
        </div>
      </div>
    </section>
  );
}
