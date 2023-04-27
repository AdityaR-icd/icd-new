
import Link from 'next/link'
export default function PrevPost({ data }) {
    return (
        <>
            <div className="prev__post ">
                <div>
                    <Link href={{ pathname: `/posts/${data.slug}/` }} >
                        <div className="prevNext__post-text">
                            <span className='pevious-left_arrow d-md-none'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                    <line y1="-0.5" x2="16.4706" y2="-0.5" transform="matrix(-1 0 0 1 17.4707 8.41162)" stroke="#EC1D24" />
                                    <path d="M6.76465 1L0.999943 8L6.76465 15" stroke="#EC1D24" />
                                </svg>
                            </span>
                            prev post
                        </div>
                        <div className="post__title">{data.title}</div>
                        <button className='d-none d-sm-block'>read post</button>
                    </Link>
                </div>

            </div>
        </>
    )
}