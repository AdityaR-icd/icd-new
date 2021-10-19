import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Contact } from '../lib/api'


export default function contact() {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [enquiryAbout, setenquiryAbout] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [designation, setDesignation] = useState('')
    const [company, setCompany] = useState('')
    const [message, setMessage] = useState('')
    const [companyWebsite, setcompanyWebsite] = useState('')

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        var applyingFor = document.getElementById('applying-for').value
        const data = await Contact(firstName, lastName, applyingFor , email, number, linkedin, designation, company, message, companyWebsite)
    
        if (data) {
          window.location.reload(false);
        }
    }

    return (
        <div className="container">
        <main className="main">
          <h1 className="title">Contact us</h1>
          <hr />

          <form onSubmit={handleSubmit}>
            <div>
              <select id="applying-for" value={enquiryAbout} onChange={(e) => setenquiryAbout(e.target.value)}>
                <option value="Branding">Branding</option>
                <option value="Packaging Design">Packaging Design</option>
                <option value="UX/UI Projects">UX/UI Projects</option>
                <option value="Editorial Design">Editorial Design</option>
                <option value="Website Design &amp; Development">Website Design &amp; Development</option>
                <option value="App/New Product Design">App/New Product Design</option>
                <option value="Others">Others</option>
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
              <label className='label'>Company</label>
              <input
                className='input'
                type='text'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
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
              <label className='label'>Your Designation</label>
              <input
                className='input'
                type='text'
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required />
            </div>
            <div>
              <label className='label'>Your Company URL</label>
              <input
                className='input'
                type='url'
                value={companyWebsite}
                onChange={(e) => setcompanyWebsite(e.target.value)}
                required />
            </div>
            <div>
              <label className='label'>Your Linkedin URL</label>
              <input
                className='input'
                type='text'
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
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
