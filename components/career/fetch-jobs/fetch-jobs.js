import parse from 'html-react-parser';
import Image from "next/image";
import Link from 'next/link'

export default function fetchJobs({ data }) {
    var profileImage = data?.featuredImage?.node?.sourceUrl

    const toBase64 = (str) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)

    const shimmer = (w, h) => `
        <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient id="g">
                <stop stop-color="#f6f6f6" offset="20%" />
                <stop stop-color="#f0f0f0" offset="50%" />
                <stop stop-color="#f6f6f6" offset="70%" />
            </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#F6F6F6" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`

    return <>
        <div className="col-md-6 col-lg-4">
            <div className="job-cont">
                <span className="position">
                    <Image
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                        src={profileImage}
                        alt={data.title}
                        layout="fill"
                         unoptimized
                        sizes="100vw" />
                </span>
                <span className="job__desc">{parse(data.content)}</span>
                {/* <Link href="#careerForm" legacyBehavior><button className="jobApply">apply</button></Link> */}
            </div>
        </div>
    </>;
}