import { getkabirPostsForHome, getkabir } from "@/lib/api";
import { buildMetadata } from "@/lib/seo-utils";
import Layout from "@/components/kabir/kabir";

export const revalidate = 3600;

export async function generateMetadata() {
  const meta = await getkabir();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Kabir", description: "Kabir — ICD India." });
}

export default async function KabirPage() {
  const [posts, meta] = await Promise.all([getkabirPostsForHome(), getkabir()]);
  const meta_data = meta?.pages?.edges?.[0]?.node;
  const edges = posts?.edges || [];
  return <Layout meta={meta_data} edges={edges} />;
}
