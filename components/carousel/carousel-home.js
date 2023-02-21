import styles from './carousel.module.scss'
import parse from 'html-react-parser';

export default function carousel({content}){
    return(
        <section className={`${styles.heroCarousel} mB__150`}>
            <div className={styles.homelead_thumbnail}>
            <div className={styles.lead_video_cont} >
                {parse(content)}
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