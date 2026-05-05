import { notFound } from "next/navigation";
import { getPages, getService, getOtherService } from "@/lib/api";
import { buildMetadata } from "@/lib/seo-utils";
import Layout from "@/components/services/services";

export const revalidate = 86400;

export async function generateMetadata() {
  const meta = await getPages();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Services", description: "Brand expression and strategy services by ICD India." });
}

export default async function Page() {
  const [meta, service, otherService] = await Promise.all([
    getPages(),
    getService(),
    getOtherService(),
  ]);

  const meta_data = meta?.pages?.edges?.[0]?.node;
  if (!meta_data) return notFound();

  return (
    <Layout
      meta={meta_data}
      edges={service?.edges ?? []}
      other_service={otherService?.edges ?? []}
    />
  );
}
