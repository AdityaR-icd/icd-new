import "@/styles/search.scss";
import "@/styles/search-results.scss";
import SearchResults from "@/components/search-results/searchResults";
import { getFilters, getFooter, getFiltersBySlug, getLatestProject } from "@/lib/api";

export default async function SearchPage({ params }) {
  const { slug } = await params;

  const [filter, data, filters, latestProject] = await Promise.all([
    getFiltersBySlug(slug),
    getFooter(),
    getFilters(),
    getLatestProject(),
  ]);

  return (
    <SearchResults
      slug={slug}
      filter={filter}
      filters={filters}
      data={data}
      latestProject={latestProject}
    />
  );
}
