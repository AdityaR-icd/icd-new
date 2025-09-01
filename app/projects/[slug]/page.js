import { getProject, getAllProjectsNotIn, getAllProjectsWithSlug } from '../../../lib/api'
import ProjectPage from '../../../components/project/ProjectPage'

export default async function Project({ params }) {
  const { slug } = params;
  const gProject = await getProject(slug);
  const oProjects = await getAllProjectsNotIn(slug);

  return <ProjectPage project={gProject.project} oProjects={oProjects} />;
}

export async function generateStaticParams() {
  const allProjects = await getAllProjectsWithSlug();

  return allProjects.edges.map(({ node }) => ({
    slug: node.slug,
  }));
}
