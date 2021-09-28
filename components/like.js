import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { updatePostLikes } from '../lib/api'
import { updateProjectLikes } from '../lib/api'



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
        <div>
            <span className='likeBtn' onClick={ handleLike } >Likes : {likes}</span>
        </div>
        </>
    )
}
