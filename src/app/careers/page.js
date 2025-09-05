import { getCareerPage, getJobs } from "../../lib/api";
import CareersComponent from "../../components/career/careers";

export default async function Careers() {
  const meta = await getCareerPage();
  const jobs = await getJobs();
  const meta_data = meta.pages.edges[0].node;

  return <CareersComponent meta={meta_data} jobs={jobs} />;
}
