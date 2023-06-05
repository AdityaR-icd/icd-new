import styles from './carousel.module.scss'
import parse from 'html-react-parser';

export default function carousel({content}){
    var videosrc = "https://player.vimeo.com/video/736122279?background=1&quality=1080p&playsinline=1";
    var mobilevideosrc = "https://player.vimeo.com/video/736122794?background=1&quality=1080p&playsinline=1";
    return(
        <section className={`${styles.heroCarousel} mB__150`}>
            <div className={styles.homelead_thumbnail}>
            <span className={styles.loading}>loading</span>
            <div className={styles.lead_video_cont} >
               {(
                   content && parse(content) || 
                    <>
                        <iframe title="ICD Home Lead Video" src={videosrc} className="d-none d-md-block" frameBorder="0" allow="autoplay" allowFullScreen="">
                        </iframe><iframe title="ICD Home Lead Video" src={mobilevideosrc} className="d-block d-md-none" frameBorder="0" allow="autoplay" allowFullScreen=""></iframe>
                    </>
               )} 
            </div>
            </div>
            <div className={`${styles.carouselShape__block} d-none d-md-block`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className={`col-md-2 ${styles.carouselBlock__1}`}></div>
                        <div className={`col-md-8 offset-md-2 ${styles.carouselBlock__2}`}>
                        </div>            
                    </div>
                </div>
            </div>
        </section>
    )
}