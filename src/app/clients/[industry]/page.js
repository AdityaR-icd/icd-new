// app/clients/industry/page.js
import {
  getIndustries,
  getClientsPage,
  getFooter,
  getFilters,
} from "@/lib/api";
import Layout from "@/components/clients/industry/industry";

export default async function IndustryPage() {
  const meta = await getClientsPage();
  const industries = await getIndustries();
  const data = await getFooter();
  const filters = await getFilters();

  const meta_data = meta?.pages?.edges?.[0]?.node;

  return <Layout meta={meta_data} edges={industries?.nodes || []} />;
}
