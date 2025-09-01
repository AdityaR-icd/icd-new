import { getProjectByTypes, getLatestProject, getAllProjectsTypes } from '../../../../lib/api'
import ProjectCategoryPage from '../../../../components/project/ProjectCategoryPage'

export default async function ProjectCategory({ params }) {
  const { slug } = params;
  const gProject = await getProjectByTypes(slug);
  const latestProject = await getLatestProject();

  return <ProjectCategoryPage project={gProject.projectTypes} latestProject={latestProject} />;
}

export async function generateStaticParams() {
  const allProjects = await getAllProjectsTypes();

  return allProjects.edges.map(({ node }) => ({
    slug: node.slug,
  }));
}
