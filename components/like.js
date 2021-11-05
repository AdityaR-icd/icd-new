
import { useState } from 'react'
import { useRouter } from 'next/router'
import { updatePostLikes ,  updateProjectLikes } from '../lib/api'
import Image from 'next/image'


import liked from '../assets/images/like-btn/like.svg';
import likesFilled from '../assets/images/like-btn/like-filled.svg';


export default function Like(count) {
    const like_count = count.count;
    const [likes , setLikes] = useState(like_count)
    const [post_id, setId] = useState(count.id)
    const [likes_increment , setIncrement] = useState('')
    const [Type , setType] = useState(count.type)
    


    const handleLike = async (evt) => {
        evt.preventDefault()
        setLikes(likes + 1)

       if(Type === 'post'){
            const data = await updatePostLikes(post_id , ( likes + 1 ) )
       }else{
            const data = await updateProjectLikes(post_id , ( likes + 1 ) )
       }

      }

    return (
        <>
            <span className="like-btn icon liked" onClick={ handleLike } >
                <div className="like-icon">
                    <Image loading="lazy" decoding="async" src={ liked.src } className="icon-img icon-outline" />
                    <Image loading="lazy" decoding="async" src={ likesFilled.src } className="icon-img like-filled" />
                </div>
                {likes} likes
            </span>
        </>
    )
}
