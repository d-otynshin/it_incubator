import nodemailer from 'nodemailer';
import { SETTINGS } from '../settings';

export const nodemailerService = {
  async sendEmail(email: string, code: string, template: (code: string) => string): Promise<boolean> {
    console.log({
      user: SETTINGS.EMAIL_USER,
      pass: SETTINGS.EMAIL_PASSWORD,
    });

    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SETTINGS.EMAIL_USER,
        pass: SETTINGS.EMAIL_PASSWORD,
      },
    });

    let info = await transport.sendMail({
      from: '"Sender" <no-reply>',
      to: email,
      subject: 'Auth',
      html: template(code),
    });

    return Boolean(info);
  }
}
