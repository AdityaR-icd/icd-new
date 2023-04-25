
import Link from 'next/link'
export default function PrevPost({ data }) {
    return (
        <>
            <div className="prev__post ">
                <div>
                    <Link href={{ pathname: `/posts/${data.slug}/` }} >
                        <div className="prevNext__post-text">previous post</div>
                        <div className="post__title">{data.title}</div>
                        <button className='d-none d-sm-block'>read post</button>
                    </Link>
                </div>

            </div>
        </>
    )
}