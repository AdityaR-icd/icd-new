import {
  getAllPosts,
  getPostCategories,
  getPostPage,
  getFooter,
  getFilters,
} from "@/lib/api";
import Layout from "../../components/posts/posts";

export default async function BlogsPage() {
  const posts = await getAllPosts();
  const data = await getFooter();
  const meta = await getPostPage();
  const categories = await getPostCategories();
  const filters = await getFilters();

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
