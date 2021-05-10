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
import { Message } from './Message';
import { User } from './User';
import {MailActivity} from './MailActivity';

@ObjectType()
@Entity()
export class Sub extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  unsubscribeToken!: string;

  @Field()
  @Column()
  subscribed!: boolean;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  frequency: number;

  @Field()
  @ManyToOne(() => User, (user) => user.subs)
  creator: User;

  @OneToMany(() => Message, (message) => message.subscriber)
  messages: Message[];

  @OneToMany(() => MailActivity, (mailactivity) => mailactivity.subscribe)
  mailactivitie: MailActivity[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
