
import { useState } from 'react'
import { updatePostLikes, updateProjectLikes, updatekabirLikes } from '../lib/api'


import liked from '../assets/images/like-btn/like.svg';
import likesFilled from '../assets/images/like-btn/like-filled.svg';


export default function Like(count) {
    const like_count = count.count;
    const [likes, setLikes] = useState(like_count)
    const [post_id, setId] = useState(count.id)
    const [likes_increment, setIncrement] = useState('')
    const [Type, setType] = useState(count.type)



    const handleLike = async (evt) => {
        evt.preventDefault()
        setLikes(likes + 1)

        if (Type === 'post') {
            const data = await updatePostLikes(post_id, (likes + 1))
        } else if (Type == 'kabir') {
            const data = await updatekabirLikes(post_id, (likes + 1))
        }
        else {
            const data = await updateProjectLikes(post_id, (likes + 1))
        }

    }

    return (
        <>
            <span className="like-btn icon liked" onClick={handleLike} >
                <div className="like-icon">
                    <img alt='icd-icon' decoding="async" src={liked.src} width="20" height="20" className="icon-img icon-outline" />
                    <img alt='icd-icon' decoding="async" src={likesFilled.src} width="20" height="20" className="icon-img like-filled" />
                </div>
                {likes} likes
            </span>
        </>
    )
}
