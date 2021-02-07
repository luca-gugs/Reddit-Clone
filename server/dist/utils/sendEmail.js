'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require('nodemailer');
function sendEmail(to, html) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('EMAIL: ', process.env.NODEMAILER_EMAIL);
        let transporter = nodemailer.createTransport({
            name: 'example.com',
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: `${process.env.NODEMAILER_EMAIL}`,
                pass: `${process.env.NODEMAILER_PASSWORD}`,
            },
        });
        let info = yield transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to,
            subject: 'Hello ✔',
            html,
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Info: ', info);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map