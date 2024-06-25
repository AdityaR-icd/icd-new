import Head from 'next/head'
import { useState } from 'react'
import $ from 'jquery'

export default function Enquiry({ position }) {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [enquiryAbout, setenquiryAbout] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [city, setcity] = useState('')
    const [schoolName, setQualification] = useState('')
    const [UGCollegeName, setUGCollegeName] = useState('')
    const [PGCollegeName, setPGCollegeName] = useState('')
    const [lastOffice, setlastOffice] = useState('')
    const [experience, setexperience] = useState('')
    const [Website, setWebsite] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const options = position.map((data, index) => {
        if (index == 0) {
            return (
                <option value={data[0]} data-mail={data[1]} selected>{data[0]}</option>
            );
        } else {
            return (
                <option value={data[0]} data-mail={data[1]} >{data[0]}</option>
            );
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending')
        var applyingFor = document.getElementById('applying-for').value
        var sendTo = $('#applying-for').find(':selected').data('mail');
        $('button').addClass('disable');
        var array = sendTo.split(',');
        let data = {
            firstName,
            lastName,
            applyingFor,
            email,
            number,
            city,
            schoolName,
            UGCollegeName,
            PGCollegeName,
            lastOffice,
            experience,
            Website,
            sendTo: array,
        }

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {

            console.log('Response received')
            if (res.status === 200) {
                $('.success-message').addClass('show-message');
                $('button').removeClass('disable');
                console.log('Response succeeded!')
                setSubmitted(true)
                setenquiryAbout('')
                setfirstName('')
                setlastName('')
                setEmail('')
                setNumber('')
                setcity('')
                setQualification('')
                setUGCollegeName('')
                setPGCollegeName('')
                setlastOffice('')
                setexperience('');
                setWebsite('')
            } else $('.error-message').addClass('show-message');
        })
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
                                        {options}
                                    </select>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="first-name" autoComplete="off" value={firstName} onChange={(e) => setfirstName(e.target.value)} className="form-control" placeholder=" " required />
                                <label className="form-control-placeholder" htmlFor="first-name">your first name *</label>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="last-name" className="form-control" value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder=" " autoComplete="off" required />
                                <label className="form-control-placeholder" htmlFor="last-name">your surname *</label>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="school-name" className="form-control" placeholder=" " autoComplete="off" value={schoolName} onChange={(e) => setQualification(e.target.value)} required />
                                <label className="form-control-placeholder" htmlFor="school-name">your school name and location *</label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="UGCollegeName" className="form-control" placeholder=" " autoComplete="off" value={UGCollegeName} onChange={(e) => setUGCollegeName(e.target.value)} required />
                                <label className="form-control-placeholder" htmlFor="UGCollegeName">your undergraduate college name and location *</label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="PGCollegeName" className="form-control" placeholder=" " autoComplete="off" value={PGCollegeName} onChange={(e) => setPGCollegeName(e.target.value)} required />
                                <label className="form-control-placeholder" htmlFor="PGCollegeName">your post graduate college name and location *</label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="lastOffice" className="form-control" placeholder=" " autoComplete="off" value={lastOffice} onChange={(e) => setlastOffice(e.target.value)} required />
                                <label className="form-control-placeholder" htmlFor="lastOffice">your previous organization *</label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" name="experience" id="experience" className="form-control" placeholder=" " autoComplete="off" value={experience} onChange={(e) => setexperience(e.target.value)} required />
                                <label className="form-control-placeholder" htmlFor="experience">your years of experience *</label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="tel" className="form-control" value={number} onChange={(e) => setNumber(e.target.value)} placeholder=" " minLength="10" maxLength="10" id="mobile-no" autoComplete="off" required />
                                <label className="form-control-placeholder" htmlFor="mobile-no">your mobile number *</label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="city" autoComplete="off" value={city} onChange={(e) => setcity(e.target.value)} placeholder=" " className="form-control" required />
                                <label className="form-control-placeholder" htmlFor="city">your current city *</label>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="email" id="emailId" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder=" " className="form-control" required />
                                <label className="form-control-placeholder" htmlFor="emailId">your email id *</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input type="text" id="website" value={Website} onChange={(e) => setWebsite(e.target.value)} pattern="(?:(?:https?:\/\/)?|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&/=]*)" autoComplete="off" placeholder=" " className="form-control" required />
                                <label className="form-control-placeholder" htmlFor="website">your website/behance/linkedin url (like example.com)*</label>
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
