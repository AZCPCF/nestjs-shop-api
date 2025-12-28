
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export interface UserPayload {
  sub: string;
  email: string;
  displayName: string;
  isActive: boolean;
  role: Role;
}

export type UserInRequest = Omit<User, 'password' | 'refreshToken'>;
