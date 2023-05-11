import { useEffect, useState } from 'react'
import style from './contactForm.module.scss'
import $ from 'jquery'
export default function contactForm({ dataEmail }) {
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
  const [submitted, setSubmitted] = useState(false)

  // const handleSubmit = async (evt) => {
  //   evt.preventDefault()
  //   var applyingFor = document.getElementById('applying-for').value
  //   const data = await Contact(firstName, lastName, applyingFor, email, number, linkedin, designation, company, message, companyWebsite)
  //   console.log(data)
  //   if (data) {
  //     window.location.reload(false);
  //     $('.success-message').addClass('show-message');
  //   } else {
  //     $('.error-message').addClass('show-message');
  //   }
  // }

    useEffect(() => {
        $("#width_tmp_option").html($('#applying-for option:selected').text()); 
        $('#applying-for').width($("#width_tmp_select").width());
        $('#applying-for').change(function(){
            $("#width_tmp_option").html($('#applying-for option:selected').text()); 
            $(this).width($("#width_tmp_select").width());
        });
        document.addEventListener('DOMContentLoaded', function() {
            $("#width_tmp_option").html($('#applying-for option:selected').text()); 
            $('#applying-for').width($("#width_tmp_select").width());
        }, false);
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
      linkedin,
      designation,
      company,
      message,
      companyWebsite,
      sendTo: array,
      page: "contact"
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
        setLinkedin('')
        setDesignation('')
        setCompany('');
        setcompanyWebsite('')
        setMessage('')
      } else $('.error-message').addClass('show-message');
    })
  }
  return (
    <>
      <div className={`jobForm__container custom-form contact_form `}>
        <form id="jobForm" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
          <div className="row">
            <div className="col-md-12">
              <span className="applying__for">enquire about
                <span className="font__red">
                  <select id="applying-for" value={enquiryAbout} onChange={(e) => setenquiryAbout(e.target.value)}>
                    <option data-mail={dataEmail} value="Branding">Branding</option>
                    <option data-mail={dataEmail} value="Packaging Design">Packaging Design</option>
                    <option data-mail={dataEmail} value="UX/UI Projects">UX/UI Projects</option>
                    <option data-mail={dataEmail} value="Editorial Design">Editorial Design</option>
                    <option data-mail={dataEmail} value="Website Design &amp; Development">Website Design &amp; Development</option>
                    <option data-mail={dataEmail} value="App/New Product Design">App/New Product Design</option>
                    <option data-mail={dataEmail} value="Others">Others</option>
                  </select>
                  <select id="width_tmp_select" style={{ display: 'none' }}>
                    <option id="width_tmp_option"></option>
                  </select>
                </span>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <input type='text' value={firstName} onChange={(e) => setfirstName(e.target.value)} autoComplete="off" placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" name="first_name" htmlFor="first-name">your first name *</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input type='text' value={lastName} onChange={(e) => setlastName(e.target.value)} autoComplete="off" placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" name="last_name" htmlFor="last-name">your last name *</label>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <input type='text' value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="off" placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" htmlFor="company">your company *</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input type='email' value={email} name="email" onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" htmlFor="emailId">your email *</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <input type='tel' value={number} onChange={(e) => setNumber(e.target.value)} autoComplete="off" placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" htmlFor="mobile-no">your mobile number *</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input type="text" id="designation" autoComplete="off" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder=" " className="form-control" autoComplete="off" placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" htmlFor="designation">your designation *</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <input type="text" id="website" pattern="(?:(?:https?:\/\/)?|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&/=]*)" value={companyWebsite} onChange={(e) => setcompanyWebsite(e.target.value)} autoComplete="off" placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" htmlFor="website">your company website url (like example.com) *</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input type="text" id="linkedinwebsite" pattern="(?:(?:https?:\/\/)?|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&/=]*)" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} autoComplete="off" placeholder=" " className="form-control" />
                <label className="form-control-placeholder" htmlFor="linkedinwebsite">your linkedin url</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input type="text" id="message" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} placeholder=" " className="form-control" required />
                <label className="form-control-placeholder" htmlFor="message">your message *</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="message success-message">submitted successfully.</div>
              <div className="message error-message font__red">error occurred please try again.</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button type="submit" name="submitted" >enquire</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
