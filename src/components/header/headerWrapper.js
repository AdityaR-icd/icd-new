import Header from "./header";

export default async function HeaderWrapper({ filters }) {
  return (
    <>
      <Header filters={filters} />
    </>
  );
}
