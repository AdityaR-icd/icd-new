import { getPages, getService, getOtherService } from "../../lib/api";

import Layout from "../../components/services/services";

export default async function Page() {
  const meta = await getPages();
  const service = await getService();
  const otherService = await getOtherService();

  const meta_data = meta.pages.edges[0].node;
  const other_service = otherService.edges;

  return (
    <Layout
      meta={meta_data}
      edges={service.edges}
      other_service={other_service}
      filters={filters}
    />
  );
}

// Optional: ISR equivalent
export const revalidate = 86400; // same as getStaticProps revalidate
