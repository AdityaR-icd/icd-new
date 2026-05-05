import { notFound } from "next/navigation";
import { getProjectByTypes, getLatestProject, getAllProjectsTypes } from "../../../../lib/api";
import ProjectCategoryPage from "../../../../components/project/ProjectCategoryPage";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const allProjects = await getAllProjectsTypes();
  return (allProjects?.edges ?? []).map(({ node }) => ({ slug: node.slug }));
}

export default async function ProjectCategory(props) {
  const params = await props.params;
  const { slug } = params;

  const [gProject, latestProject] = await Promise.all([
    getProjectByTypes(slug),
    getLatestProject(),
  ]);

  if (!gProject?.projectTypes) return notFound();

  return (
    <ProjectCategoryPage
      project={gProject.projectTypes}
      latestProject={latestProject}
    />
  );
}
