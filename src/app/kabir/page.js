import { getkabirPostsForHome, getkabir } from "@/lib/api";
import Layout from "@/components/kabir/kabir";

export default async function KabirPage() {
  const posts = await getkabirPostsForHome();
  const meta = await getkabir();

  const meta_data = meta?.pages?.edges?.[0]?.node;
  const edges = posts?.edges || [];

  return <Layout meta={meta_data} edges={edges} />;
}
