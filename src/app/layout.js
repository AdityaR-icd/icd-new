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

import Nav from "../components/header/headerWrapper";
import Navbar from "../components/footer/footer";
import Loader from "../components/loader/loader";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
