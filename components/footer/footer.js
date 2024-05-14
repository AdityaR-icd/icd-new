import dynamic from "next/dynamic";
const Subscribe = dynamic(() => import("../subscribe/subscribe"));
import Link from 'next/link'


const Navbar = (props) => {
    const data = props.data
    return(
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-lg-5 col-xl-5">
                            <Subscribe />
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3">
                            <div className="footer__talk-padding paddingLeft">
                                <span className="footerHead">let’s talk</span>
                                <span className="footerText">
                                    <p><strong>business</strong>&nbsp;<a href={`mailto:${data?.email}`}>{data?.email}</a></p>
                                </span>
                                <span className="footerText">
                                    <p><strong>jobs</strong>&nbsp;<a href={`mailto:${data?.job}}`}>{data?.job}</a></p>
                            </span>
                            <span className="footerText">
                                <p><strong>call</strong>&nbsp;<a href={`tel:${data?.call}`}>{data?.call}</a></p>
                            </span>
                        </div>
                    </div>

                    <div className="col-md-2 col-lg-2 d-lg-block d-none">
                        <div className="paddingLeft footer__connect--wrapper">
                            <span className="footerHead d-md-block d-none">connect</span>
                            <div className="row footer__connect">
                                <div className="col-6 m-fl-right">
                                    <span className="footerText facebook-link"><p><a href={data?.facebook} target="_blank" rel="noreferrer noopener">facebook</a></p></span>
                                    <span className="footerText twitter-link"><p><a href={data?.twitter} target="_blank" rel="noreferrer noopener">twitter</a></p></span>
                                    <span className="footerText linkedin-link"><p><a href={data?.linkedin} target="_blank" rel="noreferrer noopener">linkedin</a></p></span>
                                </div>
                                <div className="col-6 m-fl-left">
                                    <span className="footerText instagram-link"><p><a href={data?.instagram} target="_blank" rel="noreferrer noopener">instagram</a></p></span>
                                    <span className="footerText vimeo-link"><p><a href={data?.vimeo} target="_blank" rel="noreferrer noopener">vimeo</a></p></span>
                                    <span className="footerText behance-link"><p><a href={data?.behance} target="_blank" rel="noreferrer noopener">behance</a></p></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 d-lg-block d-none">
                        <div className="quickLinks paddingLeft">
                            <span className="footerHead text-right">quickly</span>
                            <span className="footerText"><p><Link href="/contact">contact</Link></p></span>
                            <span className="footerText"><p><Link href="/our-team">team</Link></p></span>
                            <span className="footerText"><p><Link href="/careers">careers</Link></p></span>
                        </div>
                    </div>

                </div>
                <div className="row  d-lg-block d-none">
                    <div className="col-md-12">
                        <span className="copyright">© 1990-{(new Date().getFullYear())} itu chaudhuri design pvt ltd | all rights reserved. please note — no images or content from site can be reproduced without prior written consent from ICD</span>
                    </div>
                </div>

                {/* connect buttons for mobile */}
                </div>
                <div className="footer__connect d-lg-none d-block">
                    <span className="footerText facebook-link"><a href={data?.facebook} target="_blank" rel="noreferrer noopener">facebook</a></span>
                    <span className="footerText twitter-link"><a href={data?.twitter} target="_blank" rel="noreferrer noopener">twitter</a></span>
                    <span className="footerText linkedin-link"><a href={data?.linkedin} target="_blank" rel="noreferrer noopener">linkedin</a></span>
                    <span className="footerText instagram-link"><a href={data?.instagram} target="_blank" rel="noreferrer noopener">instagram</a></span>
                    <span className="footerText vimeo-link"><a href={data?.vimeo} target="_blank" rel="noreferrer noopener">vimeo</a></span>
                    <span className="footerText behance-link"><a href={data?.behance} target="_blank" rel="noreferrer noopener">behance</a></span>
                </div>
            </footer>
        </>
    )
}

export default Navbar

