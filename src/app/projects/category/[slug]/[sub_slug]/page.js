import { notFound } from "next/navigation";
import {
  getProjectSubTypes,
  getProjectByTypes,
  getLatestProject,
  getAllProjectsSubTypes,
} from "@/lib/api";
import ProjectSubCategoryPage from "@/components/project/ProjectSubCategoryPage";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const types = await getAllProjectsSubTypes();
  return (types?.edges ?? []).flatMap(({ node }) =>
    (node.children?.edges ?? []).map(({ node: child }) => ({
      slug: node.slug,
      sub_slug: child.slug,
    }))
  );
}

export default async function SubProjectPage({ params }) {
  const { slug, sub_slug } = await params;

  const [gProject, subTypeProjects, latestProject] = await Promise.all([
    getProjectByTypes(slug),
    getProjectSubTypes(slug, sub_slug),
    getLatestProject(),
  ]);

  const pageData = gProject?.projectTypes?.edges?.[0]?.node;
  if (!pageData) return notFound();

  const projectSubTypes = pageData?.children?.edges || [];
  const edges =
    subTypeProjects?.projectTypes?.edges?.[0]?.node?.children?.edges?.[0]?.node
      ?.projects?.edges || [];

  return (
    <ProjectSubCategoryPage
      pageData={pageData}
      projectSubTypes={projectSubTypes}
      edges={edges}
      latestProject={latestProject}
    />
  );
}
