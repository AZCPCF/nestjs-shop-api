import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/entities/user/user.entity';

@Controller('user')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @Roles(Role.USER,Role.ADMIN)
  getMe(@Req() req: Request) {
    return req.user;
  }
}
