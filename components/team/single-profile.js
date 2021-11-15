import parse from 'html-react-parser';
import Image from 'next/image'

import Ourteam from './our-team.module.scss'

export  default function singleProfile({data}) {
    var position = data?.positions.edges[0].node.name;
    var profileImage = data?.profileImage?.profileImage?.sourceUrl;
    var profileImageOnHover = data?.profileImage?.profileImageOnHover?.sourceUrl;
    return(
        <>
         <div className="col-md-6 col-lg-4">
            <div className={Ourteam.profile}>
                <div className={` ${Ourteam.profileImg} fade-in `} >
                    <Image placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" className={` ${Ourteam.profileImg__main} full-lead-img` } src={profileImage} alt={data.title} layout="fill"/>
                    <Image placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" className={` ${Ourteam.profileImg__hover} full-lead-img` } src={profileImageOnHover} alt={data.title} layout="fill"/>
                </div>
                <div className="team-info">
                    <span className={Ourteam.name}>{data.title}</span>
                    <span className={Ourteam.designation}>{position}</span>
                    <span className={Ourteam.about}>{parse(data.content)}</span>
                </div>
            </div>
        </div>
        </>
    )
}