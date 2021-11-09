import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import dynamic from "next/dynamic";
const Head = dynamic(() => import('next/head'));
const Image = dynamic(() => import("next/image"));


import loader from '../../assets/images/loader/page-loader.gif'


import style from './client.module.scss'
import category from '../project/category.module.scss'
import alphabet from './alphabetically.module.scss'


export default function clients({meta , edges}) {
    const backButton = () => {
        window.history.back();
    }

    var currletter = ''
    var projectletter = ''
    var groups = [];
    edges.map((node) => {
        var data = node?.node
        const letter = data.name.charAt(0);
        groups[letter] = groups[letter] || [];
        groups[letter].push(data);
        return groups;
    });

    var arrays = [], size = 4;
    Object.keys(groups).map((key) => {
        var items = Math.ceil(groups[key].length/4);
        for( var i = 0; i < items; i++){
            arrays.push(groups[key].splice(0, size));
        }
    });


  return (
        <>
        <NextSeo
          title={meta.seo.title}
          description={meta.seo.metaDesc}
          canonical="https://icd-v3-vercel.vercel.app/clients"
          robots={meta.metaRobotsNoindex}
          googlebot={meta.metaRobotsNofollow}
          openGraph={{
              url: 'https://icd-v3-vercel.vercel.app/clients',
              title: meta.seo.title,
              description: meta.seo.metaDesc,
              images: [
                  {
                      url: meta.featuredImage?.node.sourceUrl,
                      alt: 'homepage-image',
                      type: 'image/jpeg',
                  },
              ],
              site_name: meta.seo.title,
          }} />
          <Head>
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={meta.seo.title} />
              <meta name="twitter:description" content={meta.seo.metaDesc} />
              <meta name="twitter:url" content="https://icd-v3-vercel.vercel.app/clients" />
              <meta name="twitter:image" content={meta.featuredImage?.node.sourceUrl} />
          </Head>
 

        <section className="client__page mT__260 page__header">
            <div className="container page__header--container">
                <div className="row">
                <div className="col-12 col-md-4 page__header--title">
                <div className="back-cta" onClick={backButton}><span className="backBtn"></span><h1>{meta.title}</h1></div>
                </div>
                <div className="col-12 col-md-8 page__header--nav bottom__align nav__subPage">
                    <a href="/clients" className={` project__filter ${category.project__filter} ${category.filter__active} filter__active`}>alphabetically</a>
                    <a href="/clients/industry" className="project__filter marginRight">industry</a>
                </div>
                </div>
                <span className="bottom__border"></span>
            </div>
        </section>
        <div className="container">
            <div className="row">
                {arrays.map((data)  => ( 
                    // console.log(data),
                    <div className="col-md-4 clientGrid--item">
                        <div className={`${alphabet.clients_alpha_cont} ${style.clients_alpha_cont}`}>
                            {data.map((data) => {
                                var letter = data.name.charAt(0);
                                var projectData = data.projects?.edges[0]?.node
                                var leadImgSrc = projectData?.featuredImage?.node?.sourceUrl
                                var ProjectLink = projectData?.slug
                                if(letter != currletter){
                                    projectletter = <h2 className={alphabet.alpha_letter}>{letter}</h2>
                                } else {
                                    projectletter = '';
                                }

                                if(ProjectLink){
                                    var projecturl =    
                                    <p className={`${style.client_name} ${alphabet.client_name}`}>
                                        <Link href={` projects/${ProjectLink}` }>
                                            {data.name}
                                        </Link>
                                    </p>
                                }else{
                                    var projecturl =    
                                    <p className={`${style.client_name} ${alphabet.client_name}`}>
                                        <Link href="/projects">
                                            {data.name}
                                        </Link>
                                    </p>
                                }
                               

                                if(leadImgSrc){
                                    var thumbnail = 
                                    <div class={alphabet.client_thumbnail}>
                                        <Image placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="  src={leadImgSrc} alt="project-lead" layout="fill" />
                                    </div>   
                                }else{
                                    var thumbnail = 
                                    <div class={alphabet.client_thumbnail}>
                                        <Image placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="  src={loader.src} alt="project-lead" layout="fill" />
                                    </div>   
                                }

                                return (
                                    <React.Fragment>
                                        {projectletter}
                                        {projecturl}
                                        {thumbnail}
                                    </React.Fragment>
                                );
                            })}

                            <span className={`${alphabet.client_white_bg} ${alphabet.client_white_bg_1}`} />
                            <span className={`${alphabet.client_white_bg} ${alphabet.client_white_bg_2}`} />
                            <span className={`${alphabet.client_white_bg} ${alphabet.client_white_bg_3}`} />
                            <span className={`${alphabet.client_white_bg} ${alphabet.client_white_bg_4}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}