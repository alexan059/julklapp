import config from '#config'
import nodemailer from 'nodemailer';

export async function sendOTPMail(email, digits): Promise<boolean> {
    let transporter;

    if (config.EMAIL_DEBUG) {
        console.log(digits);

        return true;
    }

    if (config.ENVIRONMENT !== 'production') {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
    } else {
        transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    try {
        await transporter.verify();

        const info = await transporter.sendMail({
            from: '"Julklapp 🎁" <julklapp@xmas.yumon.io>', // sender address
            to: email, // list of receivers
            subject: 'Julklapp: Your log in code', // Subject line
            text: `Hi there,\n\nhere is your log in code:\n\n${ digits }\n\n\nGreetings!`, // plain text body
            html: `Hi there,<br><br>here is your log in code:<br><br><b>${ digits }</b><br><br><br>Greetings!`, // html body
        });

        if (config.ENVIRONMENT !== 'production') {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }

        return true;
    } catch (e) {
        console.log(e);

        return false;
    }
}