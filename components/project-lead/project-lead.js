import styles from './project.module.scss'
import style from '../home/home.module.scss'
import intro from './intro.module.scss'
import parse from 'html-react-parser';
import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive';




export default function projectLead({ edges   }){
    let client = ""
    let project_video = ""
    let project_thumbnail = ""
    let i = 0
    let j = 0
    let text = ""
    const projects = edges[0].node.projects.highlightedProjects
    const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 761px)' });
    return(
        <>
        {projects.map(({ highlightedImage , clients } , j ) => (
            // console.log(j),
            project_video = highlightedImage.video.mediaItemUrl,
            project_thumbnail = highlightedImage.highlightedThumbnailMobile.sourceUrl,
            client = clients.edges[0].node.name,
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
                                                        {parse(node.featuredtext[i]?.content)}
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
                                            <Link href={`/projects/${projects[j].slug}`}>
                                            <a className="project_link">
                                                <div className={`${styles.project__section}`} >
                                                    <div className={styles.Tilt}>
                                                        <div className="Tilt-inner">
                                                            
                                                            {isDesktop && (
                                                                <>
                                                                    <div className={`${styles.project__leadimage} ${styles.video_container}`}>
                                                                        <video src={project_video} autoPlay playsInline loop muted></video>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {isMobile && (
                                                                <>
                                                                    <div className={`${styles.project__leadimage} d-lg-none d-block`}>
                                                                        <Image placeholder="blur" blurDataURL={project_thumbnail} src={project_thumbnail} alt="project-lead" height="473" width="632" layout="fill" />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>   
                                                        
                                                </div>
                                                <div className={`${styles.project__name}`}>
                                                    <span>{projects[j].title}</span>
                                                    <span className={`font__grey ${styles.project__type}`}> / {client}</span> 
                                                </div>
                                            </a>
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