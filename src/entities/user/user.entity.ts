import { Transform } from 'class-transformer';
import { DateResponse } from '../../common/utils/date-response';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ enum: Role })
  role: Role;

  @Column({ nullable: true })
  refreshToken?: string;

  @CreateDateColumn()
  @Transform(({ value }) => DateResponse.from(value), {
    toPlainOnly: true,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => DateResponse.from(value), {
    toPlainOnly: true,
  })
  updatedAt: Date;
}

export interface UserPayload {
  sub: string;
  email: string;
  displayName: string;
  isActive: boolean;
  role: Role;
}

export type UserInRequest<T = Date> = Omit<
  User,
  'password' | 'refreshToken' | 'createdAt' | 'updatedAt'
> & {
  createdAt: T;
  updatedAt: T;
};
