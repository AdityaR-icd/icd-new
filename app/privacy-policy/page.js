import { getPolicyPage } from '../../lib/api'
import dynamic from "next/dynamic";

const PrivacyComponent = dynamic(() => import("../../components/privacy/privacy"));

export default async function PrivacyPolicy() {
  const meta = await getPolicyPage();
  const meta_data = meta.pages.edges[0].node;

  return (
    <PrivacyComponent meta={meta_data} />
  )
}
