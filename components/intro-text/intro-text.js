
import intro from './intro.module.scss'
import style from '../project/category.module.scss'
import parse from 'html-react-parser';



export default function IntroText(description) {
  return (
    <>
        <section className={style.categoryIntro__cont}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className={`${intro.textContent} `}>
                                <p>
                                    {/* {parse(description?.description)} */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </>
  )
}