import "@/styles/newsletter.scss";
import { notFound } from "next/navigation";
import Layout from "@/components/yellow-envelope/yellow-envelope";
import { getAllArticleForHome, getYellowEnvelope } from "@/lib/api";
import { buildMetadata } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata() {
  const meta = await getYellowEnvelope();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Yellow Envelope", description: "Newsletter by ICD India." });
}

export default async function Page() {
  const [newsletters, meta] = await Promise.all([
    getAllArticleForHome(false),
    getYellowEnvelope(),
  ]);
  const meta_data = meta?.pages?.edges?.[0]?.node;
  if (!meta_data) return notFound();
  return <Layout meta={meta_data} edges={newsletters?.edges ?? []} />;
}
