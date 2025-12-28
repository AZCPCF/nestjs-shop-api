import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sanitize } from 'src/common/shared/sanitize.service';
import { Role, User, UserInRequest } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly sanitize: Sanitize,
  ) {}

  async create(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const user = this.userRepo.create({
      email,
      password,
      role: Role.USER,
      displayName,
    });
    return await this.userRepo.save(user);
  }

  async findOne(options: {
    inAuth: true;
    fields?: Partial<User>;
  }): Promise<User>;
  async findOne(options: {
    inAuth?: false;
    fields?: Partial<User>;
  }): Promise<UserInRequest>;

  async findOne({
    inAuth,
    fields,
  }: {
    inAuth?: boolean;
    fields?: Partial<User>;
  }): Promise<User | UserInRequest> {
    const user = await this.userRepo.findOneBy(fields);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (inAuth) {
      return user;
    }
    return this.sanitize.user(user);
  }

  async updateRefreshToken(user: User, refreshToken: string): Promise<User> {
    user.refreshToken = refreshToken;
    return await this.userRepo.save(user);
  }

  async updateUser(id: string, displayName: string): Promise<UserInRequest> {
    const user = await this.findOne({ fields: { id } });
    if (!displayName) {
      throw new BadRequestException('displayName field is required');
    }
    user.displayName = displayName;
    return this.sanitize.user(this.userRepo.save(user));
  }
}
