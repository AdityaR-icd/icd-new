import Header from "./header";
import { getFilters } from "../../lib/api";

export default async function HeaderWrapper() {
  const filters = await getFilters();
  return (
    <>
      <Header filters={filters} />
    </>
  );
}
