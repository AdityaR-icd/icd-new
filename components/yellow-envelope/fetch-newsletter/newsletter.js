import style from '../../posts/posts.module.scss'
import parse from 'html-react-parser';
import Link from 'next/link'
import { useEffect } from 'react'

export default function fetchNewsletter({ data }) {
    var date = new Date(data.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });


    var htmlString = data?.content;

    if (htmlString) {
        var stripedHtml = htmlString?.replace(/<[^>]+>/g, ' ');
        var content = stripedHtml?.substr(0, 500);
    } else {
        content = "...."
    }


    return (
        <div className="col-md-4 col-lg- grid-item">
            <div className={`${style.postsItems} animateItems}`}>
                <Link href={`/yellow-envelope/${data.slug}`}>
                    <h2 className={style.postTitle}>{data.title}</h2>
                    <span className={style.postBy}> {date}  </span>
                    <div className={style.postInfo}> <p> {parse(content)} </p> </div>
                </Link>
                <div className="row">
                    <div className="col-6">
                        <Link href={`/yellow-envelope/${data.slug}`} legacyBehavior>
                            <button>read letter</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    return {
        props: {

        },
        // revalidate: 1,
    }
}