import nodemailer from "nodemailer";
import {MailAdapter, SendMailData} from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "76044897cdd94c",
        pass: "4408b1a39bf997"
    }
});

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Eduardo Dutra <edutdutra@gmail.com>',
            subject,
            html: body
        });
    };
}
