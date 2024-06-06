export default async (req, res) => {
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'mail@icdindia.com',
            pass: process.env.pass,
            // pass: 'zxtpndwkmgrxiysr'
            // user: 'shivani@icdindia.com',
            // pass: 'shivani123',
        },
        secure: true,
    });

    if (req.body.page) {
        var firstname = req.body.firstName,
            applyingFor = req.body.applyingFor,
            lastname = req.body.lastName,
            company = req.body.company,
            mobile = req.body.number,
            designation = req.body.designation,
            email = req.body.email,
            website = req.body.companyWebsite,
            linkedinwebsite = req.body.linkedin,
            message = req.body.message
        sendTo = req.body.sendTo;
        var Usermessage = `Dear ${firstname}, <br />
            We have received your filled-up form. Expect one of our team members to contact you in two working days, to set up a call and explore the possibility of a fit between what we do and what you're seeking. <br /><br />
            Warmly, <br />
            ICD`;

        const mailData = {
            from: 'mail@icdindia.com',
            to: sendTo,
            subject: `Enquiry about ${applyingFor.toLowerCase()} - Itu Chaudhuri Design`,
            html: `Enquired For: ${applyingFor} <br /> First Name: ${firstname} <br /> Last Name: ${lastname} <br /> Company: ${company} <br /> Mobile: ${mobile} <br /> Designation: ${designation} <br /> Email: ${email} <br /> Website: ${website} <br /> LinkedIn url: ${linkedinwebsite} <br /> Message: ${message} <br />`,
        }


        const mailContent = {
            from: 'mail@icdindia.com',
            to: email,
            subject: `Your enquiry for ${applyingFor.toLowerCase()} has been submitted - Itu Chaudhuri Design`,
            html: Usermessage
        }
        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.sendMail(mailData, function (err, info) {
                if (err)
                    console.log(err)
                else
                    res.send('success')
                    transporter.sendMail(mailContent, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log('submitted successfully');
                })
            })
        });
    } else {
        var firstname = req.body.firstName,
            applyingFor = req.body.applyingFor,
            surname = req.body.lastName,
            education = req.body.schoolName,
            underGraduateCollege = req.body.UGCollegeName,
            postGraduateCollege = req.body.PGCollegeName,
            lastOffice = req.body.lastOffice,
            experience = req.body.experience,
            mobile = req.body.number,
            city = req.body.city,
            email = req.body.email,
            website = req.body.Website,
            sendTo = req.body.sendTo;


        var content = ` Applied For: ${applyingFor} <br /> First Name: ${firstname} <br /> Surname: ${surname} <br /> School Name: ${education} <br /> Undergraduate College Name: ${underGraduateCollege} <br /> Post Graduate College Name: ${postGraduateCollege} <br /> Experience: ${experience} <br /> Last Employed At: ${lastOffice} <br /> Mobile: ${mobile} <br /> City: ${city} <br /> Email: ${email} <br /> Website: ${website} <br />`;
        var message = `Thank you for your interest. <br /><br />
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
            html: content
        }


        const mailContent = {
            from: 'mail@icdindia.com',
            to: email,
            subject: `Your job application for ${applyingFor.toLowerCase()} has been submitted - Itu Chaudhuri Design`,
            html: message
        }

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.sendMail(mailData, function (err, info) {
                if (err)
                    console.log(err)
                else
                    res.send('success')
                transporter.sendMail(mailContent, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log('submitted successfully');
                })
            })
        });
    }
    // console.log(req.body)
    res.send('success')
}