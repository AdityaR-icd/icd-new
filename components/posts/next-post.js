import Link from 'next/link'
export default function next_post({ data }) {
    return (
        <>
            <div className="next__post">
                <div>
                    <Link href={{ pathname: `/posts/${data.slug}/` }} >
                        <div className="prevNext__post-text">next post</div>
                        <div className="prevNext__post-img d-none d-sm-block ">
                            <img loading="lazy" decoding="async" className="" src={data?.featuredImage?.node?.sourceUrl}></img>
                        </div>
                        <div className="post__title d-none d-sm-block">{data.title}</div>
                    </Link>
                </div>
            </div>
        </>
    )
}