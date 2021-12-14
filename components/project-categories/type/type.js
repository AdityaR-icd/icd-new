import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import carousel from '../all/all.module.scss'
import type from './type.module.scss'
// import Shimmer from "react-shimmer-effect";
import { useState , useEffect } from "react";
import { getLatestProject } from '../../../lib/api'


export default function projectTypes({ nodes }){
    var data = ''
    var slug = ''
    var title = ''
    var leadImgSrc = ''
    var client = ''
    var clientsName = ''
    var heading = ''

    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState('')
    useEffect(() => {

        async function fetchMyAPI() {
            const latestProject = await getLatestProject()
            setProjects(latestProject)
        }
    
        fetchMyAPI()
        
    },[]);

    var tag = 'false'
    var id = []
    var project_id = []

    if(projects.edges){
        projects.edges.map(({ node }) => {
            id.push(node.id)
        })

        nodes.map(({ projects }) => {
            projects.edges.map(({ node }) => {
                project_id.push(node.id)
            })
        })
    }

    for(var i = 0; i < id.length; i++){
        if(id[i] === project_id[i]){
            tag = 'true'
        }
    }

    // setTimeout(() => {
    //     setIsLoading(false);
    // }, 10000);

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
        
    return(
        <>
        {nodes.map(({ projects } , i , types)  => (      

            <section className= {`${type.industry__filter} ${type.projectType__filter}`} >
                <div className={` container ${type.container}`}>
                    <div className="row">
                        <div className="col-12">
                            <span className={type.project__category}>{types[i].name}</span>
                            <a className={`${type.see_all} see-all`} href={`/projects/category/${types[i].slug}`}>see all</a>
                        </div>
                    </div>
    
                    <div className={type.project__scroll}>
                        <div className={`row ${type.project__row}`}>
                        {projects.edges.map(({ node }) => (
                            slug = node?.slug,
                            title = node?.title,
                            leadImgSrc = node.featuredImage.node.sourceUrl,
                            client = node?.clients.edges,
                            clientsName = client[0]?.node.name,
                            heading = node.projectComponent.heading,  
                                    
                                <>
                                    <div className={ `col-md-4 ${type.project__item}` }>
                                        <div className={`${carousel.projectCarousel} ${type.projectCarousel}`}>
                                            <div className={carousel.thumbnail_cont}>
                                                <a href={`/projects/${slug}`}>
                                                    <span className={`${carousel.projectThumbnail} fade-in`} style={{ "width": "100%" }}>
                                                        <div className={`${carousel.full_thumb} full-thumb`}>
                                                            <Image priority={true} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} className={carousel.project_lead} src={leadImgSrc} alt="project-lead" layout="fill" />
                                                        </div>
                                                        <span className="thumbnail-gif"></span>
                                                    </span>
                                                    {node?.awards?.awardsReceived !== null  &&  (
                                                        <span className={`${carousel.project__tag} project__tag`}>winner</span>
                                                    )}
                                                    
                                                    {tag == 'true' &&  !node?.awards?.awardsReceived && (
                                                        <span className={`${carousel.project__tag} ${carousel.new_tag} project__tag`}>new</span>
                                                    )}
                                                </a>
                                            </div>
                                            <a href={`/projects/${slug}`}>
                                                <span className={carousel.projectTitle}>
                                                    {heading}
                                                    <span className={` ${carousel.grey__color}`}>  / {clientsName}</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>  
                                </> 
                                )).slice(0,3)}
                        </div>
                    </div>
                </div>
            </section>
        ))}
        </>
    )
}
