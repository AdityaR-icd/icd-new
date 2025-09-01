import { getContactPage } from '../../lib/api'
import ContactComponent from "../../components/contact/contact";

export default async function Contact() {
  const meta = await getContactPage();
  const meta_data = meta.pages.edges[0].node;

  return (
    <ContactComponent meta={meta_data} />
  )
}
