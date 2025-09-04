// app/page.tsx
import Layout from "@/components/yellow-envelope/yellow-envelope";
import { getAllArticleForHome, getYellowEnvelope } from "@/lib/api";

export default async function Page() {
  const newsletters = await getAllArticleForHome(false);
  const meta = await getYellowEnvelope();

  const meta_data = meta.pages.edges[0].node;

  return (
    <>
      <Layout meta={meta_data} edges={newsletters.edges} />
    </>
  );
}
