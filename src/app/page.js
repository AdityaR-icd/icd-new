import HomeComponent from "../components/home/home";
import { getHome, getLatestProject } from "../lib/api";
import { buildMetadata } from "../lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata() {
  const data = await getHome();
  const seo = data?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, {
    title: "ICD India",
    description:
      "ICD serves marketing, branding and editorial functions, on screen, in print, on shelf or anywhere, really; with visual design, or a concept.",
  });
}

export default async function Home() {
  const [home, latestProject] = await Promise.all([getHome(), getLatestProject()]);
  return <HomeComponent home={home} latest={latestProject} />;
}
