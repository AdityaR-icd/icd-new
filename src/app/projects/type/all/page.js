import {
  getAllProjectsForHome,
  getProjectPage,
  getLatestProject,
  getProjectTypes,
} from "@/lib/api";
import { buildMetadata } from "@/lib/seo-utils";
import Layout from "@/components/project/allProject";

export const revalidate = 86400;

export async function generateMetadata() {
  const meta = await getProjectPage();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Projects", description: "All projects by ICD India." });
}

export default async function Page() {
  const [AllProjects, meta, latestProject, projectsTypes] = await Promise.all([
    getAllProjectsForHome(),
    getProjectPage(),
    getLatestProject(),
    getProjectTypes(),
  ]);

  const meta_data = meta?.pages?.edges?.[0]?.node;

  return (
    <Layout
      AllProjects={AllProjects}
      projectsTypes={projectsTypes}
      meta={meta_data}
      latest={latestProject}
    />
  );
}
