import parse from 'html-react-parser';
import { getArticle  , getFooter  } from '../../lib/api'
import { useRouter } from 'next/router'
import Seo from '../../components/seo';
import Head from 'next/head';
import $ from 'jquery';
import Image from "next/image";
// import Comment from '../../components/comment'


import logo from '../../assets/images/logo/desktop-logo.png'
import Mobilelogo from '../../assets/images/logo/mobile-logo-new.png'
import facebook from '../../assets/images/social-media/facebook@2x.png'
import twitter from '../../assets/images/social-media/twitter@2x.png'
import instagram from '../../assets/images/social-media/instagram@2x.png'
import linkdin from '../../assets/images/social-media/linkedin@2x.png'
import website from '../../assets/images/social-media/icd-new.png'
import behance from '../../assets/images/social-media/behance-new.png'







export default function newsletterss({ newsletter }) {
    const router = useRouter()
    const seo = newsletter ? ( newsletter?.seo ?? {} ) : ( {} );
    const uri = newsletter ? ( newsletter?.uri ?? {} ) : (  {} );

    var url = ''
    var data_url = ''
  
    const copyElem = () => {
      var element =$('#htmlContent');
      var temp = $("<input>");
      $(".copyField").append(temp);
      temp.val($(element).html().replace(/&quot;/g, '')).select();
      document.execCommand("copy");
      temp.remove();
    };

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    var newsletterContent = newsletter?.content
    if(newsletterContent){
        var content = newsletterContent
    }else{
      content = ''
    }

    return (
      <>
      <Seo seo={seo} uri={uri}/>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:ital,wght@0,400;0,700;1,400" rel="stylesheet" type="text/css" />
        <style type="text/css" dangerouslySetInnerHTML={{__html: "body {\n        margin: 0;\n        padding: 0;\n    }\n b,strong{ font-weight: bold !important; } \n p{ margin-bottom: 16px !important; margin-top: 16px !important; } \n img{ display: none;} table img{ display: block; }    iframe{\n        width: 100% !important; \n    }\n\n    img{\n        width: 100%;\n        height: auto;\n    }\n\n    table,\n    td,\n    tr {\n        vertical-align: top;\n        border-collapse: collapse;\n    }\n\n    * {\n        line-height: inherit;\n    }\n\n    a[x-apple-data-detectors=true] {\n        color: inherit !important;\n        /*text-decoration: none !important;*/\n    }" }} /><style id="media-query" type="text/css" dangerouslySetInnerHTML={{__html: ".cfs-hyperlink{\n        font-style: italic !important;\n        font-size: 16px !important;\n        letter-spacing: -0.1px !important;\n        color: #171717 !important;\n    }\n\t\n\ta, \n\ta:visited {\n        text-decoration:underline !important;\n\t\tcolor: #171717 !important;\n\t}\n\n .article-headline a,\n.article-headline a:visited{ text-decoration: none !important; }    /* .large-flake,\n    .small-flake{\n        position: absolute;\n        width: 40px;\n        height: 40px;\n    }\n\n    .small-flake{\n        width: 20px;\n        height: 20px;\n    }\n\n    .large-position-1{\n        top: -15px;\n        left: 50%;\n    }\n\n    .large-position-2{\n        top: 35%;\n        left: -15%;\n    }\n\n    .large-position-3{\n        bottom: 0;\n        right: 0;\n    }\n\n    .small-position-1{\n        left: 30%;\n        bottom: 20px;\n    }\n\n    .small-position-2{\n        top: -10px;\n        left: 10%;\n    }\n\n    .small-position-3{\n        right: 25%;\n        bottom: 40%;\n    }\n\n    .small-position-4{\n        top: 25px;\n        right: -10%;\n    } */\n\n  .banner-cont{\n position: relative; \n}  \n .snow-flake-bg{\n position: absolute; \n top: 0; \n left: 0; \n width: 100%; \n height: 100%; \nbackground-repeat: no-repeat; \n        background-size: contain; \n        background-position: top center;\n    }\n  .snow-flake-dek{ display: block; } \n .snow-flake-mob{ display: none; }    \n    @media (max-width: 620px) {\n\n .snow-flake-dek{ display: none; } \n .snow-flake-mob{ display: block; }  \n   .block-grid,\n        .col {\n            min-width: 320px !important;\n            max-width: 100% !important;\n            display: block !important;\n        }\n\n   .block-grid {\n            width: 100% !important;\n        }\n\n        .col {\n            width: 100% !important;\n        }\n\n        .col>div {\n            margin: 0 auto;\n        }\n\n        img.fullwidth,\n        img.fullwidthOnMobile {\n            max-width: 100% !important;\n        }\n\n        .no-stack .col {\n            min-width: 0 !important;\n            display: table-cell !important;\n        }\n\n        .no-stack.two-up .col {\n            width: 50% !important;\n        }\n\n        .no-stack .col.num4 {\n            width: 33% !important;\n        }\n\n        .no-stack .col.num8 {\n            width: 66% !important;\n        }\n\n        .no-stack .col.num4 {\n            width: 33% !important;\n        }\n\n        .no-stack .col.num3 {\n            width: 25% !important;\n        }\n\n        .no-stack .col.num6 {\n            width: 50% !important;\n        }\n\n        .no-stack .col.num9 {\n            width: 75% !important;\n        }\n\n        .video-block {\n            max-width: none !important;\n        }\n\n        .mobile_hide {\n            min-height: 0px;\n            max-height: 0px;\n            max-width: 0px;\n            display: none;\n            overflow: hidden;\n            font-size: 0px;\n        }\n\n        .desktop_hide {\n            display: block !important;\n            max-height: none !important;\n        }\n\n        .title-cont,\n        .logo-cont{\n            width: 60% !important;\n            min-width: auto !important;\n            float: left;\n        }\n\n        .title-cont p{\n            font-size: 32px !important;\n            font-weight: 900 !important;\n            line-height: 31px !important;\n            letter-spacing: -0.5px !important;\n        }\n\n        .logo-cont{\n            width: 40% !important;\n        }\n\n        .newsletter-container {\n            padding: 0 10px;\n        }\n\n        .newsletter-title{\n            padding-left: 0 !important; \n            padding-bottom: 17px !important;\n        }\n\n        .article-meta{\n            padding: 20px 10px 0 !important;\n        }\n\n        .article-headline{\n            padding: 0 10px 12px !important;\n        }\n\n        .article-meta p,\n        .article-headline p span{\n            font-size: 12px !important;\n            /*font-weight: bold !important;*/\n            line-height: 28px !important;\n            color: #828282 !important;\n        }\n\n        .article-headline p,\n        .article-headline p span{\n            font-size: 26px !important;\n            line-height: 30px !important;\n            color: #171717 !important;\n        }\n\n        .article-content{\n            padding: 0 10px 25px !important;\n        }\n\n        .about-company{\n            padding: 20px 0 45px !important;\n        }\n\n        .about-company-text{\n            padding: 0 !important;\n        }\n\n        .about-company-text p span{\n            font-size: 16px !important;\n            font-weight: bold !important;\n            line-height: 22px !important;\n            color: #171717 !important;\n        }\n\n        .button-container{\n            padding: 0 !important;\n        }\n\n        .lets-talk-btn{\n            padding: 0 0 45px !important;  \n        }\n\n        .social-icons-cont{\n            padding: 0 0 20px !important;\n        }\n\n        .social-icons{\n            float: left !important;\n            width: 50% !important;\n        }\n\n        .social-icons tr td{\n            padding: 0  30px 0 0 !important;\n        }\n\n        .subscribe-cont{\n            padding: 0 0 40px !important;\n        }\n\n        .subscribe-cont p{\n            font-size: 12px !important;\n            letter-spacing: -0.08px !important;\n            color: #171717 !important;\n        }\n\n        .the-yellow-envelope {\n            font-size: 32px  !important;\n            line-height: 31px  !important;\n            letter-spacing: -0.5px  !important;\n            margin-bottom: 2px  !important;\n        }\n\n        .the-yellow-envelope-number {\n            font-size: 27px  !important; \n            line-height: 31px  !important;\n        }\n\n        .letter-text{\n            padding-left: 5px !important;\n            padding-right: 5px !important;\n        }\n\n\n    }" }} />
      </Head>
          <div id="htmlContent">
            <body className="clean-body" style={{margin: 0, padding: 0, WebkitTextSizeAdjust: '100%', backgroundColor: '#ffe300'}}>
              <table bgcolor="#ffe300" cellPadding={0} cellSpacing={0} className="nl-container" role="presentation" style={{tableLayout: 'fixed', verticalAlign: 'top', minWidth: 320, margin: '0 auto', borderSpacing: 0, borderCollapse: 'collapse', msoTableLspace: '0pt', msoTableRspace: '0pt', backgroundColor: '#ffe300', width: '100%'}} valign="top" width="100%">
                <tbody>
                  <tr style={{verticalAlign: 'top'}} valign="top">
                    <td style={{wordBreak: 'break-word', verticalAlign: 'top'}} valign="top" className="newsletter-container">
                      <div style={{backgroundColor: 'transparent'}} className="banner-cont">
                        <div className="block-grid two-up" style={{position: 'relative', margin: '0 auto', minWidth: 320, maxWidth: 600, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', backgroundColor: 'transparent'}}>
                          <div style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
                            <div className="col num6 title-cont" style={{maxWidth: 320, minWidth: 300, display: 'table-cell', verticalAlign: 'top', width: 300}}>
                              <div style={{width: '100% !important'}}>
                                <div style={{borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 15, paddingBottom: 5, paddingRight: 0, paddingLeft: 0}}>
                                  <div style={{color: '#171717', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', lineHeight: '1.2', paddingTop: 10, paddingRight: 10, paddingBottom: 23, paddingLeft: 10}} className="newsletter-title">
                                    <div style={{fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', fontSize: 12, lineHeight: '1.2', color: '#171717', msoLineHeightAlt: 14}}>
                                      <p style={{fontSize: 38, lineHeight: 1.2, msoLineHeightAlt: 46, margin: 0}}><span className="the-yellow-envelope-number" style={{fontSize: 40, lineHeight: 36+'px', display :'block'}}><strong>the yellow envelope</strong></span></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col num6 logo-cont" style={{maxWidth: 320, minWidth: 300, display: 'table-cell', verticalAlign: 'top', width: 300}}>
                              <div style={{width: '100% !important'}}>
                                <div style={{borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 35, paddingBottom: 5, paddingRight: 0, paddingLeft: 0}}>
                                  <div className="mobile_hide">
                                    <div align="right" className="img-container right autowidth" style={{paddingRight: 0, paddingLeft: 0}}>
                                      <a href="https://icdindia.com" tabIndex={-1} target="_blank"> <img priority decoding="async" align="right" alt="Image" border={0} className="right autowidth" src={logo.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', height: 'auto', border: 'none', width: '100%', maxWidth: 172, float: 'none', display: 'block'}} title="Image" width={172} /></a>
                                    </div>
                                  </div>
                                  <div className="desktop_hide mobile-logo" style={{msoHide: 'all', display: 'none', maxHeight: 0, overflow: 'hidden'}}>
                                    <div align="right" className="img-container right autowidth" style={{paddingRight: 0, paddingLeft: 0}}>
                                      <img priority alt='icd-icon' decoding="async" align="right" alt="Image" border={0} className="right autowidth" src={Mobilelogo.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', border: 0, height: 'auto', width: '100%', maxWidth: 54, float: 'none', display: 'block'}} title="Image" width={54} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="block-grid" style={{margin: '0 auto', minWidth: 320, maxWidth: 600, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word'}}>
                        <div className="col num12" style={{minWidth: 320, maxWidth: 600, display: 'table-cell', verticalAlign: 'top', width: 600}}>
                          <div style={{width: '100% !important'}}>
                            <div style={{borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0}}> 
                              <div className="letter-text" style={{fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', lineHeight: '1.2', paddingTop: 25, paddingRight: 10, paddingBottom: 30, paddingLeft: 10}}>
                                <div style={{fontFamily: 'Merriweather,Times,Times New Roman,serif', fontSize: 16, lineHeight: 25+'px', color: '#171717 !important'}}>
                                  <p>{ `Dear {{contact.FIRSTNAME }} `}</p>
                                  {/* <span dangerouslySetInnerHTML={{ __html: data.content }}></span> */}
                                  <span>
                                    {parse(content)}
                                  </span>
                                </div>
                              </div>
                            </div> 
                          </div>
                        </div>
                      </div>
                    {(newsletter.yellowEnvelope?.newsletterArticles)?.map( data  => ( 
                        data_url = data?.linkTo,
                      <>

                        {data_url &&  (
                          url = `/posts/${data_url.link?.[0].slug} `,
                          <>
                          </>
                            
                        )}
                        {!data_url &&  (
                            url = "#"
                        )}

                        <div style={{ backgroundColor: 'transparent' }} className="article-title" key={data.id}>
                          <div className="block-grid" style={{ margin: '0 auto', minWidth: 320, maxWidth: 600, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', backgroundColor: '#FFFFFF' }}>
                            <div style={{ borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: '#FFFFFF' }}>
                              <div className="col num12" style={{ minWidth: 320, maxWidth: 600, display: 'table-cell', verticalAlign: 'top', width: 600 }}>
                                <div style={{ width: '100% !important' }}>
                                  <div style={{ borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0 }}>
                                    <div className="article-meta" style={{ color: '#828282', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', lineHeight: '1.2', paddingTop: 25, paddingRight: 20, paddingBottom: 5, paddingLeft: 20 }}>
                                      <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', fontSize: 12, lineHeight: '1.2', color: '#828282', msoLineHeightAlt: 14 }}>
                                        <p style={{ fontSize: 12, lineHeight: '1.2', msoLineHeightAlt: 17 + 'px', margin: 0, letterSpacing: 2 }}>{data.seo?.title}</p>
                                      </div>
                                    </div>
                                    <div className="article-headline" style={{ color: '#171717', fontFamily: 'Merriweather,Times,Times New Roman,serif', lineHeight: '1.2', paddingTop: 0, paddingRight: 20, paddingBottom: 15, paddingLeft: 20 }}>
                                      <div style={{ fontFamily: 'Merriweather,Times,Times New Roman,serif', fontSize: 12, lineHeight: '1.2', color: '#171717', msoLineHeightAlt: 14 + 'px' }}>
                                        <p style={{ fontSize: 28, lineHeight: '1.2', msoLineHeightAlt: 34, margin: 0 }}>
                                          <span style={{ fontSize: 28, letterSpacing: 0 }}>
                                            <a style={{fontSize: 28, lineHeight: '1.2', msoLineHeightAlt: 34, margin: 0, letterSpacing: 0, textDecoration: 'none !important', color: '#171717'}} target="_blank" href={url}>{data.title}</a>
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
                        <div style={{ backgroundColor: 'transparent' }}>
                            <div className="block-grid" style={{ margin: '0 auto', minWidth: 320, maxWidth: 600, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', backgroundColor: '#FFFFFF' }}>
                              <div style={{ borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: '#FFFFFF' }}>
                                <div className="col num12" style={{ minWidth: 320, maxWidth: 600, display: 'table-cell', verticalAlign: 'top', width: 600 }}>
                                  <div style={{ width: '100% !important' }}>
                                    <div className="article-content" style={{ borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 0, paddingBottom: 25, paddingRight: 20, paddingLeft: 20 }}>
                                      <div align="center" className="img-container center autowidth fullwidth" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                        <a style={{color: '#171717', fontStyle: 'italic'}} target="_blank" href={url} ><img priority alt='icd-icon' decoding="async" align="center" alt="Image" border={0} className="center autowidth fullwidth" src={data.featuredImage?.node.sourceUrl} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', border: 0, height: 'auto', width: '100%', maxWidth: 560, display: 'block'}} title="Image" width={560} /></a>
                                      </div>
                                      <div style={{ fontFamily: 'Merriweather,Times,Times New Roman,serif', fontSize: 16, lineHeight: 25 + 'px', color: '#171717 !important' }}>
                                        <div>
                                            {parse(data?.content)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>

                      ))}
                      <div style={{backgroundColor: 'transparent'}}>
                        <div className="block-grid" style={{margin: '0 auto', minWidth: 320, maxWidth: 600, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', backgroundColor: 'transparent'}}>
                          <div style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
                            <div className="col num12" style={{minWidth: 320, maxWidth: 600, display: 'table-cell', verticalAlign: 'top', width: 600}}>
                              <div style={{width: '100% !important'}}>
                                <div className="about-company" style={{borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 40, paddingBottom: 40, paddingRight: 0, paddingLeft: 0}}>
                                  <div className="about-company-text" style={{color: '#171717', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif', lineHeight: '1.2', paddingTop: 10, paddingBottom: 10}}>
                                    <div style={{fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', fontSize: 12, lineHeight: '1.2', color: '#171717', msoLineHeightAlt: 14}}>
                                      <p style={{fontSize: 20, lineHeight: '1.2', msoLineHeightAlt: 24, margin: 0}}><span style={{fontSize: 20, lineHeight: 26+'px'}}><strong>Itu Chaudhuri Design brings powerful design and original thinking to make businesses succeed in the marketplace. It offers services in branding, packaging, communication and digital product design.</strong></span></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{backgroundColor: 'transparent'}}>
                        <div className="block-grid" style={{margin: '0 auto', minWidth: 320, maxWidth: 600, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', backgroundColor: 'transparent'}}>
                          <div style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
                            <div className="col num12" style={{minWidth: 320, maxWidth: 600, display: 'table-cell', verticalAlign: 'top', width: 600}}>
                              <div style={{width: '100% !important'}}>
                                <div className="lets-talk-btn" style={{borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 5, paddingBottom: 40, paddingRight: 0, paddingLeft: 0}}>
                                  <div align="left" className="button-container" style={{paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10}}>
                                    <a href="https://icdindia.com/our-team/" style={{WebkitTextSizeAdjust: 'none', textDecoration: 'none', display: 'inline-block', color: '#171717', backgroundColor: 'transparent', borderRadius: 4, WebkitBorderRadius: 0, MozBorderRadius: 4, width: 'auto', borderTop: '1px solid transparent', borderRight: '1px solid transparent', borderBottom: '1px solid #171717', borderLeft: '1px solid transparent', paddingTop: 0, paddingBottom: 0, fontFamily: 'Merriweather,Times,Times New Roman,serif', textAlign: 'center', msoBorderAlt: 'none', wordBreak: 'keep-all'}} target="_blank">
                                      <span style={{paddingLeft: 0, paddingRight: 0, fontSize: 16, display: 'inline-block'}}>
                                        <span style={{fontSize: 28, lineHeight: 32+'px', msoLineHeightAlt: 32}}>Let’s talk.</span>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{backgroundColor: 'transparent'}}>
                        <div className="block-grid two-up" style={{margin: '0 auto', minWidth: 320, maxWidth: 600, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', backgroundColor: 'transparent'}}>
                          <div style={{borderCollapse: 'collapse', display: 'table', width: '100%', backgroundColor: 'transparent'}}>
                            <div className="col num6" style={{maxWidth: 320, minWidth: 300, display: 'table-cell', verticalAlign: 'top', width: 300}}>
                              <div style={{width: '100% !important'}}>
                                <div style={{borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0}}>
                                  <table cellPadding={0} cellSpacing={0} className="social_icons" role="presentation" style={{tableLayout: 'fixed', verticalAlign: 'top', borderSpacing: 0, borderCollapse: 'collapse', msoTableLspace: '0pt', msoTableRspace: '0pt'}} valign="top" width="100%">
                                    <tbody>
                                      <tr style={{verticalAlign: 'top'}} valign="top">
                                        <td className="social-icons-cont" style={{wordBreak: 'break-word', verticalAlign: 'top', paddingTop: 10, paddingRight: 45, paddingBottom: 60, paddingLeft: 10}} valign="top">
                                          <table className="social-icons" activate="activate" align="left" alignment="alignment" cellPadding={0} cellSpacing={0} role="presentation" style={{tableLayout: 'fixed', verticalAlign: 'top', borderSpacing: 0, borderCollapse: 'undefined', msoTableTspace: 0, msoTableRspace: 0, msoTableBspace: 0, msoTableLspace: 0}} to="to" valign="top">
                                            <tbody>
                                              <tr align="left" style={{verticalAlign: 'top', display: 'inline-block', textAlign: 'left'}} valign="top">
                                                <td style={{wordBreak: 'break-word', verticalAlign: 'top', paddingBottom: 18, paddingRight: 30}} valign="top"><a href="https://www.facebook.com/ItuChaudhuriDesign/" target="_blank"><img priority decoding="async" alt="Facebook" height={32} src={facebook.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', height: 'auto', border: 'none', display: 'block'}} title="Facebook" width={32} /></a></td>
                                                <td style={{wordBreak: 'break-word', verticalAlign: 'top', paddingBottom: 18, paddingRight: 30}} valign="top"><a href="https://twitter.com/icdindia" target="_blank"><img priority decoding="async" alt="Twitter" height={32} src={twitter.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', height: 'auto', border: 'none', display: 'block'}} title="Twitter" width={32} /></a></td>
                                                <td style={{wordBreak: 'break-word', verticalAlign: 'top', paddingBottom: 18, paddingRight: 30}} valign="top"><a href="https://www.instagram.com/ituchaudhuridesign" target="_blank"><img priority decoding="async" alt="Instagram" height={32} src={instagram.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', height: 'auto', border: 'none', display: 'block'}} title="Instagram" width={32} /></a></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table className="social-icons" activate="activate" align="left" alignment="alignment" cellPadding={0} cellSpacing={0} role="presentation" style={{tableLayout: 'fixed', verticalAlign: 'top', borderSpacing: 0, borderCollapse: 'undefined', msoTableTspace: 0, msoTableRspace: 0, msoTableBspace: 0, msoTableLspace: 0}} to="to" valign="top">
                                            <tbody>
                                              <tr align="left" style={{verticalAlign: 'top', display: 'inline-block', textAlign: 'left'}} valign="top">
                                                <td style={{wordBreak: 'break-word', verticalAlign: 'top', paddingBottom: 18, paddingRight: 30}} valign="top"><a href="https://www.linkedin.com/company/itu-chaudhuri-design" target="_blank"><img priority decoding="async" alt="LinkedIn" height={32} src={linkdin.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', height: 'auto', border: 'none', display: 'block'}} title="LinkedIn" width={32} /></a></td>
                                                <td style={{wordBreak: 'break-word', verticalAlign: 'top', paddingBottom: 18, paddingRight: 30}} valign="top"><a href="https://www.behance.net/ituchaudhuridesign" target="_blank"><img priority decoding="async" alt="Behance" height={32} src={behance.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', height: 'auto', border: 'none', display: 'block'}} title="Custom" width={32} /></a></td>
                                                <td style={{wordBreak: 'break-word', verticalAlign: 'top', paddingBottom: 18, paddingRight: 30}} valign="top"><a href="https://icdindia.com" target="_blank"><img priority decoding="async" alt="icd-v3-vercel.vercel.app" height={32} src={website.src} style={{textDecoration: 'none', msInterpolationMode: 'bicubic', height: 'auto', border: 'none', display: 'block'}} title="Custom" width={32} /></a></td>
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
                            <div className="col num6" style={{maxWidth: 320, minWidth: 300, display: 'table-cell', verticalAlign: 'top', width: 300}}>
                              <div style={{width: '100% !important'}}>
                                <div style={{borderTop: '0px solid transparent', borderLeft: '0px solid transparent', borderBottom: '0px solid transparent', borderRight: '0px solid transparent', paddingTop: 5, paddingBottom: 5, paddingRight: 0, paddingLeft: 0}}>
                                  <div className="subscribe-cont" style={{color: '#171717', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', lineHeight: '1.2', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10}}>
                                    <div style={{fontFamily: 'Merriweather,Times,Times New Roman,serif', fontSize: 12, lineHeight: '1.2', color: '#171717', msoLineHeightAlt: 14}}>
                                      <p style={{fontSize: 12, lineHeight: 18+'px', msoLineHeightAlt: 17, margin: 0}}>You are receiving this newsletter because you have subscribed or have been recommended by a friend. If you'd like to add new subscribers, please click <a href="https://icdindia.com/newsletter-subscription/">here</a>. And to unfollow, please click on the unsubscribe link below.</p>
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
          <button value="copy" className="copyBlock" style={{opacity: '0', position: 'fixed', top: '0' , right: '0' , color: '#fff' , background: '#000'}} onClick={ copyElem }>copy</button>
          <div className="copyField"></div>
          
      </>
    )
  }
  
  export async function getServerSideProps({ params }) {
    const article = await getArticle(params.slug)
    // const menus = await getMenus()
    const data = await getFooter()
    // const filters = await getFilters()
    return {
      props: { 
        newsletter: article.newsletter,
        // menus,
        data,
        // filters
      },
      // revalidate: 180, 
    }
  }

  // export async function getStaticPaths() {
  //   const allnewsletters = await getAllNewsletterWithSlug()
  //   return {
  //     paths: allnewsletters.edges.map(({ node }) => `/yellow-envelope/${node.slug}`) || [],
  //     fallback: true,
  //   }
    
  // }