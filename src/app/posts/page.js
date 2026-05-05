import {
  getAllPosts,
  getPostCategories,
  getPostPage,
  getFooter,
  getFilters,
} from "@/lib/api";
import { buildMetadata } from "@/lib/seo-utils";
import Layout from "../../components/posts/posts";

export const revalidate = 3600;

export async function generateMetadata() {
  const meta = await getPostPage();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Posts", description: "Insights and stories from ICD India." });
}

export default async function BlogsPage() {
  const [posts, data, meta, categories, filters] = await Promise.all([
    getAllPosts(),
    getFooter(),
    getPostPage(),
    getPostCategories(),
    getFilters(),
  ]);

  const edges = posts?.edges || [];
  const meta_data = meta?.pages?.edges?.[0]?.node;

  return (
    <Layout
      meta={meta_data}
      categories={categories}
      edges={edges}
      data={data}
      filters={filters}
    />
  );
}
