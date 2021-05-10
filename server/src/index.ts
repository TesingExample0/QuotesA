import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import path from 'path';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { v4 } from 'uuid';
import { COOKIE_NAME, __prod__ } from './constants';
import { Message } from './entities/Message';
import { Quote } from './entities/Quote';
import { Sub } from './entities/Sub';
import { MailActivity } from './entities/MailActivity'
import { User, UserRole } from './entities/User';
import { Templates } from './entities/Templates'
import { ErrorMessages } from './entities/errrorlogs'
import { QuoteResolver } from './resolvers/quote';
import { SubResolver } from './resolvers/sub';
import { UserResolver } from './resolvers/user';
import { TemplatesResolver } from './resolvers/templates'
import { createUserLoader } from './utils/createUserLoader';
import { createSubLoader } from './utils/createSubsLoader'
import cookieParser from 'cookie-parser';
import { ScheduledMail } from './utils/ScheduledMail'
let cron = require('node-cron');
import { mailActivityFeed } from './utils/MailActivityFeed'
import { MailActivityResolver } from './resolvers/MailActivity'


const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    // database: 'nexus',
    // username: 'postgres',
    // password: 'postgres',
    logging: true,
    synchronize: true,
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Quote, Sub, User, Message, Templates, MailActivity, ErrorMessages],
  });
  // await conn.runMigrations();
  // await Sub.delete({});
  // await User.delete({}); 


  // Mail job 
  var SendEmail = cron.schedule('12 12 * * 1-5', () => {                    // works Mon to fri on 12:12
    // var SendEmail = cron.schedule('* * * * * *', () => {                      // works every second
    // var SendEmail = cron.schedule('*/5 * * * *', () => {                      // works every 5th minute
    ScheduledMail()
  }, {
    scheduled: true,
  });
  SendEmail.start()
  // ScheduledMail()


  let MailActivityData = cron.schedule('0 */3 * * *', () => {                          // works after every 3 hrs
    //  var MailActivityData = cron.schedule('* * * * * *', () => {                     // works every second
    mailActivityFeed()
  }, {
    scheduled: true,
  });
  MailActivityData.start()




  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        secure: false,
        httpOnly: false,
        sameSite: 'lax', // csrf   
        // secure: __prod__, // cookie only works in https   
        // domain: __prod__ ? '.rich-biff.com' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    }),
  );

  app.use(cookieParser('secret'));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user: any, done: any) {
    done(null, user);
  });
  passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
        passReqToCallback: true,
      },
      async (
        _: any,
        accessToken: any,
        refreshToken: any,
        profile: { id: any; email: any; displayName: any },
        done: (
          arg0: null,
          arg1: {
            user: User;
            accessToken: any;
            refreshToken: any;
            existingUser: boolean;
          },
        ) => any,
      ) => {
        const { id, email, displayName } = profile;
        console.log('====>>>>', profile);
        const query = conn
          .getRepository(User)
          .createQueryBuilder('user')
          .where('user.googleId = :id or user.email= :email', { id, email });

        let user = await query.getOne();
        const inviteLink = v4();
        let existingUser = true;

        if (!user) {
          user = await User.create({
            googleId: id,
            email,
            name: displayName,
            inviteLink,
            role: UserRole.USER,
            DefaultTemplates: false,
          }).save();
          existingUser = false;
        } else if (!user.googleId) {
          user.googleId = id;
          existingUser = true;
          await user.save();
        } else {
        }

        return done(null, {
          user,
          accessToken,
          refreshToken,
          existingUser,
        });
      },
    ),
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
        profileFields: ['id', 'email', 'displayName'],
      },
      async (
        _: any,
        __: any,
        profile: { id: any; _json: any },
        cb: (arg0: null, arg1: { user: User; existingUser: boolean }) => any,
      ) => {
        const { id, _json } = profile;
        const { email, name } = _json;
        console.log('profile', cb, id, _json);
        //Handle the case when email does not exist//
        const query = conn
          .getRepository(User)
          .createQueryBuilder('user')
          .where('user.facebookId = :id or user.email= :email', { id, email });
        let user = await query.getOne();
        const inviteLink = v4();
        let existingUser = true;

        if (!user) {
          user = await User.create({
            facebookId: id,
            email: email,
            name: name,
            inviteLink,
            role: UserRole.USER,
            DefaultTemplates: false
          }).save();
          existingUser = false;
        } else if (!user.facebookId) {
          user.facebookId = id;
          existingUser = true;
          await user.save();
        } else {
        }

        return cb(null, {
          user,
          existingUser,
          // duplicateEntery,
          // err
        });
      },
    ),
  );

  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_KEY,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/linkedin/callback`,
        state: true,
        scope: ['r_emailaddress', 'r_liteprofile'],
        profileFields: [
          'id',
          'first-name',
          'last-name',
          'email-address',
          'public-profile-url',
        ],
      },
      async (
        _: any,
        __: any,
        profile: { id: any; emails: any; displayName: any },
        cb: (arg0: null, arg1: { user: User; existingUser: boolean }) => any,
      ) => {
        const { id, emails, displayName } = profile;
        const email = emails[0].value;
        console.log(profile);
        const query = conn
          .getRepository(User)
          .createQueryBuilder('user')
          .where('user.linkedInId = :id  or user.email= :email', { id, email });

        let user = await query.getOne();
        const inviteLink = v4();
        let existingUser = true;

        if (!user) {
          user = await User.create({
            linkedInId: id,
            name: displayName,
            email: email,
            inviteLink,
            role: UserRole.USER,
            DefaultTemplates: false,
          }).save();
          existingUser = false;
        } else if (!user.linkedInId) {
          user.linkedInId = id;
          existingUser = true;
          await user.save();
        } else {
        }
        return cb(null, {
          user,
          existingUser,
        });
      },
    ),
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }),
  );
  app.get('/auth/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err: any, info: any) => {
      if (err) {
        // failureRedirect
        res.cookie('err', 'Authentication failed');
        return res.redirect(`${process.env.CORS_ORIGIN}/login`);
      } else {
        const value = JSON.parse(JSON.stringify(info));
        if (!value) {
          // failureRedirect
          res.cookie('err', 'Authentication failed');
          return res.redirect(`${process.env.CORS_ORIGIN}/login`);
        }
        req.login(value, (err) => {
          if (err) {
            return next(err);
          }
          // successRedirect
          if (value.user.id && req.session) {
            req.session.userId = value.user.id;
          }
          if (value.existingUser) {
            res.redirect(`${process.env.CORS_ORIGIN}/`);
          } else {
            res.cookie('name', value.user.name);
            res.redirect(`${process.env.CORS_ORIGIN}/finish`);
          }
        });
      }
    })(req, res, next);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      session: false,
    }),
  );

  app.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err: any, info: any) => {
      if (err) {
        // failureRedirect
        res.cookie('err', 'Authentication failed');
        return res.redirect(`${process.env.CORS_ORIGIN}/login`);
      } else {
        const value = JSON.parse(JSON.stringify(info));
        if (!value) {
          // failureRedirect
          res.cookie('err', 'Authentication failed');
          return res.redirect(`${process.env.CORS_ORIGIN}/login`);
        }
        req.login(value, (err) => {
          if (err) {
            return next(err);
          }
          // successRedirect
          if (value.user.id && req.session) {
            req.session.userId = value.user.id;
          }
          if (value.existingUser) {
            res.redirect(`${process.env.CORS_ORIGIN}/`);
          } else {
            // console.log('=====>>>', value.user.name)
            res.cookie('name', value.user.name);
            res.redirect(`${process.env.CORS_ORIGIN}/finish`);
          }
        });
      }
    })(req, res, next);
  });

  app.get('/auth/linkedin', passport.authenticate('linkedin'));

  app.get('/auth/linkedin/callback', (req, res, next) => {
    passport.authenticate('linkedin', (err: any, info: any) => {
      if (err) {
        res.cookie('err', 'Authentication failed');
        res.redirect(`${process.env.CORS_ORIGIN}/login`);
      } else {
        const value = JSON.parse(JSON.stringify(info));
        if (!value) {
          res.cookie('err', 'Authentication failed');
          return res.redirect(`${process.env.CORS_ORIGIN}/login`);
        }
        req.login(value, (err) => {
          if (err) {
            return next(err);
          }
          // successRedirect
          if (value.user.id && req.session) {
            req.session.userId = value.user.id;
          }
          if (value.existingUser) {
            res.redirect(`${process.env.CORS_ORIGIN}/`);
          } else {
            res.cookie('name', value.user.name);
            res.redirect(`${process.env.CORS_ORIGIN}/finish`);
          }
        });
      }
    })(req, res, next);
  });

  //apollo connection
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SubResolver, UserResolver, QuoteResolver, TemplatesResolver, MailActivityResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      subLoader: createSubLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log('server started on localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});
