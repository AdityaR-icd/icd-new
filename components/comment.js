import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { comment } from '../lib/api'
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import styles from '../styles/Home.module.css'


export default function Contact({ postId , comment_data }) {
  const id = postId
  const comments = comment_data
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [post_id, setId] = useState(id)
  const [comment_s, setComment] = useState(comments)
  const router = useRouter()


  var all_comments = comment_s.nodes


  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const data = await comment (message , post_id , name , email)

    if (data) {
      window.location.reload(false);
    }
  }

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Leave a comment</h1>
          <hr />

          <form onSubmit={handleSubmit}>
            <div>
              <label className='label'>Your name</label>
              <input
                className='input'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div>
              <label className='label'>Your email</label>
              <input
                className='input'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div>
              <label className='label'>Your message</label>
              <textarea
                className='textarea'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button>Send</button>
          </form>
        </main>
    <div className='all_comments'>
      {all_comments.map(node => (
        <>
        <div className='comments'>
          {parse(node.content)}
          <div className='replies'>
              {(
                function (replies) {
                    const data = node.replies.nodes;
                    
                    for (let i = 0; i < (data).length; i++) {
                        replies.push(
                          <ul>
                            <li>
                              {parse(data[i]?.content)}
                            </li>
                          </ul>
                          )
                    }
                    return replies;
                  }
                )([], 0, 10)}
            </div>
          </div>
        </>
      ))}
    </div>
  </div>

  )
}


// export default Contact
