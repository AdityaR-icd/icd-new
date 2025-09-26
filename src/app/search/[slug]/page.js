import SearchResults from "@/components/search-results/searchResults";
import {
  getFilters,
  getFooter,
  getFiltersBySlug,
  getLatestProject,
} from "@/lib/api";

export default async function SearchPage({ params }) {
  const slug = params.slug;
  const filter = await getFiltersBySlug(slug);
  const data = await getFooter();
  const filters = await getFilters();
  const latestProject = await getLatestProject();

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
