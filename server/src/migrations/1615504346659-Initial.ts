import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1615504346659 implements MigrationInterface {
    name = 'Initial1615504346659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "catagory" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "inviteLink" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "googleId" text, "facebookId" text, "linkedInId" text, "customerType" text NOT NULL DEFAULT 'free-trial', "stripeId" text, "stripeSubscriptionId" text, "ccLast4" character varying, "catagory" character varying, "name" text, "address" character varying, "city" character varying, "state" character varying, "zip" character varying, "company" character varying, "title" character varying, "linkedIn" character varying, "twitter" character varying, "facebook" character varying, "website" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "unsubscribeToken" character varying NOT NULL, "subscribed" boolean NOT NULL, "creatorId" integer NOT NULL, "frequency" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aaa48ae541d7446ee5fff28e732" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" integer NOT NULL, "subscriberId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_bcbf020650ca118abc4cc1ceead" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub" ADD CONSTRAINT "FK_712015e2a9976be8ba3aa8e0f3f" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_90a666a4645ec48601cf5fb7353" FOREIGN KEY ("subscriberId") REFERENCES "sub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_e04040c4ea7133eeddefff6417d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_e04040c4ea7133eeddefff6417d"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_90a666a4645ec48601cf5fb7353"`);
        await queryRunner.query(`ALTER TABLE "sub" DROP CONSTRAINT "FK_712015e2a9976be8ba3aa8e0f3f"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_bcbf020650ca118abc4cc1ceead"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "sub"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "quote"`);
    }

}
