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
        </section>
    )
}