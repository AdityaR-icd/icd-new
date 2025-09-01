"use client";
import Head from "next/head";
import $ from "jquery";

import Crousel from "../carousel/carousel-home";
import ProjectLead from "../project-lead/project-lead";
import Cards from "../cards/cards";
const Snowflakes = require("magic-snowflakes");
import { useEffect } from "react";

export default function Index({ home: { pages }, themes, latest }) {
  // console.log(pages)

  const data = pages?.edges[0]?.node;
  const featuredata = pages?.edges;
  const carouselProjects = pages?.edges[0]?.node?.projects?.carouselProjects;

  // console.log(featuredata)
  if (themes?.theme == "on") {
    useEffect(() => {
      $("body").addClass("home-snowflake");
    }, []);

    if (typeof window !== "undefined") {
      var sf = new Snowflakes({
        color: "#ffffff",
        speed: 0.8,
        minSize: 12,
        maxSize: 35,
        count: 5,
        rotation: false,
        wind: false,
      });
    }
  }

  return (
    <>
      <Crousel
        edges={carouselProjects}
        latestProject={latest}
        content={data?.content}
      />
      <ProjectLead edges={featuredata} latestProject={latest} />
      {data?.homePage?.featuredCards && <Cards data={data} />}
    </>
  );
}
