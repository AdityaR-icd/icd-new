import { getClientsPage, getClients } from '../../lib/api'
import ClientsComponent from "../../components/clients/clients";

export default async function Clients() {
  const meta = await getClientsPage();
  const { edges } = await getClients();
  const meta_data = meta?.pages?.edges[0]?.node;

  return (
    <ClientsComponent meta={meta_data} edges={edges} />
  )
}
