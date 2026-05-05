import { notFound } from "next/navigation";
import { getContactPage } from "../../lib/api";
import { buildMetadata } from "../../lib/seo-utils";
import ContactComponent from "../../components/contact/contact";

export const revalidate = 86400;

export async function generateMetadata() {
  const meta = await getContactPage();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Contact", description: "Get in touch with ICD India." });
}

export default async function Contact() {
  const meta = await getContactPage();
  const meta_data = meta?.pages?.edges?.[0]?.node;
  if (!meta_data) return notFound();
  return <ContactComponent meta={meta_data} />;
}
