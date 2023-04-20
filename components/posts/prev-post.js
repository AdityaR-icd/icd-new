
import Link from 'next/link'
export default function PrevPost({ data }) {
    return (
        <>
            <div className="prev__post ">
                <div>
                    <Link href={{ pathname: `/posts/${data.slug}/` }} >
                        <div className="prevNext__post-text">previous post</div>

                        <div className="prevNext__post-img d-none d-sm-block">
                            <img loading="lazy" decoding="async" className="" src={data?.featuredImage?.node?.sourceUrl}></img>
                        </div>

                        <div className="post__title d-none d-sm-block ">{data.title}</div>
                    </Link>
                </div>

            </div>
        </>
    )
}