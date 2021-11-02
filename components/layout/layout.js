import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../header/header"));
const Footer = dynamic(() => import("../footer/footer"));


const Layout = ({children}) => {
    const props = children.props
    return(
        <>
            <Nav {...props} />
            {children}
            <Footer {...props}/>
        </>
    )
}

export default Layout