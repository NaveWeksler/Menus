import { createTransport } from 'nodemailer';
const debug = require('debug')('menus:emailHandler');

const transporter = createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendHTML = (subject: string, html: string, to: string) => {
	const mail = {
		from: process.env.EMAIL,
		to: to,
		subject: subject,
		html: html,
	};
	transporter.sendMail(mail, (error, _) => {
		if (error) return debug('Error: %o', error);
		debug("Sent '%s' Successfully to %s", subject, to);
	});
};

export default sendHTML;
