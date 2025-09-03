import Link from 'next/link'
export default function next_post({ data }) {
    return (
        <>
            <div className="next__post">
                <div>
                    <Link href={{ pathname: `/posts/${data.slug}/` }} >
                        <div className="prevNext__post-text">next post
                            <span className='next-post_arrow d-md-none'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none"><line y1="7.91162" x2="16.4706" y2="7.91162" stroke="#EC1D24" />
                                    <path d="M10.7061 1L16.4708 8L10.7061 15" stroke="#EC1D24" />
                                </svg></span></div>
                        <div className="post__title ">{data.title}</div>
                        <button className='d-none d-sm-block'>read post</button>
                    </Link>
                </div>
            </div>
        </>
    )
}