import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { comment } from '../../lib/api'
import parse from 'html-react-parser';
import { data } from 'jquery';


export default function Contact({ postId , comment_data }) {
  const id = postId
  const comments = comment_data
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [post_id, setId] = useState(id)
  const [comment_s, setComment] = useState(comments)
  const router = useRouter()
  var date = ''


  var all_comments = comment_s.nodes


  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const data = await comment (message , post_id , name , email)

    if (data) {
      window.location.reload(false);
    }
  }

  return (
    <div className="container comment_container">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                    <div className="col-md-12">
                          <div className="form-group">
                            <textarea className='textarea' value={message} onChange={(e) => setMessage(e.target.value)} autoComplete="off" placeholder=" " style={{ border : '1px solid' , height: '155px' , margin: '6px 0 0 0' }} />
                            <label className="form-control-placeholder" htmlFor="comment" style={{ padding : '16px' }}>please type your comment here *</label>
                          </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input type="text" id="first-name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder=" " required />
                            <label className="form-control-placeholder" htmlFor="first-name">your name *</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                        <div className="form-group">
                          <input type="email" id="emailId" value={email}  onChange={(e) => setEmail(e.target.value)}  autoComplete="off" placeholder=" " className="form-control" required/>
                          <label className="form-control-placeholder" htmlFor="emailId">your email *</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="submit" style={{ float:'right' }}>post</button>
                    </div>
                </div>
                </div>
            </div>
          </form>
          <div className='comments_section'>
          {all_comments.map(node => (
            date = new Date(node.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            <>
            <div className='comments'>
              <span className="comment_date">
              {node?.author?.node.name} / {date}
              </span>
              
              {parse(node.content)}
              <div className="row">
                  <div className="col-md-12">
                      <button type="submit" style={{ width: '100px' }}>reply</button>
                  </div>
              </div>

              <div className='replies'>
                  {(
                    function (replies) {
                        const data = node.replies.nodes;
                        
                        for (let i = 0; i < (data).length; i++) {
                          
                            replies.push(
                              <>
                                <ul>
                                  <li>
                                    {parse(data[i]?.content)}
                                  </li>
                                </ul>
                              </>
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
