import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserEnum {
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

  @Column({ enum: UserEnum })
  role: UserEnum;
}

export interface UserPayload {
  sub: string;
  email: string;
  displayName: string;
  isActive: boolean;
  role: UserEnum;
}
