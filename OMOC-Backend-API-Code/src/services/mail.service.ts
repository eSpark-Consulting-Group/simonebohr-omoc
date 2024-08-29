import { SendMailOptions, createTransport } from 'nodemailer';
import { CUSTOMER_BASE_URL, SELLER_BASE_URL, MAILER_CONFIG } from '../config';
import { logger } from '../utils';
import { forgotPassword } from '../templates';

const transporter = createTransport({
  service: MAILER_CONFIG.service,
  auth: {
    user: MAILER_CONFIG.email,
    pass: MAILER_CONFIG.password,
  },
});

class MailService {
  private sendMail(mailDetails: SendMailOptions) {
    try {
      return transporter.sendMail(mailDetails);
    } catch (err) {
      logger.error(err);
    }
  }

  forgotPassword(userData: any) {
    const role = userData?.role;
    if (role) {
    }
    const template = forgotPassword({ name: userData?.name, otp: userData?.otp });

    const mailDetails = {
      from: MAILER_CONFIG.from,
      to: userData?.email,
      subject: 'Forgot Password',
      html: template,
    };
    return this.sendMail(mailDetails);
  }
}

export const mailService = new MailService();
