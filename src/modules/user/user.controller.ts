import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { type UserInRequest } from 'src/entities/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  getMe(@Req() { user }: Request): UserInRequest {
    return user;
  }
  @Patch('me')
  updateMe(
    @Req() { user }: Request,
    @Body('displayName') displayName: string,
  ): Promise<UserInRequest> {
    return this.userService.updateUser(user.id, displayName);
  }
}
