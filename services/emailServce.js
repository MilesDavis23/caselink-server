const nodemailer = require('nodemailer');

//creating transporter object:
let transporter = nodemailer.createTransport({
    service: 'iCloud',
    auth: {
        user: 'klobusitzky@mail.com',
        pass: 'cwni-ihuo-zmnz-ruab'
    }
});


/* Create function for specific email details: */
function sendResetPasswordEmail(recipentemail, resetLink) {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from: 'klobusitzky@icloud.com',
            to: recipentemail,
            subject: 'Password Reset Link',
            text: `Click on this link to reset your password: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ', error);
                reject(error); // Reject the promise if there's an error
            } else {
                console.log('Email has been sent successfully: ', info.response);
                resolve(info.response); // Resolve the promise if the email is sent successfully
            }
        });
    });
};

module.exports = {
    sendResetPasswordEmail
}


//creating transporter object:

//set up sneding the e-mail:
/*
let mailOptions = {
    from: 'cas3link@gmail.com',
    to: 'recipentemail@gmail.com',
    subject: 'Password Reset Link',
    text: 'Click on this link to...'
};

//sending the email:

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email: ', error)
    } else {
        console.log('Email has been sent successfully: ', info.response)
    }
});

*/