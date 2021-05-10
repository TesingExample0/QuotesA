// import nodemailer from 'nodemailer';
import { MailActivity } from '../entities/MailActivity'
import { getConnection } from 'typeorm';
import { errorfeed } from './Error'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// async..await is not allowed in global scope, must use a wrapper

//+++++++++++++++++Send quotes mail+++++++++++++++++//
export async function sendQuotesEmail(to: string, html: string, subject: string, creatorId: number, subsId: number, Quote: string, author: string) {
  const msg = {
    to,
    from: 'justinmcintosh7897@gmail.com',
    subject,
    html,
  };
  sgMail
    .send(msg)
    .then((res: any) => {
      // console.log('Email sent', author);
      let arr: any = Object.values(res[0])
      let msgId: any = Object.values(arr[2])

      const query = getConnection()
        .getRepository(MailActivity)
        .createQueryBuilder('mail_activity')
        .where('mail_activity.msgid = :msg', { msg });

      MailActivity.create({
        xmsgid: msgId[4],
        creatorId: creatorId,
        subsid: subsId,
        body: Quote,
        type: "Quote",
        Author: author
      }).save();
    })
    .catch((error: any) => {
      console.error(error);
      console.log(error.response.body);
      errorfeed(error, "send Mail", 'system ip')
    });
}

//+++++++++++++++++send invites mail+++++++++++++++++//
export async function sendEmail(to: string, html: string, subject: string, id: number, type: string, creatorId: number) {
  const msg = {
    to,
    from: 'justinmcintosh7897@gmail.com',
    subject,
    html,
  };
  sgMail
    .send(msg)
    .then((res: any) => {
      console.log('Email sent', msg);
      let arr: any = Object.values(res[0])
      let msgId: any = Object.values(arr[2])

      const query = getConnection()
        .getRepository(MailActivity)
        .createQueryBuilder('mail_activity')
        .where('mail_activity.msgid = :msg', { msg });

      MailActivity.create({
        xmsgid: msgId[4],
        creatorId: creatorId,
        subsid: id,
        type: type
      }).save();
    })
    .catch((error: any) => {
      console.error(error);
      console.log(error.response.body);
      errorfeed(error, "send Mail", 'system ip')
    });
}

