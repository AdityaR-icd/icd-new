import { getAllPostsByCategorySlug, getPostPage, getPostCategories, getAllTags, getAllPostsByCategory } from '../../../../lib/api'
import PostCategoryPage from '../../../../components/posts/PostCategoryPage'

export default async function PostCategory(props) {
  const params = await props.params;
  const { slug } = params;
  const posts = await getAllPostsByCategorySlug(slug);
  const meta = await getPostPage();
  const categories = await getPostCategories();
  const tags = await getAllTags();

  return <PostCategoryPage posts={posts} meta={meta} categories={categories} tags={tags} />;
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsByCategory();

  return allPosts.edges.map(({ node }) => ({
    slug: node.slug,
  }));
}
