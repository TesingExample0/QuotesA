import { INVITE_USER_PREFIX } from '../constants';
// import { sendEmail } from '../utils/sendEmail';
import { validateSub } from '../utils/validateSub';
import { validateInviteSub } from '../utils/validateSubInvite';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { Sub } from '../entities/Sub';
import { User, UserRole } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { SubInput } from './SubInput';
import { SubInviteInput } from './SubInviteInput';
import { FieldError } from './user';
import { sendEmail } from '../utils/sendEmail';
import { errorfeed } from '../utils/Error'

@ObjectType()
class PaginatedSubs {
  @Field(() => [Sub])
  subs: Sub[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class SubsCount {
  @Field()
  ActiveCount: number;
  @Field()
  NonActiveCount: number;
}

@ObjectType()
class SubResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Sub, { nullable: true })
  sub?: Sub;
}





@Resolver(Sub)
export class SubResolver {
  @FieldResolver(() => User)
  creator(@Root() sub: Sub, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(sub.creatorId);
  }

  //+++++++++++++++++Get all Subs+++++++++++++++++//
  @Query(() => PaginatedSubs)
  async subs(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext,
  ): Promise<PaginatedSubs> {
    try {
      const realLimit = Math.min(50, limit);
      const reaLimitPlusOne = realLimit + 1;
      const userId = req.session.userId;
      const replacements: any[] = [reaLimitPlusOne];
      console.log('Usern =' + userId);

      if (cursor) {
        replacements.push(new Date(parseInt(cursor)));
      }

      const subs = await getConnection().query(
        `
    select s.*
    from sub s
    where "creatorId" = ${userId}
    ${cursor ? `and s."createdAt" < $2` : ''}
    order by s."createdAt" DESC
    limit $1
    `,
        replacements,
      );
      return {
        subs: subs.slice(0, realLimit),
        hasMore: subs.length === reaLimitPlusOne,
      };
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }

  //+++++++++++++++++Get all Sub without Pagination+++++++++++++++++//
  @Query(() => SubsCount)
  async Allsubs(
    @Ctx() { req }: MyContext,
  ): Promise<SubsCount> {
    try {
      const subs = await getConnection().query(
        `
    select s.*
    from sub s
    order by s."createdAt" DESC
    `  );
      const Active: any = []
      const NonActive: any = []
      subs.map((sub: any) => {
        console.log(sub)
        if (sub.subscribed) {
          Active.push(sub)
        }
        else {
          NonActive.push(sub)
        }
      })
      return { ActiveCount: Active.length, NonActiveCount: NonActive.length }
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }


  //+++++++++++++++++Get all Sub(id) without Pagination+++++++++++++++++//
  @Query(() => SubsCount)
  async AllsubsId(
    @Arg('Id', () => Int) Id: number,
    @Ctx() { req }: MyContext,
  ): Promise<SubsCount> {
    try {
      const subs = await getConnection().query(
        `
    select s.*
    from sub s
    where "creatorId" = ${Id}
    order by s."createdAt" DESC
    `  );
      const Active: any = []
      const NonActive: any = []
      subs.map((sub: any) => {
        console.log(sub)
        if (sub.subscribed) {
          Active.push(sub)
        }
        else {
          NonActive.push(sub)
        }
      })
      return { ActiveCount: Active.length, NonActiveCount: NonActive.length }
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }

  //+++++++++++++++++Get a  Sub+++++++++++++++++//
  @Query(() => Sub, { nullable: true })
  sub(@Arg('id', () => Int) id: number, @Ctx() { req }: MyContext): Promise<Sub | undefined> {
    try {
      return Sub.findOne(id);
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }

  //+++++++++++++++++get sub by Unsubscribed token+++++++++++++++++//
  @Query(() => Sub, { nullable: true })
  subbytoken(@Arg('token') token: string,
    @Ctx() { req }: MyContext,): Promise<Sub | undefined> {
    try {
      const sub = Sub.findOne({
        where: { unsubscribeToken: token },
      });
      return sub
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }


  //+++++++++++++++++Create Sub+++++++++++++++++//
  @Mutation(() => SubResponse)
  @UseMiddleware(isAuth)
  async createSub(
    @Arg('input') input: SubInput,
    @Ctx() { redis, req }: MyContext,
  ): Promise<SubResponse> {
    try {
      const errors = validateSub(input);
      if (errors) {
        return { errors };
      }
      const userId = req.session.userId;
      const user = await User.findOne({ id: userId });

      // console.log(user?.id)
      const subs = await getConnection().query(
        `
    select s.*
    from sub s
    where "creatorId" = ${userId}
    `,
      );
      console.log(subs.length);

      if (user?.customerType === 'free-trial') {
        const subLimit = 5;
        if (subs.length >= subLimit) {
          throw 'You have reached your maximum contacts';
        }
      }


      const firstname = input.name
      const mail = input.email
      const firstnamearray = firstname.split(',')
      const mailarray = mail.split(',')
      const sub: any = []


      for (let i = 0; i < firstnamearray.length; i++) {
        const token = v4();
        const unsubscribeToken = v4();
        const sub = await Sub.create({
          name: firstnamearray[i],
          email: mailarray[i],
          frequency: 1,
          subscribed: false,
          unsubscribeToken,
          creatorId: req.session.userId,
        }).save();

        await redis.set(
          INVITE_USER_PREFIX + token,
          sub.id,
          'ex',
          1000 * 60 * 60 * 24 * 3,
        ); // 3 days


        const greeting = !user
          ? null
          : `<p>You have been invited to join Quote Actions by ${user.name}</p>`;
        console.log('=====>>>>',
          `<a href="http://${process.env.CORS_ORIGIN}/subscribe/${token}">Accept Invite</a>`,
        );

        // await sendEmail(
        //   input.email,
        //   `${greeting}
        // <p>To accept your invite please click on the link below</p>
        // <a href="http://${process.env.CORS_ORIGIN}/subscribe/${token}">Accept Invite</a>`,
        //   `${input.name} Quate Actions Invite`,
        // );

        await sendEmail(
          mailarray[i],
          `${greeting}
      <p>To accept your invite please click on the link below</p>
      <a href="https://rich-biff.com/subscribe/${token}">Accept Invite</a>`,
          `${firstnamearray[i]} Quate Actions Invite`,
          sub.id,
          "Subscriber Invite",
          req.session.userId
        );
        return { sub };
        // https://rich-biff.com/
      }

      return sub
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }

  }

  //+++++++++++++++++create Sub from added mail+++++++++++++++++//
  @Mutation(() => SubResponse)
  async createSubFromContact(
    @Arg('token') token: string,
    @Arg('emails') emails: string,
    @Ctx() { redis, req }: MyContext,
  ): Promise<SubResponse> {
    try {
      const subs = await Sub.findOne({
        where: { unsubscribeToken: token }
      });
      if (!subs) {
        return {
          errors: [
            {
              field: 'token',
              message:
                "I'm sorry, your there was a problem with your token. Please double check your url and try again",
            },
          ],
        };
      }
      const id = subs!.creatorId;
      const user = await User.findOne({ id: id });
      const email = emails.split(",");
      let newmails: any = []
      email.forEach((emails: any) => {
        if (emails.includes("@")) {
          newmails.push(emails)
        }
      })
      // const tokens = v4();
      // const unsubscribeToken = v4();
      const sub: any = []

      newmails.forEach(async (mail: any) => {
        const tokens = v4();
        const unsubscribeToken = v4();
        // console.log('===<<<<', mail)
        let name = mail.split("@")
        const sub = await Sub.create({
          name: name[0],
          email: mail,
          frequency: 1,
          subscribed: false,
          unsubscribeToken,
          creatorId: id,
        }).save();

        await redis.set(
          INVITE_USER_PREFIX + tokens,
          sub.id,
          'ex',
          1000 * 60 * 60 * 24 * 3,
        ); // 3 days


        const greeting = !user
          ? null
          : `<p>You have been invited to join Quote Actions by ${user.name}</p>`;
        console.log('=====>>>>',
          `<a href="http://${process.env.CORS_ORIGIN}/subscribe/${tokens}">Accept Invite</a>`,
        );



        await sendEmail(
          mail,
          `${greeting}
        <p>To accept your invite please click on the link below</p>
        <a href="https://rich-biff.com/subscribe/${tokens}">Accept Invite</a>`,
          `${name[0]} Quate Actions Invite`,
          sub.id,
          "Subscriber Invite",
          req.session.userId
        );
        return { sub };
        // https://rich-biff.com/
      })
      return sub

    } catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }

  //+++++++++++++++++Create Sub from Invite+++++++++++++++++//
  @Mutation(() => SubResponse)
  async createSubFromInvite(
    @Arg('input') input: SubInviteInput,
    @Ctx() { req }: MyContext,
  ): Promise<SubResponse> {
    try {
      const errors = validateInviteSub(input);
      if (errors) {
        return { errors };
      }

      const user = await User.findOne({
        where: { inviteLink: input.token },
      });

      if (!user) {
        return {
          errors: [
            {
              field: 'token',
              message:
                'The token is either expired or the user no longer exists.',
            },
          ],
        };
      }

      const unsubscribeToken = v4();
      const sub = await Sub.create({
        name: input.name,
        email: input.email,
        subscribed: true,
        frequency: input.frequency,
        unsubscribeToken,
        creatorId: req.session.userId,
      }).save();

      return { sub };
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }

  //+++++++++++++++++Accept Inivte+++++++++++++++++//
  @Mutation(() => SubResponse)
  async acceptInvite(
    @Arg('token') token: string,
    @Arg('subscribed') subscribed: boolean,
    @Arg('frequency') frequency: number,

    @Ctx() { redis, req }: MyContext,
  ): Promise<SubResponse | null> {
    try {
      const key = INVITE_USER_PREFIX + token;
      const subId = await redis.get(key);

      if (!subId) {
        return {
          errors: [
            {
              field: 'token',
              message: 'token expired',
            },
          ],
        };
      }

      const id = parseInt(subId);
      const unsubscribeToken = v4();
      const result = await getConnection()
        .createQueryBuilder()
        .update(Sub)
        .set({ subscribed, unsubscribeToken, frequency })
        // .where('id = :id and "creatorId" = :creatorId', {
        .where('id = :id', {
          id,
          creatorId: req.session.userId,
        })
        .returning('*')
        .execute();

      // const inviteLink = v4();
      // const user = await getConnection()
      //   .createQueryBuilder()
      //   .insert()
      //   .into(User)
      //   .values({
      //     email: result.raw[0].email,
      //     password: 'hashedPassword',
      //     inviteLink,
      //     role: UserRole.Subsciber,
      //   })
      //   .returning('*')
      //   .execute();
      // req.session.userId = user.raw[0].id;


      await redis.del(key);
      return { sub: result.raw[0] }
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }

  }



  //+++++++++++++++++Update Sub+++++++++++++++++//
  @Mutation(() => SubResponse)
  @UseMiddleware(isAuth)
  async updateSub(
    @Arg('id', () => Int) id: number,
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('subscribed') subscribed: boolean,

    @Ctx() { req }: MyContext,
  ): Promise<SubResponse> {
    try {
      const sub = await Sub.findOne({ where: { id } });
      if (sub!.creatorId !== req.session.userId) {
        throw new Error('not authorized');
      }
      const input = { name, email }
      const errors = validateSub(input);
      if (errors) {
        return { errors };
      }

      const result = await getConnection()
        .createQueryBuilder()
        .update(Sub)
        .set({ subscribed, name, email })
        .where('id = :id and "creatorId" = :creatorId', {
          id,
          creatorId: req.session.userId,
        })
        .returning('*')
        .execute();

      // return result.raw[0];
      return { sub: result.raw[0] };
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }

  //+++++++++++++++++change frequency and email of Sub+++++++++++++++++//
  @Mutation(() => SubResponse)
  async updateMailandFrequency(
    @Arg('token') token: string,
    @Arg('frequency') frequency: number,
    @Arg('email') email: string,
    @Ctx() { req }: MyContext,
  ): Promise<SubResponse | null> {
    try {
      const sub = await Sub.findOne({
        where: { unsubscribeToken: token }
      });
      if (!sub) {
        return {
          errors: [
            {
              field: 'token',
              message:
                "I'm sorry, your there was a problem with your token. Please double check your url and try again",
            },
          ],
        };
      }
      const id = sub!.id;
      const result = await getConnection()
        .createQueryBuilder()
        .update(Sub)
        .set({ email, frequency })
        .where('id = :id ', {
          id,
        })
        .returning('*')
        .execute();

      return { sub: result.raw[0] };

    } catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }


  //+++++++++++++++++Create Sub from frwd page+++++++++++++++++//
  @Mutation(() => SubResponse)
  async createSubsfrwdpage(
    @Arg('token') token: string,
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('frequency') frequency: number,
    @Ctx() { req }: MyContext,
  ): Promise<SubResponse | null> {
    try {
      const subs = await Sub.findOne({
        where: { unsubscribeToken: token }
      });
      const input = { email: email, name: name }
      const errors = validateSub(input);
      if (errors) {
        return { errors };
      }
      if (!subs) {
        return {
          errors: [
            {
              field: 'token',
              message:
                "I'm sorry, your there was a problem with your token. Please double check your url and try again",
            },
          ],
        };
      }
      const findSub = await Sub.findOne({
        where: { email: email }
      });
      if (findSub)
        return {
          errors: [
            {
              field: 'email',
              message:
                "email alredy exists",
            },
          ],
        };
      // console.log(findSub)
      const creatorId = subs!.creatorId;
      const unsubscribeToken = v4();
      const sub = await Sub.create({
        name: name,
        email: email,
        subscribed: true,
        frequency: frequency,
        unsubscribeToken,
        creatorId: creatorId,
      }).save();

      return { sub };

    } catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }



  //+++++++++++++++++Unsubscribe Sub+++++++++++++++++//
  @Mutation(() => SubResponse)
  async unsubscribeSub(
    @Arg('token') token: string,
    @Ctx() { req }: MyContext,
  ): Promise<SubResponse | null> {
    try {
      const sub = await Sub.findOne({
        where: { unsubscribeToken: token },
      });
      if (!sub) {
        return {
          errors: [
            {
              field: 'token',
              message:
                "I'm sorry, your there was a problem with your token. Please double check your url and try again",
            },
          ],
        };
      }

      const id = sub!.id;
      const result = await getConnection()
        .createQueryBuilder()
        .update(Sub)
        .set({ subscribed: false })
        // .where('id = :id and "creatorId" = :creatorId', {
        //   id,
        //   creatorId: req.session.userId,
        // })
        .where('id = :id ', {
          id,
        })
        .returning('*')
        .execute();

      return { sub: result.raw[0] };
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }

  //+++++++++++++++++Delete Sub+++++++++++++++++//
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteSub(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    try {
      await Sub.delete({ id, creatorId: req.session.userId });
      return true;
    }
    catch (err) {
      errorfeed(err, "Subscriber", req.ip)
      return err
    }
  }
}
