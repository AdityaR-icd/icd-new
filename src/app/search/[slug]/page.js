import "@/styles/search.scss";
import "@/styles/search-results.scss";
import SearchResults from "@/components/search-results/searchResults";
import { getFiltersBySlug, getLatestProject } from "@/lib/api";

export default async function SearchPage({ params }) {
  const { slug } = await params;

  const [filter, latestProject] = await Promise.all([
    getFiltersBySlug(slug),
    getLatestProject(),
  ]);

  return (
    <SearchResults
      slug={slug}
      filter={filter}
      latestProject={latestProject}
    />
  );
}
