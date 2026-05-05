import { notFound } from "next/navigation";
import { getOurteamPage, getTeam } from "../../lib/api";
import { buildMetadata } from "../../lib/seo-utils";
import TeamComponent from "../../components/team/team";

export const revalidate = 86400;

export async function generateMetadata() {
  const meta = await getOurteamPage();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Our Team", description: "Meet the team at ICD India." });
}

export default async function OurTeam() {
  const [meta, team] = await Promise.all([getOurteamPage(), getTeam()]);
  const meta_data = meta?.pages?.edges?.[0]?.node;
  if (!meta_data) return notFound();
  return <TeamComponent meta={meta_data} team={team} />;
}
