import { Children } from 'react'
import Nav from '../header/header'
import Footer from '../Footer/footer'

const Layout = ({children}) => {
    const props = children.props
    return(
        <>
            <Nav />
            {children}
            <Footer {...props}/>
        </>
    )
}

export default Layout