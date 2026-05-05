"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AppInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const isBgYellow =
      /^\/posts\/.+$/.test(pathname) ||
      /^\/yellow-envelope\/.+$/.test(pathname) ||
      /^\/newsletter-subscription$/.test(pathname) ||
      /^\/privacy-policy$/.test(pathname);

    if (isBgYellow) {
      document.body.classList.add("bg-yellow");
    } else {
      document.body.classList.remove("bg-yellow");
    }

    if (pathname.startsWith("/search")) {
      document.body.classList.add("search-page", "showSearch", "ignore-react-onclickoutside");
    } else {
      document.body.classList.remove("search-page", "showSearch", "ignore-react-onclickoutside");
    }
  }, [pathname]);

  return null;
}
