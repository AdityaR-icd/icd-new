import styles from './project.module.scss'
import style from '../home/home.module.scss'
import intro from './intro.module.scss'
import parse from 'html-react-parser';
import Link from 'next/link'
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';


export default function projectLead({ edges }) {
    let client = ""
    let project_video = ""
    let project_thumbnail = ""
    let project_thumbnail_mobile = ""
    let i = 0
    let j = 0
    let text = ""
    const projects = edges[0].node.projects.highlightedProjects
    const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 761px)' });
    const isTabletV = useMediaQuery({ query: '(min-width: 768px) and (max-width: 991px)' });
    const isTabletH = useMediaQuery({ query: '(min-width: 992px) and (max-width: 1365px)' });


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

    return <>
        {projects.map(({ highlightedImage, clients }, j) => (
            // console.log(j),
            project_video = highlightedImage?.video?.mediaItemUrl,
            project_thumbnail = highlightedImage?.highlightedThumbnail?.sourceUrl,
            project_thumbnail_mobile = highlightedImage?.highlightedThumbnailMobile?.sourceUrl,
            client = clients?.edges[0]?.node?.name,
            <>
                {edges.map(({ node }, i) => (
                    <>
                        {(

                            function (home_text) {
                                if (j % 2 !== 0 && j > 0) {
                                    text = (
                                        <div className={`${style.textContainer} container`} key={i}>
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
                                } else {
                                    text = '';
                                }
                                return home_text;
                            })([], 0, 10)}
                    </>
                ))}

                <>
                    <section className={`mB__150 ${styles.projectlead}`} key={projects[j].id}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <Link href={`/projects/${projects[j].slug}`} className="project_link">

                                        <div className={`${styles.project__section}`} >
                                            <div className={styles.Tilt}>
                                                <div className="Tilt-inner">

                                                    {isDesktop && (
                                                        <>
                                                            {project_video && (
                                                                <>
                                                                    <div className={`${styles.project__leadimage} ${styles.video_container}`}>
                                                                        <video src={project_video} autoPlay playsInline loop muted></video>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {!project_video && (
                                                                <>
                                                                    <div className={`${styles.project__leadimage}`}>
                                                                        <Image
                                                                            priority={true}
                                                                            placeholder="blur"
                                                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                                            src={project_thumbnail}
                                                                            alt="project-lead"
                                                                            fill
                                                                            sizes="100vw" />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                    {isTabletH && (
                                                        <>
                                                            {project_video && (
                                                                <>
                                                                    <div className={`${styles.project__leadimage} ${styles.video_container}`}>
                                                                        <video src={project_video} autoPlay playsInline loop muted></video>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {!project_video && (
                                                                <>
                                                                    <div className={`${styles.project__leadimage}`}>
                                                                        <Image
                                                                            priority={true}
                                                                            placeholder="blur"
                                                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                                            src={project_thumbnail}
                                                                            alt="project-lead"
                                                                            fill
                                                                            sizes="100vw" />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                    {isMobile && (
                                                        <>
                                                            <div className={`${styles.project__leadimage}`}>
                                                                <Image
                                                                    priority={true}
                                                                    placeholder="blur"
                                                                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                                    src={project_thumbnail_mobile}
                                                                    alt="project-lead"
                                                                    fill
                                                                    sizes="100vw" />
                                                            </div>
                                                        </>
                                                    )}
                                                    {isTabletV && (
                                                        <>
                                                            <div className={`${styles.project__leadimage}`}>
                                                                <Image
                                                                    priority={true}
                                                                    placeholder="blur"
                                                                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                                    src={project_thumbnail_mobile}
                                                                    alt="project-lead"
                                                                    fill
                                                                    sizes="100vw" />
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

                                    </Link>
                                </div>
                            </div>
                        </div>
                        {text}
                    </section>
                </>
            </>
        ))}
    </>;
}