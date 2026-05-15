"use client";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import logo from "../../assets/logo/icd-logo.9e81fca5.svg";
import mobileLogo from "../../assets/logo/mobile-logo-new.png";
import $ from "jquery";
import { useState } from "react";
import { usePathname } from "next/navigation";

import Search from "../search/search";

const Header = (props) => {
  var filters = props.filters;

  var clients = [];
  var industries = [];
  var projectTypes = [];
  var categories = [];
  var tags = [];
  var keywords = [];

  filters?.clients?.edges?.map((item) => {
    clients.push(item?.node?.slug ?? "");
  });

  filters?.industries?.edges?.map((item) => {
    industries.push(item?.node?.slug ?? "");
  });

  filters?.projectTypes?.edges?.map((item) => {
    projectTypes.push(item?.node?.slug ?? "");
  });

  filters?.keywords?.edges?.map((item) => {
    keywords.push(item?.node?.slug ?? "");
  });

  filters?.categories?.edges?.map((item) => {
    categories.push(item?.node?.slug ?? "");
  });

  filters?.tags?.edges?.map((item) => {
    tags.push(item?.node?.slug ?? "");
  });

  var allFilters = [
    ...new Set([
      ...clients,
      ...industries,
      ...projectTypes,
      ...keywords,
      ...categories,
      ...tags,
    ]),
  ];

  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!pathname.startsWith("/search")) {
      $("body").removeClass();
    }
  });

  const searchToggle = () => {
    $("body").toggleClass("showSearch");
    if ($("body").hasClass("showSearch")) {
      $(".searchInput").focus();
    } else {
      setSearchValue("");
    }
  };

  const hamburgerToggle = () => {
    $("body").toggleClass("hamburger-open");
    $(".hamburger, .nav-menu").toggleClass("is-active");
  };

  const hamburgerClose = () => {
    $("body").removeClass("hamburger-open");
    $(".hamburger, .nav-menu").removeClass("is-active");
    $("body").removeClass("showSearch");
  };

  useEffect(() => {
    $(".loader").addClass("hideLoader");
    $(".vertical-video .player").css("height", "inherit !important");

    var lastScrollTop = 0;

    $(window).on("scroll", function (event) {
      var st = $(this).scrollTop();
      if (st > 150) {
        if (st > lastScrollTop) {
          $(".menu-cont").addClass("header__hide");
        } else {
          $(".menu-cont").removeClass("header__hide bg-transparent");
        }
        lastScrollTop = st;
      } else {
        $(".menu-cont").removeClass("header__hide").addClass("bg-transparent");
      }
    });
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const search = e.target.elements.search.value;
    const clean = `/search/${search}`;
    router.push(clean);
    setSearchValue("");
  };

  return (
    <header id="header">
      <div className="menu-cont bg-transparent" id="menu-cont">
        <div className="container">
          <div className="row">
            <div className="col-10 col-md-2 logo-container">
              <Link
                prefetch={true}
                href="/"
                aria-label="logo"
                className="logo d-none d-lg-block"
              >
                <Image
                  decoding="async"
                  width="172"
                  priority="true"
                  height="43"
                  src={logo.src}
                  className="logo d-none d-lg-block"
                  alt="icd-logo"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Link>
              <Link
                prefetch={true}
                href="/"
                aria-label="logo"
                className="logo d-block d-lg-none"
              >
                <Image
                  decoding="async"
                  priority="true"
                  src={mobileLogo.src}
                  width="48"
                  height="36"
                  className="logo d-block d-lg-none"
                  alt="icd-logo"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Link>
            </div>
            <div className="col-2 col-md-10">
              <div className="d-block d-lg-none">
                <div
                  className={`hamburger hamburger--spring js-hamburger`}
                  onClick={hamburgerToggle}
                >
                  <div className="hamburger-box">
                    <div className="hamburger-inner"></div>
                  </div>
                </div>
              </div>
              <div className={`nav-menu`}>
                <div className="container">
                  <div className="row">
                    <ul>
                      <li className="mobile__menu--items">
                        <form className="global-search">
                          <input
                            type="search"
                            className="searchInput"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="type an industry, client or keyword"
                            id="hamburgerSearch"
                            required=""
                            name="search"
                          />
                          <input
                            className="searchBtn"
                            onClick={onSubmitHandler}
                            type="submit"
                            value=""
                          />
                        </form>
                      </li>
                      <li
                        className="mobile__menu--items"
                        onClick={hamburgerClose} // Changed from hamburgerToggle
                      >
                        <Link prefetch={true} href="/">
                          home
                        </Link>
                      </li>
                      <li onClick={hamburgerClose}>
                        {" "}
                        {/* Changed from hamburgerToggle */}
                        <Link
                          prefetch={true}
                          href="/projects/type/all"
                          className={
                            pathname.startsWith("/projects") ? "active" : ""
                          }
                        >
                          projects
                        </Link>
                      </li>
                      <li onClick={hamburgerClose}>
                        {" "}
                        {/* Changed from hamburgerToggle */}
                        <Link
                          prefetch={true}
                          href="/clients"
                          className={
                            pathname.startsWith("/clients") ? "active" : ""
                          }
                        >
                          clients
                        </Link>
                      </li>
                      <li onClick={hamburgerClose}>
                        {" "}
                        {/* Changed from hamburgerToggle */}
                        <Link
                          prefetch={true}
                          href="/services"
                          className={pathname === "/services" ? "active" : ""}
                        >
                          services
                        </Link>
                      </li>
                      <li onClick={hamburgerClose}>
                        {" "}
                        {/* Changed from hamburgerToggle */}
                        <Link
                          prefetch={true}
                          href="/posts"
                          className={
                            pathname.startsWith("/posts") ? "active" : ""
                          }
                        >
                          posts
                        </Link>
                      </li>
                      <li onClick={hamburgerClose}>
                        {" "}
                        {/* Changed from hamburgerToggle */}
                        <Link
                          prefetch={true}
                          href="/contact"
                          className={pathname === "/contact" ? "active" : ""}
                        >
                          contact
                        </Link>
                      </li>
                      <li
                        className="mobile__menu--items"
                        onClick={hamburgerClose} // Changed from hamburgerToggle
                      >
                        <Link prefetch={true} href="/our-team">
                          team
                        </Link>
                      </li>
                      <li
                        className="mobile__menu--items"
                        onClick={hamburgerClose} // Changed from hamburgerToggle
                      >
                        <Link prefetch={true} href="/careers">
                          careers
                        </Link>
                      </li>
                      <li className="copyright">
                        © 1990-2019 itu chaudhuri design pvt ltd | all rights
                        reserved. please note — no images or content from site
                        can be reproduced without prior written consent from icd
                      </li>
                      <li
                        className="search-icon d-lg-block d-none"
                        onClick={searchToggle}
                      >
                        <span className="searchIcon"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`search-form ignore-react-onclickoutside `} id="searchID">
        <Search suggestion={allFilters}></Search>
        <div id="close">
          <span className="close-wrap" onClick={searchToggle}>
            <span className="close-line close-line1"></span>
            <span className="close-line close-line2"></span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
