import Link from 'next/link'
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import logo from '../../assets/logo/icd-logo.9e81fca5.svg'
import mobileLogo from '../../assets/logo/mobile-logo-new.png'
import $ from 'jquery';





const Header = (props) => {
    // const list = props.menus
    // Onclick expand paragraph
    const hamburgerToggle = () => {
        $('body').toggleClass('hamburger-open');
        $('.hamburger, .nav-menu').toggleClass("is-active");
    } 

    const hamburgerClose = () => {
        $('body').removeClass('hamburger-open');
        $('.hamburger, .nav-menu').removeClass("is-active");
    } 


    useEffect(() => {
        $(window).on('load', function(){
           $('.loader').addClass('hideLoader')
        });

        var lastScrollTop = 0;

        $(window).on('scroll', function(event){
            var st = $(this).scrollTop();
            if(st > 150){
                if (st > lastScrollTop){
                    $('.menu-cont').addClass('header__hide');
                } else {
                    $('.menu-cont').removeClass('header__hide');
                }
                lastScrollTop = st;
            } else {
                $('.menu-cont').removeClass('header__hide');
            }
           
        });
        
    });


    return (
            <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
                <header id="header">
                    <div className="menu-cont">
                        <span className="yellowLine">
                            <span className="loader"></span>
                        </span>
                        <div className="container">
                            <div className="row">
                                <div className="col-10 col-md-2 logo-container">
                                    <a href="/" aria-label="logo" className="logo d-none d-lg-block">
                                        <Image decoding="async" width="172" priority={true} height="43" src={logo.src} className="logo d-none d-lg-block" alt="icd-logo" />
                                    </a>
                                    <a href="/" aria-label="logo" className="logo d-block d-lg-none">
                                        <Image decoding="async" src={mobileLogo.src} width="48" height="36"  className="logo d-block d-lg-none" alt="icd-logo" />
                                    </a>
                                </div>
                                <div className="col-2 col-md-10">
                                    <div className="d-block d-lg-none">

                                        <div className="hamburger hamburger--spring js-hamburger" onClick={hamburgerToggle}>
                                            <div className="hamburger-box">
                                                <div className="hamburger-inner"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="nav-menu">
                                        <div className="container">
                                            <div className="row">
                                                <ul>
                                                    {/* <li className="mobile__menu--items">
                                                        <form className="global-search">
                                                            <input type="search" className="searchInput" placeholder="type an industry, client or keyword" id="hamburgerSearch" required="" name="search" />
                                                            <input className="searchBtn" onClick={this.onSubmitHandler} type="submit" value="" />
                                                        </form>
                                                    </li> */}
                                                    <li className="mobile__menu--items" onClick={hamburgerClose}><Link href="/">home</Link></li>
                                                    <li onClick={hamburgerClose}><Link href="/projects">projects</Link></li>
                                                    <li onClick={hamburgerClose}><Link href="/clients">clients</Link></li>
                                                    <li onClick={hamburgerClose}><Link href="/services">services</Link></li>
                                                    <li onClick={hamburgerClose}><Link href="/posts">posts</Link></li>
                                                    <li onClick={hamburgerClose}><Link href="/contact">contact</Link></li>
                                                    {/* {(
                                                        function (menu) {
                                                            for (let i = 0; i < (list).length; i++) {
                                                                menu.push(
                                                                    <li onClick={hamburgerClose}><Link href={list[i]?.node.path}>{list[i]?.node.label}</Link></li>
                                                                )
                                                            }
                                                            return menu;
                                                    })([], 0, 10)} */}
                                                    <li className="mobile__menu--items" onClick={hamburgerClose}><Link href="/our-team">team</Link></li>
                                                    <li className="mobile__menu--items" onClick={hamburgerClose}><Link href="/careers">careers</Link></li>
                                                    <li className="copyright">© 1990-2019 itu chaudhuri design pvt ltd | all rights reserved. please note — no images or content from site can be reproduced without prior written consent from icd</li>
                                                    {/* <li className="search-icon d-lg-block d-none" onClick={ this.searchToggle }><span className="searchIcon"></span></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div> {/* nav-menu end */}

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="search-form ignore-react-onclickoutside" id="searchID">
        <Search></Search>
        <div id="close">
            <span className="close-wrap" onClick={this.searchToggle}>
                <span className="close-line close-line1"></span>
                <span className="close-line close-line2"></span>
            </span>
        </div>
    </div> */}
                </header>
            </>
    )
}

export default Header