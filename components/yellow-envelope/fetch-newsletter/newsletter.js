import style from '../../posts/posts.module.scss'
import parse from 'html-react-parser';
import Link from 'next/link'

export default function fetchNewsletter({data}) {
    var date = new Date(data.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="col-md-4 col-lg- grid-item">
            <div className={`${style.postsItems} animateItems}`}>
                <a href={`/yellow-envelope/${data.slug}`}>
                    <h2 className={style.postTitle}>{data.title}</h2>
                    <span className={style.postBy}> {date}  </span>
                    <div className={style.postInfo}> {parse(data.content)} </div>
                </a>
                <div className="row">
                    <div className="col-6">
                        <Link href={`/yellow-envelope/${data.slug}`}>
                            <button>read letter</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}