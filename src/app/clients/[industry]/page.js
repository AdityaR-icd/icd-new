import { getIndustries, getClientsPage } from "@/lib/api";
import Layout from "@/components/clients/industry/industry";

export const revalidate = 3600;

export default async function IndustryPage() {
  const [meta, industries] = await Promise.all([
    getClientsPage(),
    getIndustries(),
  ]);

  const meta_data = meta?.pages?.edges?.[0]?.node;

  return <Layout meta={meta_data} edges={industries?.nodes || []} />;
}
