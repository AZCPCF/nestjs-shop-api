import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sanitize } from 'src/common/shared/sanitize.service';
import { Role, User, UserInRequest } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly sanitize: Sanitize,
    private readonly userService: UserService,
  ) {}

  async getAllUsers(): Promise<UserInRequest[]> {
    return this.sanitize.user(this.userRepo.findBy({ role: Role.USER }));
  }

  async updateUser(
    id: string,
    { isActive, role }: UpdateUserDto,
  ): Promise<UserInRequest> {
    const user = await this.userService.findOne({
      fields: { id, role: Role.USER },
    });
    if (isActive != undefined) {
      user.isActive = isActive;
    }
    if (role != undefined) {
      user.role = role;
    }
    return this.sanitize.user(this.userRepo.save(user));
  }

  async findUserById(id: string): Promise<UserInRequest> {
    return this.userService.findOne({ fields: { id, role: Role.USER } });
  }
}
