// app/projects/category/[slug]/[sub_slug]/page.tsx
import { notFound } from "next/navigation";

import {
  getProjectSubTypes,
  getProjectByTypes,
  getFooter,
  getFilters,
  getLatestProject,
} from "@/lib/api";
import ProjectSubCategoryPage from "@/components/project/ProjectSubCategoryPage";

export default async function SubProjectPage({ params }) {
  const gProject = await getProjectByTypes(params.slug);
  const subTypeProjects = await getProjectSubTypes(
    params.slug,
    params.sub_slug
  );
  const latestProject = await getLatestProject();
  await getFooter();
  await getFilters();

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
