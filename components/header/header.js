import Link from 'next/link'
import { useEffect } from 'react'
import Head from 'next/head'
import Image from "next/image";
import logo from '../../assets/logo/icd-logo.9e81fca5.svg'
import mobileLogo from '../../assets/logo/mobile-logo-new.png'
import $, { parseJSON } from 'jquery';
import { useState } from 'react'
import { usePathname } from 'next/navigation'
// import { getFilters } from '../../lib/api'
import Script from 'next/script'
import dynamic from "next/dynamic";
const Search = dynamic(() => import("../search/search"));

// const FilterLayout = dynamic(() => import("../../app/filterlayout/layout"));



const Header = (props) => {

    // var suggestionData
   var filters = props.filters;

    var clients = []
    var industries = []
    var projectTypes = []
    var categories = []
    var tags = []
    var keywords = []
    // const [data, setData] = useState(null)
    // const [filters, setFilters] = useState(null)
    // const [isLoading, setLoading] = useState(false)

    // useEffect(() => {
    //     // console.log(data)
    //     async function fetchMyAPI() {
    //         let response = await getFilters()
    //         setFilters(response)
    //     }
    //     fetchMyAPI()

    //   }, [])
    //   console.log(filters)


    
    const searchToggle = () => {
        $('body').toggleClass('showSearch');
        if ($('body').hasClass('showSearch')) {
            $('.searchInput').focus();
        } else {
            setsearchValue('')
        }
    }

    filters?.clients?.edges.map((item) => {
        clients.push(item.node.slug)
    })

    filters?.industries.edges.map((item) => {
        industries.push(item.node.slug)
    })

    filters?.projectTypes.edges.map((item) => {
        projectTypes.push(item.node.slug)
    })

    filters?.keywords.edges.map((item) => {
    keywords.push(item.node.slug)
    })


    filters?.categories.edges.map((item) => {
        categories.push(item.node.slug)
    })

    filters?.tags.edges.map((item) => {
        tags.push(item.node.slug)
    })




    var allFilters = [...new Set([...clients, ...industries, ...projectTypes, ...keywords, ...categories, ...tags])]

  

    const pathname = usePathname()
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const hamburgerToggle = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    }

    const hamburgerClose = () => {
        setIsHamburgerOpen(false);
    }
    const [searchValue, setsearchValue] = useState('')
    // Search Show and Hide





    useEffect(() => {
        $(window).on('load', function () {
            $('.loader').addClass('hideLoader')

            $('.vertical-video .player').css('height', 'inherit !important');
        });

      

        var lastScrollTop = 0;

        $(window).on('scroll', function (event) {
            var st = $(this).scrollTop();
            if (st > 150) {
                if (st > lastScrollTop) {
                    $('.menu-cont').addClass('header__hide');
                } else {
                    $('.menu-cont').removeClass('header__hide bg-transparent');
                }
                lastScrollTop = st;
            } else {
                $('.menu-cont').removeClass('header__hide').addClass('bg-transparent');
            }

        });
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const search = e.target.elements.search.value;
        const clean = `/search/${search}`;
        // router.push({
        //     pathname: clean,
        // })
        window.location.href = clean;
    }




    return <>

        <header id="header">
            <div className="menu-cont bg-transparent" id='menu-cont'>
                <div className="container">
                    <div className="row">
                        <div className="col-10 col-md-2 logo-container">
                            <Link href="/" aria-label="logo" className="logo d-none d-lg-block">
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
                                        height: "auto"
                                    }} />
                            </Link>
                            <Link href="/" aria-label="logo" className="logo d-block d-lg-none">
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
                                        height: "auto"
                                    }} />
                            </Link>
                        </div>
                        <div className="col-2 col-md-10">
                            <div className="d-block d-lg-none">

                                <div className={`hamburger hamburger--spring js-hamburger ${isHamburgerOpen ? 'is-active' : ''}`} onClick={hamburgerToggle}>
                                    <div className="hamburger-box">
                                        <div className="hamburger-inner"></div>
                                    </div>
                                </div>

                            </div>
                            <div className={`nav-menu ${isHamburgerOpen ? 'is-active' : ''}`}>
                                <div className="container">
                                    <div className="row">
                                        <ul>
                                            <li className="mobile__menu--items">
                                                <form className="global-search">
                                                    <input type="search" className="searchInput" value={searchValue} onChange={(e) => setsearchValue(e.target.value)} placeholder="type an industry, client or keyword" id="hamburgerSearch" required="" name="search" />
                                                    <input className="searchBtn" onClick={onSubmitHandler} type="submit" value="" />
                                                </form>
                                            </li>
                                            <li className="mobile__menu--items" onClick={hamburgerClose}><Link href="/">home</Link></li>
                                            <li onClick={hamburgerClose}><Link href="/projects/type/all" className={pathname.startsWith("/projects") ? "active" : ""}>projects</Link></li>
                                            <li onClick={hamburgerClose}><Link href="/clients" className={pathname.startsWith("/clients") ? "active" : ""}>clients</Link></li>
                                            <li onClick={hamburgerClose}><Link href="/services" className={pathname === "/services" ? "active" : ""}>services</Link></li>
                                            <li onClick={hamburgerClose}><Link href="/posts" className={pathname.startsWith("/posts") ? "active" : ""}>posts</Link></li>
                                            <li onClick={hamburgerClose}><Link href="/contact" className={pathname === "/contact" ? "active" : ""}>contact</Link></li>
                                            <li className="mobile__menu--items" onClick={hamburgerClose}><Link href="/our-team">team</Link></li>
                                            <li className="mobile__menu--items" onClick={hamburgerClose}><Link href="/careers">careers</Link></li>
                                            <li className="copyright">© 1990-2019 itu chaudhuri design pvt ltd | all rights reserved. please note — no images or content from site can be reproduced without prior written consent from icd</li>
                                            <li className="search-icon d-lg-block d-none" onClick={searchToggle}><span className="searchIcon"></span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> {/* nav-menu end */}

                        </div>
                    </div>
                </div>
            </div>
            <div className={`search-form ignore-react-onclickoutside ${isSearchOpen ? 'showSearch' : ''}`} id="searchID">
                <Search suggestion={allFilters} ></Search>
                <div id="close">
                    <span className="close-wrap" onClick={() => setIsSearchOpen(false)}>
                        <span className="close-line close-line1"></span>
                        <span className="close-line close-line2"></span>
                    </span>
                </div>
            </div>
        </header>
    </>;
}

export default Header
