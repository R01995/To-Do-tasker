const nodemailer = require("nodemailer");

//create transporter use SMTP
const SendEmailUtility = async ( EmailTo, EmailSubject, EmailText ) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rayr89311@gmail.com",
          pass: "ybvc gllv rxyk qeuv",
        }, 
      });
      //the Email masage 
      let mailOptions = {
        from: '"To-Do-Tasker" <rayr89311@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
      };
  //send Email
      return await transporter.sendMail(mailOptions);

}

module.exports = SendEmailUtility;