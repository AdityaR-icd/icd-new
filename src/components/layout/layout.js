"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import $ from "jquery";

import Nav from "../header/header";
import Footer from "../footer/footer";

const Layout = ({ children }) => {
  const router = useRouter();
  const home = ["/"];
  const bg_yellow = [`/posts/:id`];
  const bg_yellow1 = [`/newsletter-subscription`];
  const bg_yellow2 = [`/privacy-policy`];
  const noNav = [`/yellow-envelope/:id`];
  const props = children.props;

  const pathname = usePathname();

  useEffect(() => {
    if (
      bg_yellow.includes(router.pathname) ||
      bg_yellow1.includes(router.pathname) ||
      bg_yellow2.includes(router.pathname)
    ) {
      document.body.classList.add("bg-yellow");
    } else {
      document.body.classList.remove("bg-yellow");
    }
    console.log("pathname in layout", router.pathname);
  });

  useEffect(() => {
    if (pathname.startsWith("/search")) {
      $("body").addClass("search-page showSearch ignore-react-onclickoutside");
    } else {
      console.log("removing search-page from layout");
      $("body").removeClass(
        "search-page showSearch ignore-react-onclickoutside",
      );
      console.log("removed search-page from layout");
    }
  }, [pathname]);

  return (
    <>
      {/* <Nav {...props} /> */}
      {noNav.includes(router.pathname) ? null : <Nav {...props} />}
      {children}
      {/* <Footer {...props}/> */}
      {noNav.includes(router.pathname) ? null : <Footer {...props} />}
    </>
  );
};

export default Layout;
