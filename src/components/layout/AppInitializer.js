"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import $ from "jquery";

export default function AppInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const bg_yellow = /^\/posts\/.+$/;
    const bg_yellow1 = /^\/newsletter-subscription$/;
    const bg_yellow2 = /^\/privacy-policy$/;

    if (
      bg_yellow.test(pathname) ||
      bg_yellow1.test(pathname) ||
      bg_yellow2.test(pathname)
    ) {
      document.body.classList.add("bg-yellow");
    } else {
      document.body.classList.remove("bg-yellow");
    }
    console.log("pathname - app init", pathname);
    if (pathname.startsWith("/search")) {
      $("body").addClass("search-page showSearch ignore-react-onclickoutside");
    } else {
      console.log("removing search-page from app initalizer");
      $("body").removeClass(
        "search-page showSearch ignore-react-onclickoutside"
      );
      console.log("removed search-page from app initalizer");
    }
  }, [pathname]);

  return null;
}
