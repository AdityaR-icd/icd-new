import parse from 'html-react-parser';
import {getAllProjectsWithSlug , getProject , getMenus , getFooter} from '../../lib/api'
import { useRouter } from 'next/router'
import Image from 'next/image'
import dynamic from "next/dynamic";

import Share from '../../assets/images/post-buttons/share.svg'
const Like = dynamic(() => import("../../components/like"));
const Seo = dynamic(() => import("../../components/seo"));


import $ from 'jquery';
import { useMediaQuery } from 'react-responsive';
import style from '../../styles/singleProject.module.scss'




export default function Projects({ project , data , menus }) {
  const router = useRouter()
  const seo = project ? ( project?.seo ?? {} ) : ( {} );
	const uri = project ? ( project?.uri ?? {} ) : (  {} );
  const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 761px)' });

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const showModal = () => {
      $('.project_details_modal').removeClass(`${style.hide_popup}`);
    } 

    const hideModal = () => {
      $('.project_details_modal').addClass(`${style.hide_popup}`);
    }

    const toggleShareIcons = () => {
      $('.share-icon').toggleClass('icons-hide');
    }


    var title = project.title;
    var heading = project.projectComponent?.heading;
    var description = project.projectComponent?.description;
    var shortDesc = project.shortDescription?.shortDesc;
    var clients = project.clients?.edges[0]?.node?.name;
    var leadComponent = project.leadComponent?.leadComponent?.sourceUrl
    var leadComponentMobile = project.leadComponent?.leadComponentMobile?.sourceUrl
    var content = project?.content

    var shareBtn =  <div className={`${style.social__media} social__media`}>
                      <span className="icon share-icon icons-hide"><a href={data.linkedin} className="linkedin-icon" target="_blank"></a></span>
                      <span className="icon share-icon icons-hide"><a href={data.twitter} className="twitter-icon" target="_blank"></a></span>
                      <span className="icon share-icon icons-hide"><a href={data.facebook} className="fb-icon" target="_blank"></a></span>
                      <span className="icon" onClick={ toggleShareIcons }><img loading="lazy" decoding="async" src={ Share.src } width="20" height="20" className="icon-img shareIcon--main" />share</span>
                      <Like count={project.likes?.likes}  id={project.id} type={'project'} />
                    </div>;
    return (
      <>
      <Seo seo={seo} uri={uri}/>

           {leadComponent && (
              <section className={style.singleProjectLeadCont}>    
                  <div className={style.leadImage}>
                    <div className={style.images_loaded_container}>
                    {isDesktop && (
                      <>
                        <Image src={leadComponent} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="  alt="project-lead" layout="fill" />
                      </>
                      )}
                      {isMobile && (
                        <>
                          <Image src={leadComponentMobile} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" alt="project-lead" layout="fill" />
                        </>
                      )}
                    </div>
                  </div>
              </section>
            )}

            <article className={style.singleProject}>
              <div className={` project_details_modal ${style.project_details_modal} ${style.hide_popup}`}>
                  <div className="container">
                      <div className="row">
                          <span className={`close-button ${style.close_button}`} onClick={ hideModal }></span>
                          <div className="col-lg-5 col-xl-4">
                            <span className={style.modal_project_title}>{title}<span className="hidden">Winner</span></span>
                            <div className={style.projectMeta__cont}>
                              <span className={style.category__title}>project</span>
                              <span className={style.category}>{heading}</span>
                            </div>
                            <div className={style.projectMeta__cont}>
                              <span className={style.category__title}>client</span>
                              <span className={style.category}>{clients}</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-xl-7">
                              <div>
                              {description && (
                                parse(description)
                              )}
                              </div>
                              <div className={style.projectContent__footer}>
                                  <button onClick={ hideModal }>close</button>
                                  { shareBtn }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className={`container ${style.projectHeading}`}>
                <div className="row">
                    <div className="col-12 offset-md-3 col-md-8 col-xl-8 offset-xl-4">
                      <div className={style.titlePadding}>
                          <h1 className={style.project__Title}>{title}<span className="hidden">Winner</span></h1>
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 offset-md-3 col-md-8 col-xl-8 offset-xl-4">
                      <div className={style.projectMeta__cont}><span className={style.category__title}>project</span><span className={style.category}>{heading}</span></div>
                      <div className={style.projectMeta__cont}><span className={style.category__title}>client</span><span className={style.category}>{clients}</span></div>
                      {project.awards.awardsReceived > ''  &&  (
                        <>
                          <div className={style.projectMeta__cont}><span className={style.category__title}>awards</span><span className={style.category}></span></div>
                        </>
                      )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 offset-md-3 col-md-8 col-xl-8 offset-xl-4">
                      <div className={style.project__summary}>
                          <div className={style.intro_para}>
                            <div>
                              <p>
                              {shortDesc && (
                                parse(shortDesc)
                              )}
                              </p>
                            </div>
                          </div>
                          <button className={style.collapse__btn} onClick={ showModal }>project detail</button>
                      </div>
                    </div>
                </div>
              </div>
              <div className={`container ${style.projectHeading}`}>
                {content && (
                  parse(content)
                )}
                { shareBtn }
              </div>
          </article>
      </>
    )
  }
  
  export async function getStaticProps({ params }) {
    const gProject = await getProject(params.slug)
    const menus = await getMenus()
    const data = await getFooter()
    return {
      props: { 
        project: gProject.project,
        menus,
        data
      },
      revalidate: 1, 
    }
  }

  export async function getStaticPaths() {
    const allProjects = await getAllProjectsWithSlug() 
    return {
      paths: allProjects.edges.map(({ node }) => `/projects/${node.slug}`) || [] ,
      fallback: true,
    }
    
  }