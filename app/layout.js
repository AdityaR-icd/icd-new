import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import "../styles/index.scss";
import "../styles/header.scss";
import "../styles/search.scss";
import "../styles/footer.scss";
import "../styles/subscribe.scss";
import "../styles/fetch-jobs.scss";
import "../styles/jobs-form.scss";
import "../styles/slick/slick.css";
import "../styles/search-results.scss";
import "../styles/newsletter.scss";
import Script from "next/script";
import dynamic from "next/dynamic";
import AppInitializer from "../components/layout/AppInitializer";
import ServiceWorkerRegistrar from "../components/layout/ServiceWorkerRegistrar";

import Nav from "../components/header/header";
import Navbar from "../components/footer/footer";
import Loader from "../components/loader/loader";

export const metadata = {
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </head>
      <body>
        <Script src="https://www.google.com/recaptcha/api.js?hl=en"></Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GTM-WWCCC9N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KY6NKRPCTL');
          `}
        </Script>
        <ServiceWorkerRegistrar />
        <AppInitializer />
        <Loader />
        <Nav />
        {children}
        <Navbar />
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: "#fff",
};
