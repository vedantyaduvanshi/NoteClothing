const nodemailer = require("nodemailer")

const createMailTransporter = ()=> {

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'note-clothing@outlook.com',
          pass: process.env.MAILP,
        },
      });

      return transporter;

}


module.exports = {createMailTransporter}

