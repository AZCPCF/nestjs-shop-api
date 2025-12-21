import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
  ) {}
  async register(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const hashedPassword = await this.passwordService.hash(password);
    return this.userService.create(email, hashedPassword, displayName);
  }
}
