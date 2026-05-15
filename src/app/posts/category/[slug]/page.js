import {
  getAllPostsByCategorySlug,
  getPostPage,
  getPostCategories,
  getAllTags,
  getAllPostsByCategory,
} from "../../../../lib/api";
import { buildMetadata } from "../../../../lib/seo-utils";
import PostCategoryPage from "../../../../components/posts/PostCategoryPage";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const posts = await getAllPostsByCategorySlug(slug);
  const categoryName = posts?.edges?.[0]?.node?.name || slug;
  return buildMetadata({}, { title: `${categoryName} — Posts`, description: `Posts in ${categoryName} by ICD India.` });
}

export default async function PostCategory(props) {
  const params = await props.params;
  const { slug } = params;

  const [posts, meta, categories, tags] = await Promise.all([
    getAllPostsByCategorySlug(slug),
    getPostPage(),
    getPostCategories(),
    getAllTags(),
  ]);

  return (
    <PostCategoryPage posts={posts} meta={meta} categories={categories} tags={tags} />
  );
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsByCategory();
  return (allPosts?.edges ?? []).map(({ node }) => ({ slug: node?.slug })).filter(Boolean);
}
