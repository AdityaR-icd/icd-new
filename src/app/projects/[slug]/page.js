import { notFound } from "next/navigation";
import {
  getProject,
  getAllProjectsNotIn,
  getAllProjectsWithSlug,
} from "../../../lib/api";
import { buildMetadata, buildBreadcrumbSchema } from "../../../lib/seo-utils";
import ProjectPage from "../../../components/project/ProjectPage";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getAllProjectsWithSlug();
  return (projects?.edges ?? []).map(({ node }) => ({ slug: node.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getProject(slug);
  const seo = data?.project?.seo;
  const heading = data?.project?.projectComponent?.heading;
  return buildMetadata(seo, { title: heading });
}

export default async function Project(props) {
  const params = await props.params;
  const { slug } = params;
  const [gProject, oProjects] = await Promise.all([
    getProject(slug),
    getAllProjectsNotIn(slug),
  ]);

  const project = gProject?.project;
  // if (!project) return notFound();

  const seo = project?.seo;
  const breadcrumbSchema = buildBreadcrumbSchema(seo?.breadcrumbs);

  return (
    <>
      {seo?.schema?.raw && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.schema.raw }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ProjectPage project={project} oProjects={oProjects} />
    </>
  );
}
