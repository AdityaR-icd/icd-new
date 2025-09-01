import { getPostAndMorePosts, getTeam, getAllPostsForHome } from '../../../lib/api'
import PostPage from '../../../components/posts/PostPage'

export default async function Post({ params }) {
  const { slug } = params;
  const data = await getPostAndMorePosts(slug);
  const teamData = await getTeam();

  return <PostPage post={data.post} posts={data.posts} teamData={teamData} />;
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsForHome();

  return allPosts.edges.map(({ node }) => ({
    slug: node.slug,
  }));
}
