import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Sub } from './Sub';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  subscriberId: number;

  @ManyToOne(() => Sub, (sub) => sub.messages)
  subscriber: Sub;

  @Field()
  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
