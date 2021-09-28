import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { careerContact } from '../../lib/api'


export default function Enquiry() {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [enquiryAbout, setenquiryAbout] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [city, setcity] = useState('')
    const [qualification, setQualification] = useState('')
    const [message, setMessage] = useState('')
    const [Website, setWebsite] = useState('')

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const data = await careerContact(firstName, lastName, enquiryAbout, email, number, city, qualification, message, Website)
    
        if (data) {
          window.location.reload(false);
        }
    }

    return (
        <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Contact us</h1>
          <hr />

          <form onSubmit={handleSubmit}>
            <div>
            <select id="applying-for" value={enquiryAbout} onChange={(e) => setenquiryAbout(e.target.value)}>
                <option value="senior designer">senior designer</option>
                <option value="frontend developer">frontend developer</option>
                <option value="senior ui ux designer">senior ui ux designer</option>
                <option value="business manager">business manager</option>
                <option value="Motion Graphic Designer">Motion Graphic Designer</option>
            </select>
            </div>
            <div>
              <label className='label'>Your first name</label>
              <input
                className='input'
                type='text'
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required />
            </div>
            <div>
              <label className='label'>Your last name</label>
              <input
                className='input'
                type='text'
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
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
              <label className='label'>Your Number</label>
              <input
                className='input'
                type='tel'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required />
            </div>
            <div>
              <label className='label'>Your Qualification</label>
              <input
                className='input'
                type='text'
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required />
            </div>
            <div>
              <label className='label'>Your city</label>
              <input
                className='input'
                type='text'
                value={city}
                onChange={(e) => setcity(e.target.value)}
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
  </div>
    )
}
