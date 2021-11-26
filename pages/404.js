import Link from 'next/link'
import Head from "next/head";
import Anim from '../assets/images/404/404.gif'
import style from '../styles/404.module.scss'
import $ from 'jquery'
export default function error404() {

const searchToggle = () => {
    $('body').toggleClass('showSearch');
    if($('body').hasClass('showSearch')){
        $('.searchInput').focus();
    }
}
  return (
      
    <>
    <Head>
      <title>404 | Itu Chaudhuri Design</title>
    </Head>
    <div className="container">  
        <div className={style.error_404}>
            <span><img loading="lazy" decoding="async" className={style.error404_anim} src = { Anim.src } alt=""/></span>
            <span className={style.not_found}>Oops! The page couldn’t be found</span>
            <span className={style.error_subtext}>Looking for something specific? Try using <span className={style.error_search} onClick={ searchToggle }>Search</span> or go to <Link href="/">Home</Link></span>
        </div>
    </div>
    </>
  )
}