import styles from './project.module.scss'
import style from '../home/home.module.scss'
import intro from './intro.module.scss'
import parse from 'html-react-parser';
import Link from 'next/link'

export default function projectLead({ edges , data }){
    let client = ""
    let project_video = ""
    let i = 0
    let j = 0
    let text = ""
    return(
        <>
        {edges.map(({ node }) => (
            project_video = node.highlightedImage.video.mediaItemUrl,
            client = node.clients.edges[0]?.node.name,
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
                                                  {parse(data.homePage.featuredText[i]?.content)}
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
                          j = j + 1;
                        return home_text;
                    })([], 0, 10)}
                <section className={`mB__150 ${styles.projectlead}`}  id={node.id}>
                    <div className="container"> 
                        <div className="row">
                            <div className="col-md-12">
                                <Link href={`/projects/${node.slug}`}>
                                  <a className="project_link">
                                      <div className={`${styles.project__section}`} >
                                          <div className={styles.Tilt}>
                                              <div className="Tilt-inner">
                                                  <div className={`${styles.project__leadimage} ${styles.video_container}  d-none d-lg-block`}>
                                                    <video src={project_video} autoPlay playsInline loop muted></video>
                                                  </div>
                                              </div>
                                          </div>   
                                              
                                      </div>
                                      <div className={`${styles.project__name}`}>
                                          <span>{node.title}</span>
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
          ))}
        </>
    )
}