import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'
import '../styles/index.scss'
import '../styles/header.scss'
import '../styles/search.scss'
import '../styles/footer.scss'
import '../styles/subscribe.scss'
import '../styles/fetch-jobs.scss'
import '../styles/jobs-form.scss'
import '../styles/slick/slick.css';
import '../styles/search-results.scss';
import '../styles/newsletter.scss';
import Script from 'next/script';
import dynamic from "next/dynamic";
import AppInitializer from '../components/layout/AppInitializer';
import ServiceWorkerRegistrar from '../components/layout/ServiceWorkerRegistrar';

const Nav = dynamic(() => import("../components/header/header"), { ssr: false });
const Footer = dynamic(() => import("../components/footer/footer"), { ssr: false });
const Loader = dynamic(() => import("../components/loader/loader"), { ssr: false });

export const metadata = {
  manifest: '/manifest.json',
  themeColor: '#fff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </head>
      <body>
        <Script src='https://www.google.com/recaptcha/api.js?hl=en'></Script>
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
        <Footer />
      </body>
    </html>
  );
}
