import Crousel from "../carousel/carousel-home";
import ProjectLead from "../project-lead/project-lead";
import Cards from "../cards/cards";

export default function Index({ home: { pages }, latest }) {
  const data = pages?.edges[0]?.node;
  const featuredata = pages?.edges;
  const carouselProjects = pages?.edges[0]?.node?.projects?.carouselProjects;

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
