"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import $ from 'jquery';

export default function AppInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const bg_yellow = /^\/posts\/.+$/;
    const bg_yellow1 = /^\/newsletter-subscription$/;
    const bg_yellow2 = /^\/privacy-policy$/;

    if (bg_yellow.test(pathname) || bg_yellow1.test(pathname) || bg_yellow2.test(pathname)) {
      document.body.classList.add('bg-yellow');
    } else {
      document.body.classList.remove('bg-yellow');
    }

    if (pathname.startsWith("/search/")) {
      $('body').addClass('search-page showSearch ignore-react-onclickoutside');
    } else {
      $('body').removeClass('search-page showSearch ignore-react-onclickoutside');
    }
  }, [pathname]);

  return null;
}
