import Link from 'next/link'
export default function next_post({ data }) {
    return (
        <>
            <div className="next__post">
                <div>
                    <Link href={{ pathname: `/posts/${data.slug}/` }} >
                        <div className="prevNext__post-text">next post</div>
                        <div className="post__title ">{data.title}</div>
                        <button className='d-none d-sm-block'>read post</button>
                    </Link>
                </div>
            </div>
        </>
    )
}