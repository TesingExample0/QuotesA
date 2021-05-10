import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    ObjectType,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { MailActivity } from '../entities/MailActivity';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { Sub } from '../entities/Sub';
import { errorfeed } from '../utils/Error'

@ObjectType()
class ActivityRespone {
    @Field(() => [MailActivity], { nullable: true })
    mailActivity?: MailActivity[];

}

@ObjectType()
class PaginatedActivity {
    @Field(() => [MailActivity])
    PaginatedmailActivity: MailActivity[];

    @Field()
    hasMore: boolean;
}

@Resolver(MailActivity)
export class MailActivityResolver {
    //+++++++++++++++++User dataLoader+++++++++++++++++//
    @FieldResolver(() => User)
    user(@Root() mailactivity: MailActivity, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(mailactivity.creatorId);
    }

    //+++++++++++++++++Subs dataLoader+++++++++++++++++//
    @FieldResolver(() => Sub)
    subs(@Root() mailactivity: MailActivity, @Ctx() { subLoader }: MyContext) {
        return subLoader.load(mailactivity.subsid);
    }


    // //+++++++++++++++++Get SingleMailActivity+++++++++++++++++//
    // @Query(() => MailActivity, { nullable: true })
    // SingleMailActivity(@Arg('id', () => Int) id: number): Promise<MailActivity | undefined> {
    //     return MailActivity.findOne(id);
    // }




    //+++++++++++++++++Get mailActivity+++++++++++++++++//
    @Query(() => ActivityRespone)
    async mailActivity( @Ctx() { req }: MyContext): Promise<ActivityRespone> {
        try {
            const mailActivity = await getConnection().query(
                `select m.*
          from mail_activity m
          `
            );
            return { mailActivity }
        }
        catch (err) {
            errorfeed(err, "Mail Activity",req.ip)
            return err
        }
    };

    //+++++++++++++++++Get mailActivity by id+++++++++++++++++//
    @Query(() => ActivityRespone)
    async mailActivityById(@Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext): Promise<ActivityRespone> {
        try {
            const mailActivity = await getConnection().query(
                `select m.*
          from mail_activity m
          where "creatorId" = ${id}
          `
            );
            return { mailActivity }
        }
        catch (err) {
            errorfeed(err, "Mail Activity",req.ip)
            return err
        }
    };





    //+++++++++++++++++Get PaginatedActivity by id+++++++++++++++++//

    @Query(() => PaginatedActivity)
    async PaginatedmailActivitybyId(
        @Arg('id', () => Int) id: number,
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedActivity> {
        const realLimit = Math.min(50, limit);
        const reaLimitPlusOne = realLimit + 1;
        const replacements: any[] = [reaLimitPlusOne];

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }
        const PaginatedmailActivity = await getConnection().query(
            `
        select m.*
        from mail_activity m  
        where "creatorId" = ${id}      
        ${cursor ? `and m."createdAt" < $2` : ''}
        order by m."createdAt" DESC
        limit $1
        `,
            replacements,
        );

        return {
            PaginatedmailActivity: PaginatedmailActivity.slice(0, realLimit),
            hasMore: PaginatedmailActivity.length === reaLimitPlusOne,
        };
    };


    //+++++++++++++++++Get PaginatedActivity+++++++++++++++++//
    @Query(() => PaginatedActivity)
    async PaginatedmailActivity(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedActivity> {
        const realLimit = Math.min(50, limit);
        const reaLimitPlusOne = realLimit + 1;
        const replacements: any[] = [reaLimitPlusOne];

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        const PaginatedmailActivity = await getConnection().query(
            `
        select m.*
        from mail_activity m        
        ${cursor ? `where m."createdAt" < $2` : ''}
        order by m."createdAt" DESC
        limit $1
        `,
            replacements,
        );
        return {
            PaginatedmailActivity: PaginatedmailActivity.slice(0, realLimit),
            hasMore: PaginatedmailActivity.length === reaLimitPlusOne,
        };
    };



}