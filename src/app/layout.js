import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import "../styles/index.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/subscribe.scss";
import "../styles/slick/slick.css";
import "../styles/search.scss";

import { Inter, Rajdhani, Rock_Salt } from "next/font/google";
import Nav from "../components/header/headerWrapper";
import Navbar from "../components/footer/footer";
import Loader from "../components/loader/loader";
import { getFooter } from "../lib/api";
import { buildOrganizationSchema } from "../lib/seo-utils";

const inter = Inter({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const rajdhani = Rajdhani({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const rockSalt = Rock_Salt({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-rock-salt",
});

export const metadata = {
  title: {
    default: "ICD India",
    template: "%s | ICD India",
  },
  description:
    "ICD serves marketing, branding and editorial functions, on screen, in print, on shelf or anywhere, really; with visual design, or a concept.",
  metadataBase: new URL("https://www.icdindia.com"),
  openGraph: {
    siteName: "ICD India",
    type: "website",
    locale: "en_US",
    url: "https://www.icdindia.com",
    title: "ICD India",
    description:
      "ICD serves marketing, branding and editorial functions, on screen, in print, on shelf or anywhere, really; with visual design, or a concept.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICD India",
    description:
      "ICD serves marketing, branding and editorial functions, on screen, in print, on shelf or anywhere, really; with visual design, or a concept.",
  },
};

export const viewport = {
  themeColor: "#fff",
};

export default async function RootLayout({ children }) {
  const footer = await getFooter();
  const orgSchema = buildOrganizationSchema({
    email: footer?.email,
    call: footer?.call,
    facebook: footer?.facebook,
    twitter: footer?.twitter,
    linkedin: footer?.linkedin,
    instagram: footer?.instagram,
    vimeo: footer?.vimeo,
    behance: footer?.behance,
  });

  return (
    <html
      lang="en"
      className={`${inter.className} ${rajdhani.className} ${rockSalt.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Loader />
        <Nav />
        {children}
        <Navbar footer={footer} />
      </body>
    </html>
  );
}
