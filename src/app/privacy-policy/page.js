import { notFound } from "next/navigation";
import { getPolicyPage } from "../../lib/api";
import { buildMetadata } from "../../lib/seo-utils";
import PrivacyComponent from "../../components/privacy/privacy";

export const revalidate = 86400;

export async function generateMetadata() {
  const meta = await getPolicyPage();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Privacy Policy" });
}

export default async function PrivacyPolicy() {
  const meta = await getPolicyPage();
  const meta_data = meta?.pages?.edges?.[0]?.node;
  if (!meta_data) return notFound();
  return <PrivacyComponent meta={meta_data} />;
}
