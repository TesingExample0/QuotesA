import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../entities/User';
import { Sub } from './Sub';

@ObjectType()
@Entity()
export class MailActivity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  From_Email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  To_Email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subject: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  body: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  Status: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  msgid: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  xmsgid: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  creatorId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subsid: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  open_count: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  clicks_count: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  Author: string;

  @ManyToOne(() => User, (user) => user.mailactivities)
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.mailactivitie)
  subscribe: Sub;

}
