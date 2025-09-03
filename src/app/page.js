import HomeComponent from "../components/home/home";
import { getHome, getLatestProject } from "../lib/api";

export default async function Home() {
  const home = await getHome();
  const latestProject = await getLatestProject();

  return <HomeComponent home={home} latest={latestProject} />;
}
