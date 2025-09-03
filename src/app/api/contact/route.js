import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'mail@icdindia.com',
      pass: process.env.pass,
    },
    secure: true,
  });

  if (body.page) {
    const { firstName, applyingFor, lastName, company, number, designation, email, companyWebsite, linkedin, message, sendTo } = body;
    const Usermessage = `Dear ${firstName}, <br />
        We have received your filled-up form. Expect one of our team members to contact you in two working days, to set up a call and explore the possibility of a fit between what we do and what you're seeking. <br /><br />
        Warmly, <br />
        ICD`;

    const mailData = {
      from: 'mail@icdindia.com',
      to: sendTo,
      subject: `Enquiry about ${applyingFor.toLowerCase()} - Itu Chaudhuri Design`,
      html: `Enquired For: ${applyingFor} <br /> First Name: ${firstName} <br /> Last Name: ${lastName} <br /> Company: ${company} <br /> Mobile: ${number} <br /> Designation: ${designation} <br /> Email: ${email} <br /> Website: ${companyWebsite} <br /> LinkedIn url: ${linkedin} <br /> Message: ${message} <br />`,
    };

    const mailContent = {
      from: 'mail@icdindia.com',
      to: email,
      subject: `Your enquiry for ${applyingFor.toLowerCase()} has been submitted - Itu Chaudhuri Design`,
      html: Usermessage,
    };

    try {
      await transporter.sendMail(mailData);
      await transporter.sendMail(mailContent);
      return NextResponse.json({ status: 'success' });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
  } else {
    const { firstName, applyingFor, lastName, schoolName, UGCollegeName, PGCollegeName, lastOffice, experience, number, city, email, Website, sendTo } = body;
    const content = ` Applied For: ${applyingFor} <br /> First Name: ${firstName} <br /> Surname: ${lastName} <br /> School Name: ${schoolName} <br /> Undergraduate College Name: ${UGCollegeName} <br /> Post Graduate College Name: ${PGCollegeName} <br /> Experience: ${experience} <br /> Last Employed At: ${lastOffice} <br /> Mobile: ${number} <br /> City: ${city} <br /> Email: ${email} <br /> Website: ${Website} <br />`;
    const message = `Thank you for your interest. <br /><br />
    We take about two weeks to write back, if we see a fit—unfortunately, we’re not able to write back when we don’t (we’re a small office).
    Typically, we do a preliminary selection based on your work, and the next rounds are in—person interviews with team lead and partners.
    <br />
    <br />
    Warmly,
    <br />
    Team ICD`;

    const mailData = {
      from: 'mail@icdindia.com',
      to: sendTo,
      subject: `Careers - Itu Chaudhuri Design`,
      html: content,
    };

    const mailContent = {
      from: 'mail@icdindia.com',
      to: email,
      subject: `Your job application for ${applyingFor.toLowerCase()} has been submitted - Itu Chaudhuri Design`,
      html: message,
    };

    try {
      await transporter.sendMail(mailData);
      await transporter.sendMail(mailContent);
      return NextResponse.json({ status: 'success' });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
  }
}
