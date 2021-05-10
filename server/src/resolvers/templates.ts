import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from 'type-graphql';
import { Templates } from '../entities/Templates';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { FieldError } from './user';
import { User } from '../entities/User';
import { validateTemplate } from '../utils/validateTemplates'
import { errorfeed } from '../utils/Error'


@InputType()
export class templateInput {
    @Field()
    body: string;
    @Field()
    subject: string;
    @Field()
    title: string
}

@ObjectType()
class PaginatedTemplates {
    @Field(() => [Templates])
    templates: Templates[];
    @Field()
    hasMore: boolean;
}

@ObjectType()
class TemplateRespones {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Templates, { nullable: true })
    template?: Templates;
}



@Resolver(Templates)
export class TemplatesResolver {

    //+++++++++++++++++getsingletemplates++++++++++++++++++++++++//
    @Query(() => Templates, { nullable: true })
    temp(@Arg('id', () => Int) id: number): Promise<Templates | undefined> {
        return Templates.findOne(id);
    }

    //************************add templates************************//
    @Mutation(() => TemplateRespones)
    @UseMiddleware(isAuth)
    async createTemplates(
        @Arg('input') input: templateInput,
        @Ctx() { req }: MyContext,
    ): Promise<TemplateRespones> {
        try {
            const errors = validateTemplate(input);
            if (errors) {
                return { errors };
            }
            const template = await Templates.create({
                body: input.body,
                subject: input.subject,
                title: input.title,
                creatorId: req.session.userId,
                Active: false
            }).save();

            return { template };
        }
        catch (err) {
            errorfeed(err, "templates",req.ip)
            return err
        }
    }

    //************************Update template***********************//
    @Mutation(() => TemplateRespones)
    @UseMiddleware(isAuth)
    async updateTemplates(
        @Arg('id', () => Int) id: number,
        @Arg('title') title: string,
        @Arg('body') body: string,
        @Arg('subject') subject: string,
        @Arg('Active') Active: boolean,
        @Ctx() { req }: MyContext,
    ): Promise<TemplateRespones> {
        try {
            const input = { body, subject, title }
            const errors = validateTemplate(input);
            if (errors) {
                return { errors };
            }

            const result = await getConnection()
                .createQueryBuilder()
                .update(Templates)
                .set({ body, Active, subject })
                // .where('id = :id and "creatorId" = :creatorId ', {
                //     id,
                //     creatorId: req.session.userId,
                // })
                .where('id = :id', {
                    id,
                })
                .returning('*')
                .execute();

            // const activeTemp = await getConnection()
            //     .createQueryBuilder()
            //     .update(Templates)
            //     .set({ 'Active': false })
            //     .where('id != :id ', {
            //         id,
            //     })
            //     .returning('*')
            //     .execute();

            return { template: result.raw[0] };
        }
        catch (err) {
            errorfeed(err, "templates",req.ip)
            return err
        }
    }



    //************************getAlltemplates***********************//
    @Query(() => PaginatedTemplates)
    async getAlltemplates(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
        @Ctx() { req }: MyContext,
    ): Promise<PaginatedTemplates> {
        try {
            const realLimit = Math.min(50, limit);
            const reaLimitPlusOne = realLimit + 1;
            const userId = req.session.userId;
            const replacements: any[] = [reaLimitPlusOne];

            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const templates = await getConnection().query(
                `
      select t.*
      from templates t
      where "creatorId" = ${userId} or "creatorId" = 0
      ${cursor ? `and t."createdAt" < $2` : ''}
      order by t."createdAt" DESC
      limit $1
      `,
                replacements,
            );

            return {
                templates: templates.slice(0, realLimit),
                hasMore: templates.length === reaLimitPlusOne,
            };
        }
        catch (err) {
            errorfeed(err, "templates",req.ip)
            return err
        }
    }

    //************************delete Templates***********************//
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteTemplate(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        try {
            if (id === 1) {
                return false
            }
            await Templates.delete({ id });
            return true;
        }
        catch (err) {
            errorfeed(err, "templates",req.ip)
            return err
        }
    }

}