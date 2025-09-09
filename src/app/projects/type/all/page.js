import {
  getAllProjectsForHome,
  getProjectPage,
  getLatestProject,
  getProjectTypes,
} from "@/lib/api";
import Layout from "@/components/project/allProject";

export default async function Page() {
  const [AllProjects, meta, latestProject, projectsTypes] = await Promise.all([
    getAllProjectsForHome(),
    getProjectPage(),
    getLatestProject(),
    getProjectTypes(),
  ]);

  const meta_data = meta.pages.edges[0].node;

  return (
    <Layout
      AllProjects={AllProjects}
      projectsTypes={projectsTypes}
      meta={meta_data}
      latest={latestProject}
    />
  );
}

// Optional: ISR equivalent
export const revalidate = 86400; // same as getStaticProps revalidate
