import nodemailer from 'nodemailer';

export async function sendOTPMail(email, digits): Promise<boolean> {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"Secret Friend 👻" <secret.friend@example.com>', // sender address
            to: email, // list of receivers
            subject: 'Secret Friend: Your log in code', // Subject line
            text: `Hi there,\n\nhere is your log in code:\n\n${ digits }\n\n\nGreetings!`, // plain text body
            html: `Hi there,<br><br>here is your log in code:<br><br><b>${ digits }</b><br><br><br>Greetings!`, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return true;
    } catch (e) {
        console.log(e);

        return false;
    }
}