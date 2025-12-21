import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserEnum } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const user = this.userRepo.create({
      email,
      password,
      role: UserEnum.USER,
      displayName,
    });
    return await this.userRepo.save(user);
  }
}
