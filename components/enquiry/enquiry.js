import Head from 'next/head'
import { useState } from 'react'
import { careerContact } from '../../lib/api'


export default function Enquiry() {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [enquiryAbout, setenquiryAbout] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [city, setcity] = useState('')
    const [qualification, setQualification] = useState('')
    const [experience, setexperience] = useState('')
    const [Website, setWebsite] = useState('')

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        var applyingFor = document.getElementById('applying-for').value
        const data = await careerContact(applyingFor , firstName, lastName, qualification ,experience, number, city ,email , Website)
    
        if (data) {
          window.location.reload(false);
        }
    }

    return (
      <>
        <div className="jobForm__container custom-form">
            <form id="jobForm" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-12">
                        <span className="applying__for">you are applying for 
                            <span className="font__red">
                                <select id="applying-for" value={enquiryAbout} onChange={(e) => setenquiryAbout(e.target.value)}>
                                  <option value="senior designer">senior designer</option>
                                  <option value="frontend developer">frontend developer</option>
                                  <option value="senior ui ux designer">senior ui ux designer</option>
                                  <option value="business manager">business manager</option>
                                  <option value="Motion Graphic Designer">Motion Graphic Designer</option>
                                </select>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" id="first-name" autoComplete="off" value={firstName} onChange={(e) => setfirstName(e.target.value)} className="form-control" placeholder=" " required />
                            <label className="form-control-placeholder" htmlFor="first-name">your first name *</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" id="last-name" className="form-control" value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder=" " autoComplete="off" required />
                            <label className="form-control-placeholder" htmlFor="last-name">your surname *</label>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" id="qualification" className="form-control" placeholder=" " autoComplete="off" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
                            <label className="form-control-placeholder" htmlFor="qualification">your educational qualification *</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" name="experience" id="experience" className="form-control" placeholder=" " autoComplete="off" value={experience} onChange={(e) => setexperience(e.target.value)} required />
                            <label className="form-control-placeholder" htmlFor="experience">your years of experience *</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="tel" className="form-control" value={number} onChange={(e) => setNumber(e.target.value)} placeholder=" " minLength="10" maxLength="10" id="mobile-no" autoComplete="off" required />
                            <label className="form-control-placeholder" htmlFor="mobile-no">your mobile number *</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" id="city" autoComplete="off" value={city} onChange={(e) => setcity(e.target.value)} placeholder=" " className="form-control" required />
                            <label className="form-control-placeholder" htmlFor="city">your current city *</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="email" id="emailId" value={email}  onChange={(e) => setEmail(e.target.value)}  autoComplete="off" placeholder=" " className="form-control" required/>
                            <label className="form-control-placeholder" htmlFor="emailId">your email id *</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" id="website" value={Website} onChange={(e) => setWebsite(e.target.value)} pattern="(?:(?:https?:\/\/)?|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&/=]*)" autoComplete="off" placeholder=" " className="form-control"/>
                            <label className="form-control-placeholder" htmlFor="website">your website/behance/linkedin url (like example.com)</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="message success-message">your application has been submitted successfully.</div>
                        <div className="message error-message font__red">error occurred please try again.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="submit">send application</button>
                    </div>
                </div>
            </form>
        </div>
      </>
    )
}
