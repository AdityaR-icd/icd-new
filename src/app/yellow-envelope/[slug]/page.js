import parse from "html-react-parser";
import { getArticle, getAllNewsletterWithSlug } from "@/lib/api";
import { buildMetadata } from "@/lib/seo-utils";
import CopyButton from "./CopyButton";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug);
  return buildMetadata(data?.newsletter?.seo, { title: data?.newsletter?.title });
}

export async function generateStaticParams() {
  const newsletters = await getAllNewsletterWithSlug();
  // Pre-build only the 5 most recent; the rest are rendered on first request (ISR)
  return (newsletters?.edges ?? []).slice(0, 5).map(({ node }) => ({ slug: node.slug }));
}

export default async function NewsletterPage({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug);
  const newsletter = data?.newsletter;

  if (!newsletter) {
    return <div>Newsletter not found.</div>;
  }

  const content = newsletter.content ?? "";

  return (
    <>
      <div id="htmlContent">
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta content="width=device-width" name="viewport" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Merriweather:ital,wght@0,400;0,700;1,400" rel="stylesheet" type="text/css" />
          <style type="text/css" dangerouslySetInnerHTML={{ __html: `
body { margin: 0; padding: 0; }
b, strong { font-weight: bold !important; }
p { margin-bottom: 16px; margin-top: 16px; }
figure { margin: 0; }
figure img { width: 100%; height: auto; }
img { width: 100%; height: auto; }
table img { display: block; width: 100%; }
iframe { width: 100% !important; }
table, td, tr { vertical-align: top; border-collapse: collapse; }
* { line-height: inherit; }
a[x-apple-data-detectors=true] { color: inherit !important; }
.cfs-hyperlink { font-style: italic !important; font-size: 16px !important; letter-spacing: -0.1px !important; color: #171717 !important; }
a, a:visited { text-decoration: underline !important; color: #171717 !important; }
.article-headline a, .article-headline a:visited { text-decoration: none !important; }
.banner-cont { position: relative; }
.snow-flake-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-repeat: no-repeat; background-size: contain; background-position: top center; }
.snow-flake-dek { display: block; }
.snow-flake-mob { display: none; }
@media (max-width: 620px) {
  .snow-flake-dek { display: none; }
  .snow-flake-mob { display: block; }
  .block-grid, .col { min-width: 320px !important; max-width: 100% !important; display: block !important; }
  .block-grid { width: 100% !important; }
  .col { width: 100% !important; }
  .col > div { margin: 0 auto; }
  img.fullwidth, img.fullwidthOnMobile { max-width: 100% !important; }
  .no-stack .col { min-width: 0 !important; display: table-cell !important; }
  .no-stack.two-up .col { width: 50% !important; }
  .no-stack .col.num4 { width: 33% !important; }
  .no-stack .col.num8 { width: 66% !important; }
  .no-stack .col.num3 { width: 25% !important; }
  .no-stack .col.num6 { width: 50% !important; }
  .no-stack .col.num9 { width: 75% !important; }
  .video-block { max-width: none !important; }
  .mobile_hide { min-height: 0px; max-height: 0px; max-width: 0px; display: none; overflow: hidden; font-size: 0px; }
  .desktop_hide { display: block !important; max-height: none !important; }
  .title-cont, .logo-cont { width: 60% !important; min-width: auto !important; float: left; }
  .title-cont p { font-size: 32px !important; font-weight: 900 !important; line-height: 31px !important; letter-spacing: -0.5px !important; }
  .logo-cont { width: 40% !important; }
  .newsletter-container { padding: 0 10px; }
  .newsletter-title { padding-left: 0 !important; padding-bottom: 17px !important; }
  .article-meta { padding: 20px 10px 0 !important; }
  .article-headline { padding: 0 10px 12px !important; }
  .article-meta p, .article-headline p span { font-size: 12px !important; line-height: 28px !important; color: #828282 !important; }
  .article-headline p, .article-headline p span { font-size: 26px !important; line-height: 30px !important; color: #171717 !important; }
  .article-content { padding: 0 10px 25px !important; }
  .about-company { padding: 20px 0 45px !important; }
  .about-company-text { padding: 0 !important; }
  .about-company-text p span { font-size: 16px !important; font-weight: bold !important; line-height: 22px !important; color: #171717 !important; }
  .button-container { padding: 0 !important; }
  .lets-talk-btn { padding: 0 0 45px !important; }
  .social-icons-cont { padding: 0 0 20px !important; }
  .social-icons { float: left !important; width: 50% !important; }
  .social-icons tr td { padding: 0 30px 0 0 !important; }
  .subscribe-cont { padding: 0 0 40px !important; }
  .subscribe-cont p { font-size: 12px !important; letter-spacing: -0.08px !important; color: #171717 !important; }
  .the-yellow-envelope { font-size: 32px !important; line-height: 31px !important; letter-spacing: -0.5px !important; margin-bottom: 2px !important; }
  .the-yellow-envelope-number { font-size: 27px !important; line-height: 31px !important; }
  .letter-text { padding-left: 5px !important; padding-right: 5px !important; }
}
          ` }} />
        </head>

        <body className="clean-body" style={{ margin: 0, padding: 0, WebkitTextSizeAdjust: "100%", backgroundColor: "#ffe300" }}>
          <table bgcolor="#ffe300" cellPadding={0} cellSpacing={0} className="nl-container" role="presentation" style={{ tableLayout: "fixed", verticalAlign: "top", minWidth: 320, margin: "0 auto", borderSpacing: 0, borderCollapse: "collapse", backgroundColor: "#ffe300", width: "100%" }} valign="top" width="100%">
            <tbody>
              <tr style={{ verticalAlign: "top" }} valign="top">
                <td style={{ wordBreak: "break-word", verticalAlign: "top" }} valign="top" className="newsletter-container">

                  {/* Header */}
                  <div style={{ backgroundColor: "transparent" }} className="banner-cont">
                    <div className="block-grid two-up" style={{ position: "relative", margin: "0 auto", minWidth: 320, maxWidth: 600, overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word", backgroundColor: "transparent" }}>
                      <div style={{ borderCollapse: "collapse", display: "table", width: "100%", backgroundColor: "transparent" }}>
                        <div className="col num6 title-cont" style={{ maxWidth: 320, minWidth: 300, display: "table-cell", verticalAlign: "top", width: 300 }}>
                          <div style={{ width: "100% !important" }}>
                            <div style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 15, paddingBottom: 5, paddingRight: 0, paddingLeft: 0 }}>
                              <div style={{ color: "#171717", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif", lineHeight: "1.2", paddingTop: 10, paddingRight: 10, paddingBottom: 23, paddingLeft: 10 }} className="newsletter-title">
                                <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif", fontSize: 12, lineHeight: "1.2", color: "#171717" }}>
                                  <p style={{ fontSize: 38, lineHeight: 1, margin: 0 }}>
                                    <span className="the-yellow-envelope" style={{ fontSize: 40, lineHeight: "36px", marginBottom: 4 }}>
                                      <strong>the yellow envelope</strong>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col num6 logo-cont" style={{ maxWidth: 320, minWidth: 300, display: "table-cell", verticalAlign: "top", width: 300 }}>
                          <div style={{ width: "100% !important" }}>
                            <div style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 35, paddingBottom: 5, paddingRight: 0, paddingLeft: 0 }}>
                              <div className="mobile_hide">
                                <div align="right" className="img-container right autowidth" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                  <a href="https://www.icdindia.com" tabIndex={-1} target="_blank">
                                    <img loading="lazy" decoding="async" align="right" alt="ICD India" border={0} className="right autowidth" src="http://icdlabs.in/icd-blog/wp-content/themes/kotha/assets/images/logo_red_dek.png" style={{ textDecoration: "none", height: "auto", border: "none", width: "100%", maxWidth: 172, float: "none", display: "block" }} width={172} />
                                  </a>
                                </div>
                              </div>
                              <div className="desktop_hide mobile-logo" style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
                                <div align="right" className="img-container right autowidth" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                  <img loading="lazy" decoding="async" align="right" alt="ICD India" border={0} className="right autowidth" src="http://icdlabs.in/icd-blog/wp-content/themes/kotha/assets/images/logo_red_mob.png" style={{ textDecoration: "none", border: 0, height: "auto", width: "100%", maxWidth: 54, float: "none", display: "block" }} width={54} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Letter body */}
                  <div className="block-grid" style={{ margin: "0 auto", minWidth: 320, maxWidth: 600, overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}>
                    <div className="col num12" style={{ minWidth: 320, maxWidth: 600, display: "table-cell", verticalAlign: "top", width: 600 }}>
                      <div style={{ width: "100% !important" }}>
                        <div style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0 }}>
                          <div className="letter-text" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif", lineHeight: "1.2", paddingTop: 25, paddingRight: 10, paddingBottom: 30, paddingLeft: 10 }}>
                            <div style={{ fontFamily: "Merriweather,Times,Times New Roman,serif", fontSize: 16, lineHeight: "25px", color: "#171717" }}>
                              <p>{`Dear {{contact.FIRSTNAME }}`}</p>
                              <span>{parse(content)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter articles */}
                  {(newsletter.yellowEnvelope?.newsletterArticles ?? []).map((article) => {
                    const name = (article.excerpt ?? "").replace(/(<p[^>]+?>|<p>|<\/p>)/gi, "");
                    const linkedSlug = article.linkTo?.link?.[0]?.slug;
                    return (
                      <div key={article.id}>
                        <div style={{ backgroundColor: "transparent" }} className="article-title">
                          <div className="block-grid" style={{ margin: "0 auto", minWidth: 320, maxWidth: 600, overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word", backgroundColor: "#FFFFFF" }}>
                            <div style={{ borderCollapse: "collapse", display: "table", width: "100%", backgroundColor: "#FFFFFF" }}>
                              <div className="col num12" style={{ minWidth: 320, maxWidth: 600, display: "table-cell", verticalAlign: "top", width: 600 }}>
                                <div style={{ width: "100% !important" }}>
                                  <div style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0 }}>
                                    <div className="article-meta" style={{ color: "#828282", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif", lineHeight: "1.2", paddingTop: 25, paddingRight: 20, paddingBottom: 5, paddingLeft: 20 }}>
                                      <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif", fontSize: 12, lineHeight: "1.2", color: "#828282" }}>
                                        <p style={{ fontSize: 12, lineHeight: "1.2", margin: 0, letterSpacing: 2 }}>{name}</p>
                                      </div>
                                    </div>
                                    <div className="article-headline" style={{ color: "#171717", fontFamily: "Merriweather,Times,Times New Roman,serif", lineHeight: "1.2", paddingTop: 0, paddingRight: 20, paddingBottom: 15, paddingLeft: 20 }}>
                                      <div style={{ fontFamily: "Merriweather,Times,Times New Roman,serif", fontSize: 12, lineHeight: "1.2", color: "#171717" }}>
                                        <p style={{ fontSize: 28, lineHeight: "1.2", margin: 0 }}>
                                          <span style={{ fontSize: 28, letterSpacing: 0 }}>
                                            {linkedSlug ? (
                                              <a href={`/posts/${linkedSlug}`} style={{ fontSize: 28, lineHeight: "1.2", margin: 0, letterSpacing: 0, textDecoration: "none", color: "#171717" }} target="_blank">{article.title}</a>
                                            ) : (
                                              <span style={{ fontSize: 28, lineHeight: "1.2", color: "#171717" }}>{article.title}</span>
                                            )}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ backgroundColor: "transparent" }}>
                          <div className="block-grid" style={{ margin: "0 auto", minWidth: 320, maxWidth: 600, overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word", backgroundColor: "#FFFFFF" }}>
                            <div style={{ borderCollapse: "collapse", display: "table", width: "100%", backgroundColor: "#FFFFFF" }}>
                              <div className="col num12" style={{ minWidth: 320, maxWidth: 600, display: "table-cell", verticalAlign: "top", width: 600 }}>
                                <div style={{ width: "100% !important" }}>
                                  <div className="article-content" style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 0, paddingBottom: 25, paddingRight: 20, paddingLeft: 20 }}>
                                    <div style={{ fontFamily: "Merriweather,Times,Times New Roman,serif", fontSize: 16, lineHeight: "25px", color: "#171717" }}>
                                      <div className="mian-article-content" dangerouslySetInnerHTML={{ __html: article.content ?? "" }} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* About company */}
                  <div style={{ backgroundColor: "transparent" }}>
                    <div className="block-grid" style={{ margin: "0 auto", minWidth: 320, maxWidth: 600, overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word", backgroundColor: "transparent" }}>
                      <div style={{ borderCollapse: "collapse", display: "table", width: "100%", backgroundColor: "transparent" }}>
                        <div className="col num12" style={{ minWidth: 320, maxWidth: 600, display: "table-cell", verticalAlign: "top", width: 600 }}>
                          <div style={{ width: "100% !important" }}>
                            <div className="about-company" style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 40, paddingBottom: 40, paddingRight: 0, paddingLeft: 0 }}>
                              <div className="about-company-text" style={{ color: "#171717", fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif', lineHeight: "1.2", paddingTop: 10, paddingBottom: 10 }}>
                                <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif", fontSize: 12, lineHeight: "1.2", color: "#171717" }}>
                                  <p style={{ fontSize: 20, lineHeight: "1.2", margin: 0 }}>
                                    <span style={{ fontSize: 20, lineHeight: "26px" }}>
                                      <strong>Itu Chaudhuri Design brings powerful design and original thinking to make businesses succeed in the marketplace. It offers services in branding, packaging, communication and digital product design.</strong>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Let's talk button */}
                  <div style={{ backgroundColor: "transparent" }}>
                    <div className="block-grid" style={{ margin: "0 auto", minWidth: 320, maxWidth: 600, overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word", backgroundColor: "transparent" }}>
                      <div style={{ borderCollapse: "collapse", display: "table", width: "100%", backgroundColor: "transparent" }}>
                        <div className="col num12" style={{ minWidth: 320, maxWidth: 600, display: "table-cell", verticalAlign: "top", width: 600 }}>
                          <div style={{ width: "100% !important" }}>
                            <div className="lets-talk-btn" style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 5, paddingBottom: 40, paddingRight: 0, paddingLeft: 0 }}>
                              <div align="left" className="button-container" style={{ paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
                                <a href="https://www.icdindia.com/contact/" style={{ WebkitTextSizeAdjust: "none", textDecoration: "none", display: "inline-block", color: "#171717", backgroundColor: "transparent", borderRadius: 4, width: "auto", borderTop: "1px solid transparent", borderRight: "1px solid transparent", borderBottom: "1px solid #171717", borderLeft: "1px solid transparent", paddingTop: 0, paddingBottom: 0, fontFamily: "Merriweather,Times,Times New Roman,serif", textAlign: "center", wordBreak: "keep-all" }} target="_blank">
                                  <span style={{ paddingLeft: 0, paddingRight: 0, fontSize: 16, display: "inline-block" }}>
                                    <span style={{ fontSize: 28, lineHeight: "32px" }}>Let&apos;s talk.</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social icons + subscribe */}
                  <div style={{ backgroundColor: "transparent" }}>
                    <div className="block-grid two-up" style={{ margin: "0 auto", minWidth: 320, maxWidth: 600, overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word", backgroundColor: "transparent" }}>
                      <div style={{ borderCollapse: "collapse", display: "table", width: "100%", backgroundColor: "transparent" }}>
                        <div className="col num6" style={{ maxWidth: 320, minWidth: 300, display: "table-cell", verticalAlign: "top", width: 300 }}>
                          <div style={{ width: "100% !important" }}>
                            <div style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0 }}>
                              <table cellPadding={0} cellSpacing={0} className="social_icons" role="presentation" style={{ tableLayout: "fixed", verticalAlign: "top", borderSpacing: 0, borderCollapse: "collapse" }} valign="top" width="100%">
                                <tbody>
                                  <tr style={{ verticalAlign: "top" }} valign="top">
                                    <td className="social-icons-cont" style={{ wordBreak: "break-word", verticalAlign: "top", paddingTop: 10, paddingRight: 45, paddingBottom: 60, paddingLeft: 10 }} valign="top">
                                      <table className="social-icons" align="left" cellPadding={0} cellSpacing={0} role="presentation" style={{ tableLayout: "fixed", verticalAlign: "top", borderSpacing: 0, borderCollapse: "collapse" }} valign="top">
                                        <tbody>
                                          <tr align="left" style={{ verticalAlign: "top", display: "inline-block", textAlign: "left" }} valign="top">
                                            <td style={{ wordBreak: "break-word", verticalAlign: "top", paddingBottom: 18, paddingRight: 30 }} valign="top"><a href="https://www.facebook.com/ItuChaudhuriDesign/" target="_blank"><img loading="lazy" decoding="async" alt="Facebook" height={32} src="http://icdlabs.in/ylp/images/facebook@2x.png" style={{ textDecoration: "none", height: "auto", border: "none", display: "block" }} width={32} /></a></td>
                                            <td style={{ wordBreak: "break-word", verticalAlign: "top", paddingBottom: 18, paddingRight: 30 }} valign="top"><a href="https://twitter.com/icdindia" target="_blank"><img loading="lazy" decoding="async" alt="Twitter" height={32} src="http://icdlabs.in/ylp/images/twitter@2x.png" style={{ textDecoration: "none", height: "auto", border: "none", display: "block" }} width={32} /></a></td>
                                            <td style={{ wordBreak: "break-word", verticalAlign: "top", paddingBottom: 18, paddingRight: 30 }} valign="top"><a href="https://www.instagram.com/ituchaudhuridesign" target="_blank"><img loading="lazy" decoding="async" alt="Instagram" height={32} src="http://icdlabs.in/ylp/images/instagram@2x.png" style={{ textDecoration: "none", height: "auto", border: "none", display: "block" }} width={32} /></a></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table className="social-icons" align="left" cellPadding={0} cellSpacing={0} role="presentation" style={{ tableLayout: "fixed", verticalAlign: "top", borderSpacing: 0, borderCollapse: "collapse" }} valign="top">
                                        <tbody>
                                          <tr align="left" style={{ verticalAlign: "top", display: "inline-block", textAlign: "left" }} valign="top">
                                            <td style={{ wordBreak: "break-word", verticalAlign: "top", paddingBottom: 18, paddingRight: 30 }} valign="top"><a href="https://www.linkedin.com/company/itu-chaudhuri-design" target="_blank"><img loading="lazy" decoding="async" alt="LinkedIn" height={32} src="http://icdlabs.in/ylp/images/linkedin@2x.png" style={{ textDecoration: "none", height: "auto", border: "none", display: "block" }} width={32} /></a></td>
                                            <td style={{ wordBreak: "break-word", verticalAlign: "top", paddingBottom: 18, paddingRight: 30 }} valign="top"><a href="https://www.behance.net/ituchaudhuridesign" target="_blank"><img loading="lazy" decoding="async" alt="Behance" height={32} src="http://icdlabs.in/ylp/images/behance-new.png" style={{ textDecoration: "none", height: "auto", border: "none", display: "block" }} width={32} /></a></td>
                                            <td style={{ wordBreak: "break-word", verticalAlign: "top", paddingBottom: 18, paddingRight: 30 }} valign="top"><a href="https://www.icdindia.com" target="_blank"><img loading="lazy" decoding="async" alt="www.icdindia.com" height={32} src="http://icdlabs.in/ylp/images/icd-new.png" style={{ textDecoration: "none", height: "auto", border: "none", display: "block" }} width={32} /></a></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="col num6" style={{ maxWidth: 320, minWidth: 300, display: "table-cell", verticalAlign: "top", width: 300 }}>
                          <div style={{ width: "100% !important" }}>
                            <div style={{ borderTop: "0px solid transparent", borderLeft: "0px solid transparent", borderBottom: "0px solid transparent", borderRight: "0px solid transparent", paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0 }}>
                              <div className="subscribe-cont" style={{ color: "#171717", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif", lineHeight: "1.2", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
                                <div style={{ fontFamily: "Merriweather,Times,Times New Roman,serif", fontSize: 12, lineHeight: "1.2", color: "#171717" }}>
                                  <p style={{ fontSize: 12, lineHeight: "18px", margin: 0 }}>
                                    You are receiving this newsletter because you have subscribed or have been recommended by a friend. If you&apos;d like to add new subscribers, please click <a href="https://icdindia.com/newsletter-subscription/">here</a>. And to unfollow, please click on the unsubscribe link below.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </div>

      <CopyButton />
    </>
  );
}
