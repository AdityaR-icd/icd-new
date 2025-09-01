import { getContactPage } from '../../lib/api'
import dynamic from "next/dynamic";

const ContactComponent = dynamic(() => import("../../components/contact/contact"));

export default async function Contact() {
  const meta = await getContactPage();
  const meta_data = meta.pages.edges[0].node;

  return (
    <ContactComponent meta={meta_data} />
  )
}
