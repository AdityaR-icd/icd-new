import {
  getAllProjectsForHome,
  getProjectPage,
  getLatestProject,
  getProjectTypes,
} from "../../../../../lib/api";
import Layout from "../../../../../components/project/allProject";

export default async function Page() {
  const AllProjects = await getAllProjectsForHome();
  const meta = await getProjectPage();
  const latestProject = await getLatestProject();
  const projectsTypes = await getProjectTypes();

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
