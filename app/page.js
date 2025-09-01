import dynamic from "next/dynamic";
const HomeComponent = dynamic(() => import("../components/home/home"));
import { getFooter, getHome, getFilters, getLatestProject } from '../lib/api'

export default async function Home() {
  const data = await getFooter()
  const home = await getHome()
  const filters = await getFilters()
  const latestProject = await getLatestProject()

  return (
    <HomeComponent data={data} themes={data} project={filters} home={home} latest={latestProject} />
  )
}
