import Head from "next/head";
import Anim from '../assets/images/404/404.gif'
import style from '../styles/404.module.scss'
export default () => (
  <>
    <Head>
      <title>You are offline</title>
    </Head>
    <div className="container">
      <div className={style.error_404}>
        <span><img priority alt='icd-icon' decoding="async" className={style.error404_anim} src={Anim.src}  /></span>
        <span className={style.not_found}>Oops! You are offline</span>
      </div>
    </div>
  </>
);