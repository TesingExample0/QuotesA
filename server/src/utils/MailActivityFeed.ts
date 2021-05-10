var http = require("https");
import { MailActivity } from '../entities/MailActivity'
import { getConnection } from 'typeorm';
import { errorfeed } from './Error'

export const mailActivityFeed = async () => {

    try {
        var options = {
            "method": "GET",
            "hostname": "api.sendgrid.com",
            "port": null,
            // api_key_id:"pJtY61T72BlTRLC7eUil5USnyGVKECsDTwVVUitqZAs",
            "path": "/v3/messages?limit=9000000",
            // status:"delivered",
            "headers": {
                "authorization": `Bearer ${process.env.SENDGRID_API_KEY}`
            }
        };

        var req = http.request(options, (res: any) => {
            var chunks: any = [];

            res.on("data", function (chunk: any) {
                chunks.push(chunk);
            });

            res.on("end", async () => {
                var body = Buffer.concat(chunks);
                const msg = JSON.parse(body.toString()).messages
                if (msg) {
                    msg.forEach(async (item: any) => {
                        let msg = item.msg_id
                        let xmsgid = msg.split(".")[0]
                        const query = getConnection()
                            .getRepository(MailActivity)
                            .createQueryBuilder('mail_activity')
                            .where('mail_activity.xmsgid = :xmsgid', { xmsgid });
                        let activity_feed = await query.getOne();
                        if (activity_feed) {
                            const result = await getConnection()
                                .createQueryBuilder()
                                .update(MailActivity)
                                .set({
                                    From_Email: item.from_email,
                                    To_Email: item.to_email,
                                    subject: item.subject,
                                    Status: item.status,
                                    msgid: item.msg_id,
                                    open_count: item.opens_count,
                                    clicks_count: item.clicks_count
                                })
                                .where('mail_activity.xmsgid = :xmsgid', { xmsgid })
                                .returning('*')
                                .execute();
                        }
                    })
                }
            });
        });

        req.write("{}");
        req.end();
    }
    catch (err) {
        errorfeed(err, "MailActivity_Feed", 'system ip')
        return err
    }

}
