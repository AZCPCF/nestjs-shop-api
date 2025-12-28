import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sanitize } from 'src/common/shared/sanitize.service';
import { Role, User, UserInRequest } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly sanitize: Sanitize,
  ) {}

  async getAllUsers(): Promise<UserInRequest[]> {
    return this.sanitize.user(this.userRepo.findBy({ role: Role.USER }));
  }
}
