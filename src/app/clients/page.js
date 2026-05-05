import { getClientsPage, getClients } from "../../lib/api";
import { buildMetadata } from "../../lib/seo-utils";
import ClientsComponent from "../../components/clients/clients";

export const revalidate = 3600;

export async function generateMetadata() {
  const meta = await getClientsPage();
  const seo = meta?.pages?.edges?.[0]?.node?.seo;
  return buildMetadata(seo, { title: "Clients", description: "Clients and work by ICD India." });
}

export default async function Clients() {
  const [meta, { edges }] = await Promise.all([getClientsPage(), getClients()]);
  const meta_data = meta?.pages?.edges[0]?.node;
  return <ClientsComponent meta={meta_data} edges={edges} />;
}
