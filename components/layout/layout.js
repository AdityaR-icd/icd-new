import dynamic from "next/dynamic";
import { useRouter } from 'next/router';


const Nav = dynamic(() => import("../header/header"));
const Footer = dynamic(() => import("../footer/footer"));



const Layout = ({children}) => {
    const router = useRouter();

    const noNav = [`/yellow-envelope/[slug]`];
    const props = children.props
   
    return(
        <>
            {/* <Nav {...props} /> */}
            {noNav.includes(router.pathname) ? null : <Nav {...props} />}
            {children}
            {/* <Footer {...props}/> */}
            {noNav.includes(router.pathname) ? null : <Footer {...props}/> }
        </>
    )
}

export default Layout