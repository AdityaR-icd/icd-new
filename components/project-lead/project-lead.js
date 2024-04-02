import styles from './project.module.scss'
import style from '../home/home.module.scss'
import intro from './intro.module.scss'
import parse from 'html-react-parser';
import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react';

export default function projectLead({ edges , latestProject }){
    let client = ""
    let project_video = ""
    let project_thumbnail = ""
    let project_thumbnail_mobile = ""
    let i = 0
    let j = 0
    let text = ""
    var common
    const projects = edges[0].node.projects.highlightedProjects
    const [project, setProjects] = useState(latestProject)


    var id = []
    var project_id = []
    if (project?.edges) {
        project?.edges.map(({ node }) => {
            id.push(node?.id)
        })
    }


    projects.map(( node ) => {
        project_id.push(node?.id)
    })
    function intersection(first, second){
        var s = new Set(second);
        return first.filter(item => s.has(item));
    };
    
    common = intersection(project_id , id)

    

    const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)

    const shimmer = (w, h) => `
        <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient id="g">
                <stop stop-color="#f6f6f6" offset="20%" />
                <stop stop-color="#f0f0f0" offset="50%" />
                <stop stop-color="#f6f6f6" offset="70%" />
            </linearGradient>
          </defs>
          <rect width="${w}" height="${h}" fill="#F6F6F6" />
          <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
          <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`
    return(
        <>
        {projects.map(({ highlightedImage , clients } , j) => (
            
            project_video = highlightedImage?.videoForDesktop?.mediaItemUrl,
            project_thumbnail = highlightedImage?.highlightedThumbnail?.sourceUrl,
            project_thumbnail_mobile = highlightedImage?.highlightedThumbnailMobile?.sourceUrl,
            client = clients.edges[0].node.name,

            // console.log(projects[j]?.id , '.............' ,common),
            // console.log(project_video),
                <>
                {edges.map(({ node } ) => (
                    <>
                        {(

                            function (home_text) {
                            if ( j % 2 !== 0 && j > 0 ) {
                                text = (
                                    <div className={`${style.textContainer} container`}>
                                        <div className="row">
                                            <div className="col-md-10 offset-md-1">
                                                <div className={`${intro.textContent} ${style.introText} ${intro.homeLeadText}`}>
                                                    <span className={`${style.homeText}`}>
                                                        {node?.featuredtext[i]?.content && parse(node?.featuredtext[i]?.content)}   
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                                i = i + 1;
                            } else{
                            text = '';
                            }
                            return home_text;
                        })([], 0, 10)}
                    </>
                    ))}
                        <>
                            <section className={`mB__150 ${styles.projectlead}`}>
                                <div className="container"> 
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Link prefetch={false} className="project_link" href={`/projects/${projects[j].slug}`}>
                                 
                                                <div className={`${styles.project__section}`} >
                                                    <div className={styles.Tilt}>
                                                        <div className="Tilt-inner">


                                                            {project_video && (
                                                                <>
                                                                    <div className={`${styles.project__leadimage}  d-none d-lg-block ${styles.video_container}`}>
                                                                        <video src={`${project_video}#t=0.02`} autoPlay playsInline loop muted></video>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {!project_video && (
                                                                <>
                                                                    <div className={` d-none d-lg-block ${styles.project__leadimage}`}>
                                                                        <Image
                                                                            
                                                                            priority={true}
                                                                            placeholder="blur"
                                                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                                                                            src={project_thumbnail}
                                                                            alt="project-lead"
                                                                            layout="fill"
                                                                            sizes="100vw" />
                                                                    </div>
                                                                </>
                                                            )}


                                                            <div className={` d-lg-none d-block ${styles.project__leadimage}`}>
                                                                <Image
                                                                    
                                                                    priority={true}
                                                                    placeholder="blur"
                                                                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                                                                    src={project_thumbnail_mobile}
                                                                    alt="project-lead"
                                                                    layout="fill"
                                                                    sizes="100vw" />
                                                            </div>

                                                        </div>
                                                        {projects[j]?.projectComponent?.awardsReceived && (
                                                            <span className={`${styles.project__tag} project__tag`}>winner</span>
                                                        )}
                                                        {projects[j]?.id == common[0] && (
                                                            <span className={`${styles.project__tag} ${styles.new_tag} project__tag`}>new</span>
                                                        )}
                                                    </div>           
                                                </div>
                                                <div className={`${styles.project__name}`}>
                                                    <span>{projects[j].title}</span>
                                                    <span className={`font__grey ${styles.project__type}`}> / {client}</span> 
                                                </div>
                                         
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {text}        
                            </section>
                        </>
                </>
          ))}
        </>
    )
}