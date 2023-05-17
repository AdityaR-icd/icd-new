import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import $ from 'jquery'

const Nav = dynamic(() => import("../header/header"));
const Footer = dynamic(() => import("../footer/footer"));



const Layout = ({ children }) => {
    const router = useRouter();
    const home = ['/'];
    const bg_yellow = [`/posts/[slug]`];
    const bg_yellow1 = [`/newsletter-subscription`];
    const noNav = [`/yellow-envelope/[slug]`];
    const props = children.props

    useEffect(() => {
        if (bg_yellow.includes(router.pathname) || bg_yellow1.includes(router.pathname)) {
            document.body.classList.add('bg-yellow');
        }
        else {
            document.body.classList.remove('bg-yellow');
        }
    })

   

    useEffect(() => {
        if (router.pathname == "/search/[slug]") {
            $('body').addClass('search-page showSearch ignore-react-onclickoutside');
        }else{
            $('body').removeClass('search-page showSearch ignore-react-onclickoutside');
        }
    }) 
    return (
        <>
            {/* <Nav {...props} /> */}
            {noNav.includes(router.pathname) ? null : <Nav {...props} />}
            {children}
            {/* <Footer {...props}/> */}
            {noNav.includes(router.pathname) ? null : <Footer {...props} />}
        </>
    )
}

export default Layout