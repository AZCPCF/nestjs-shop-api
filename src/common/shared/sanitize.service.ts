import { Injectable } from '@nestjs/common';
import { User, UserInRequest } from 'src/entities/user/user.entity';

@Injectable()
export class Sanitize {
  async user(user: User | Promise<User>): Promise<UserInRequest>;
  async user(user: User[] | Promise<User[]>): Promise<UserInRequest[]>;

  async user(
    user: User | User[] | Promise<User> | Promise<User[]>,
  ): Promise<UserInRequest | UserInRequest[]> {
    const resolved = await user;

    if (Array.isArray(resolved)) {
      return resolved.map(({ password, refreshToken, ...safe }) => safe);
    }

    const { password, refreshToken, ...safe } = resolved;
    return safe;
  }
}
