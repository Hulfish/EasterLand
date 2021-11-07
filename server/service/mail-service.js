const nodemailer = require("nodemailer")

class MailService {
    constructor() {
        this.transporeter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMPT_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
        })
    }

    async sendActivationMail (to, link) {
        try {
            await this.transporeter.sendMail({
            from: `Stepyandex.com <${process.env.SMTP_USER}>`,
            to,
            subject: "Активация аккаунта" + process.env.API_URL,
            text: '',
            html: `
            <div>
                <h1>Для активации аккаута перейдите по ссылке</h1>
                <a href ='${link}' > ${link}</a>
            </div>`
        })
        } catch (e) {
            console.log(e)
        }
        
    }
}

module.exports = new MailService()