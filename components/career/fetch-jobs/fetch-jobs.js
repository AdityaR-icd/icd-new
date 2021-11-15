import parse from 'html-react-parser';
import Image from 'next/image'
import Link from 'next/link'

export default function fetchJobs({ data }){
    var profileImage = data?.featuredImage?.node?.sourceUrl
    return(
        <>
            <div className="col-md-6 col-lg-4">
                <div className="job-cont">
                    <span className="position">
                        <Image placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="  src={profileImage} alt={data.title} layout="fill"/>
                    </span>
                    <span className="job__desc">{parse(data.content)}</span>
                    <Link href="/careers"><button className="jobApply">apply</button></Link>
                </div>
            </div>
        </>
    )
}