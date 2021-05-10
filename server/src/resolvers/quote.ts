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
import { getConnection } from 'typeorm';
import { Quote } from '../entities/Quote';
import { User, Profession } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { FieldError } from './user';
import { validateQuote } from '../utils/validateQuote';
import { errorfeed } from '../utils/Error'

@ObjectType()
class PaginatedQuotes {
  @Field(() => [Quote])
  quotes: Quote[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
class QuoteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Quote, { nullable: true })
  quote?: Quote;
}

@InputType()
export class QuoteInput {
  @Field()
  name: string;
  @Field()
  catagory: string;
}

@Resolver(Quote)
export class QuoteResolver {
  @FieldResolver(() => User)
  user(@Root() quote: Quote, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(quote.creatorId);
  }

  //+++++++++++++++++Get all Quotes+++++++++++++++++//
  @Query(() => PaginatedQuotes)
  async quotes(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext,
  ): Promise<PaginatedQuotes> {
    try {
      const realLimit = Math.min(50, limit);
      const reaLimitPlusOne = realLimit + 1;
      const userId = req.session.userId;
      const replacements: any[] = [reaLimitPlusOne];

      if (cursor) {
        replacements.push(new Date(parseInt(cursor)));
      }
      const quotes = await getConnection().query(
        `
    select q.*
    from quote q
    where "creatorId" = ${userId}
    ${cursor ? `and q."createdAt" < $2` : ''}
    order by q."createdAt" DESC
    limit $1
    `,
        replacements,
      );

      return {
        quotes: quotes.slice(0, realLimit),
        hasMore: quotes.length === reaLimitPlusOne,
      };
    }
    catch (err) {
      errorfeed(err, "Qutes",req.ip)
      return err
    }
  }

  //+++++++++++++++++Get Quote+++++++++++++++++//
  @Query(() => Quote, { nullable: true })
  quote(@Arg('id', () => Int) id: number, @Ctx() { req }: MyContext): Promise<Quote | undefined> {
    try {
      return Quote.findOne(id);
    }
    catch (err) {
      errorfeed(err, "Qutes",req.ip)
      return err
    }
  }

  //+++++++++++++++++Create Quote+++++++++++++++++//
  @Mutation(() => QuoteResponse)
  @UseMiddleware(isAuth)
  async createQuote(
    @Arg('input') input: QuoteInput,
    @Ctx() { req }: MyContext,
  ): Promise<QuoteResponse> {
    try {
      const errors = validateQuote(input);
      if (errors) {
        return { errors };
      }

      const quote = await Quote.create({
        name: input.name,
        catagory: input.catagory as any,
        creatorId: req.session.userId,
      }).save();
      return { quote };
    }
    catch (err) { errorfeed(err, "Qutes",req.ip); return err }
  }

  //+++++++++++++++++Update Quote+++++++++++++++++//
  @Mutation(() => QuoteResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async updateQuote(
    @Arg('id', () => Int) id: number,
    @Arg('name') name: string,
    @Arg('catagory') catagory: Profession,
    @Ctx() { req }: MyContext,
  ): Promise<QuoteResponse> {
    // if (quote!.creatorId !== req.session.userId) {
    //   throw new Error('not authorized');
    // }
    try {
      const input = { name, catagory }
      const errors = validateQuote(input);
      if (errors) {
        return { errors };
      }

      const result = await getConnection()
        .createQueryBuilder()
        .update(Quote)
        .set({ name, catagory })
        .where('id = :id and "creatorId" = :creatorId', {
          id,
          creatorId: req.session.userId,
        })
        .returning('*')
        .execute();

      return { quote: result.raw[0] };
    }
    catch (err) { errorfeed(err, "Qutes",req.ip); return err }
  }

  //+++++++++++++++++Delete Quote+++++++++++++++++//
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteQuote(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    try {
      await Quote.delete({ id, creatorId: req.session.userId });
      return true;
    }
    catch (err) { errorfeed(err, "Qutes",req.ip); return err }
  }
}
