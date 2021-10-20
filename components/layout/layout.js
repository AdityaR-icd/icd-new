import { Children } from 'react'
import Nav from '../header/header'
import Footer from '../footer/footer'

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