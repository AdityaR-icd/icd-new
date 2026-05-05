import "../../styles/fetch-jobs.scss";
import "../../styles/jobs-form.scss";
import { notFound } from "next/navigation";
import { getCareerPage, getJobs } from "../../lib/api";
import { buildMetadata } from "../../lib/seo-utils";
import CareersComponent from "../../components/career/careers";

export const revalidate = 86400;

export async function generateMetadata() {
  const meta = await getCareerPage();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Careers", description: "Join the team at ICD India." });
}

export default async function Careers() {
  const [meta, jobs] = await Promise.all([getCareerPage(), getJobs()]);
  const meta_data = meta?.pages?.edges?.[0]?.node;
  if (!meta_data) return notFound();
  return <CareersComponent meta={meta_data} jobs={jobs} />;
}
