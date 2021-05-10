import { getConnection } from 'typeorm';
import { sendQuotesEmail } from './sendEmail'
import { templates } from './templates'
import { errorfeed } from './Error'


export const ScheduledMail = async () => {
    const d = new Date();
    const seconds = d.getSeconds();
    const day = d.getDay();
    try {
        const subs = await getConnection().query(
            `  select s.*
           from sub s
           order by s."createdAt" DESC `
        );
        const quotes = await getConnection().query(
            `  select q.*
           from quote q
           order by q."createdAt" DESC `
        );

        if (subs) {
            if (day === 1) {
                try {
                    subs.forEach(async (item: any) => {
                        const Creator = await getConnection().query(
                            ` select u.* 
                  from public.user u
                  where id=${item.creatorId}
                  order by u."createdAt" DESC `
                        );
                        const template: any = await getConnection().query(
                            `  select t.*
                       from templates t
                       order by t."createdAt" DESC `
                        );

                        let Template: any
                        let Subject: any
                        if (template.length !== 0) {
                            template.forEach(async (templates: any) => {
                                if (templates.Active) {
                                    Template = templates.body
                                    Subject = templates.subject
                                }
                            })
                        }
                        if (item.subscribed) {
                            if (item.frequency === 1 || item.frequency === 3) {
                                let defaultValue = Creator[0].DefaultTemplates
                                let quotesList: any = []
                                quotes.forEach(async (quote: any) => {
                                    if (Creator[0].catagory === quote.catagory) {
                                        quotesList.push(quote)
                                    }
                                })
                                const random = Math.floor(Math.random() * quotesList.length);
                                let Quote = quotesList[random]
                                const Author = await getConnection().query(
                                    ` select u.* 
                                        from public.user u
                                         where id=${Quote.creatorId}
                                         order by u."createdAt" DESC `
                                );
                                if (Template !== undefined) {

                                    let Obj: any = {
                                        '#SubscriberName#': item.name,
                                        '#Quotes#': Quote.name,
                                        '#UserName#': Creator[0].name,
                                        '#UsersEmail#': Creator[0].email,
                                        '#UnsubscribeLink#': `<a href="${process.env.CORS_ORIGIN}/unsubscribe/${item.unsubscribeToken}">Unsubscribe</a>`
                                    }
                                    Template = Template.replace(/#SubscriberName#|#Quotes#|#UserName#|#UsersEmail#|#UnsubscribeLink#/gi, function (matched: any) {
                                        return Obj[matched];
                                    });
                                    Subject = Subject.replace(/#SubscriberName#|#Quotes#|#UserName#|#UsersEmail#|#UnsubscribeLink#/gi, function (matched: any) {
                                        return Obj[matched];
                                    });
                                }

                                await sendQuotesEmail(
                                    item.email,
                                    defaultValue || Template === undefined ? templates(Quote.name,
                                        item.unsubscribeToken,
                                        item.name,
                                        Creator[0].name,
                                        Creator[0].title,
                                        Creator[0].address,
                                        Creator[0].email,
                                        Creator[0].website) : Template,
                                    defaultValue || Template === undefined ? `${item.name} Quotes` : Subject,
                                    item.creatorId,
                                    item.id,
                                    Quote.name,
                                    Author[0].name
                                );
                            }
                        }
                    })
                }
                catch (err) {
                    errorfeed(err, "Mail Scheduler", 'system ip')
                    return err
                }
            }

            if (day === 3 || day === 5) {
                try {
                    subs.forEach(async (item: any) => {
                        const Creator = await getConnection().query(
                            ` select u.* 
                  from public.user u
                  where id=${item.creatorId}
                  order by u."createdAt" DESC `
                        );
                        const template = await getConnection().query(
                            `  select t.*
                       from templates t
                       order by t."createdAt" DESC `
                        );
                        let Template: any
                        let Subject: any
                        if (template.length !== 0) {
                            template.forEach(async (templates: any) => {
                                if (templates.Active) {

                                    Template = templates.body
                                    Subject = templates.subject
                                }
                            })
                        }
                        if (item.subscribed) {
                            if (item.frequency === 3) {
                                let defaultValue = Creator[0].DefaultTemplates
                                let quotesList: any = []
                                quotes.forEach(async (quote: any) => {
                                    if (Creator[0].catagory === quote.catagory) {
                                        quotesList.push(quote)
                                    }
                                })
                                const random = Math.floor(Math.random() * quotesList.length);
                                let Quote = quotesList[random]
                                const Author = await getConnection().query(
                                    ` select u.* 
                                        from public.user u
                                         where id=${Quote.creatorId}
                                         order by u."createdAt" DESC `
                                );
                                if (Template !== undefined) {
                                    let Obj: any = {
                                        '#SubscriberName#': item.name,
                                        '#Quotes#': Quote.name,
                                        '#UserName#': Creator[0].name,
                                        '#UsersEmail#': Creator[0].email,
                                        '#UnsubscribeLink#': `<a href="${process.env.CORS_ORIGIN}/unsubscribe/${item.unsubscribeToken}">Unsubscribe</a>`
                                    }
                                    Template = Template.replace(/#SubscriberName#|#Quotes#|#UserName#|#UsersEmail#|#UnsubscribeLink#/gi, function (matched: any) {
                                        return Obj[matched];
                                    });
                                    Subject = Subject.replace(/#SubscriberName#|#Quotes#|#UserName#|#UsersEmail#|#UnsubscribeLink#/gi, function (matched: any) {
                                        return Obj[matched];
                                    });
                                }
                                await sendQuotesEmail(
                                    item.email,
                                    defaultValue || Template === undefined ? templates(Quote.name, item.unsubscribeToken, item.name,
                                        Creator[0].name,
                                        Creator[0].title,
                                        Creator[0].address,
                                        Creator[0].email,
                                        Creator[0].website) : Template,
                                    defaultValue || Template === undefined ? `${item.name} Quotes` : Subject,
                                    item.creatorId,
                                    item.id,
                                    Quote.name,
                                    Author[0].name
                                );
                            }
                        }
                    })
                }
                catch (err) {
                    errorfeed(err, "Mail Scheduler", 'system ip')
                    return err
                }
            }

            if (day <= 5 && day >= 0) {
                try {
                    subs.forEach(async (item: any) => {
                        const Creator = await getConnection().query(
                            ` select u.* 
                  from public.user u
                  where id=${item.creatorId}
                  order by u."createdAt" DESC `
                        );

                        const template = await getConnection().query(
                            `  select t.*
                       from templates t
                       order by t."createdAt" DESC `
                        );
                        let Template: any
                        let Subject: any
                        if (template.length !== 0) {
                            template.forEach(async (templates: any) => {
                                if (templates.Active) {
                                    Template = templates.body
                                    Subject = templates.subject
                                }
                            })
                        }

                        if (item.subscribed) {
                            if (item.frequency === 5) {

                                let defaultValue = Creator[0].DefaultTemplates
                                let quotesList: any = []
                                quotes.forEach(async (quote: any) => {
                                    if (Creator[0].catagory === quote.catagory) {
                                        quotesList.push(quote)
                                    }
                                })

                                const random = Math.floor(Math.random() * quotesList.length);
                                let Quote = quotesList[random]

                                const Author = await getConnection().query(
                                    ` select u.* 
                                        from public.user u
                                         where id=${Quote.creatorId}
                                         order by u."createdAt" DESC `
                                );
                                if (Template !== undefined) {
                                    let Obj: any = {
                                        '#SubscriberName#': item.name,
                                        '#Quotes#': Quote.name,
                                        '#UserName#': Creator[0].name,
                                        '#UsersEmail#': Creator[0].email,
                                        '#UnsubscribeLink#': `<a href="${process.env.CORS_ORIGIN}/unsubscribe/${item.unsubscribeToken}">Unsubscribe</a>`
                                    }
                                    // Template = Template!.replace(/#SubscriberName#/i, item.name)/
                                    Template = Template.replace(/#SubscriberName#|#Quotes#|#UserName#|#UsersEmail#|#UnsubscribeLink#/gi, function (matched: any) {
                                        return Obj[matched];
                                    });
                                    Subject = Subject.replace(/#SubscriberName#|#Quotes#|#UserName#|#UsersEmail#|#UnsubscribeLink#/gi, function (matched: any) {
                                        return Obj[matched];
                                    });
                                }


                                await sendQuotesEmail(
                                    item.email,
                                    defaultValue || Template === undefined ? templates(Quote.name, item.unsubscribeToken, item.name,
                                        Creator[0].name,
                                        Creator[0].title,
                                        Creator[0].address,
                                        Creator[0].email,
                                        Creator[0].website) : Template,
                                    defaultValue || Template === undefined ? `${item.name} Quotes` : Subject,
                                    item.creatorId,
                                    item.id,
                                    Quote.name,
                                    Author[0].name
                                );
                            }
                        }
                    })
                }
                catch (err) {
                    errorfeed(err, "Mail Scheduler", 'system ip')
                    return err
                }
            }

        }
    }
    catch (err) {
        errorfeed(err, "Mail Scheduler", 'system ip')
        return err
    }

}